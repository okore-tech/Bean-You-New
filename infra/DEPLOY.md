# Deploying beanyou.com to GoDaddy

The site builds to a folder of plain static files (`out/`) — HTML, CSS, JS,
images and video. There is no Node process to run and nothing to keep alive on
the server, so this works on GoDaddy's ordinary Linux/cPanel hosting. You do
**not** need a VPS, and you do not need their Node.js app hosting.

```
beanyou.com  ->  GoDaddy cPanel  ->  /public_html/   (contents of out/)
                                     └─ .htaccess    (routing, caching, HTTPS)
```

> **Assumption:** this describes GoDaddy **Linux Hosting with cPanel**, which is
> what "GoDaddy hosting" normally means. If you are on a VPS or Windows/Plesk
> plan, the build is identical but the upload step differs — see *Other GoDaddy
> plans* at the bottom.

---

## What `.htaccess` does

`public/.htaccess` is copied into every build and must end up in the web root
next to `index.html`. It replaces what a CDN would otherwise handle:

| Concern | Handled by |
|---|---|
| `/about/` serves `/about/index.html` | `DirectoryIndex` (routes are real folders) |
| `/about` redirects to `/about/` | explicit rewrite, forced to `https://` |
| Force HTTPS | rewrite on `X-Forwarded-Proto` |
| `www.` redirects to apex | rewrite (flip the block to prefer `www`) |
| 404s | `ErrorDocument 404 /404.html` |
| Caching | 1 year for `/_next/static`, 1 month for media, revalidate for HTML |
| gzip | `mod_deflate` |
| Security headers | `nosniff`, `SAMEORIGIN`, Referrer-Policy, Permissions-Policy |

Verified against Apache 2.4 locally: all 8 routes return 200, `/about` →
`/about/` in a single hop, 404s return a real 404 status, and `.mp4` is served
with `Accept-Ranges: bytes` so seeking works.

---

## 1. Point the domain at the hosting

If `beanyou.com` is registered with GoDaddy and hosted on the same account,
their control panel links the two for you and DNS is already correct.

If the domain is registered elsewhere, set its nameservers (or an A record) to
the values cPanel shows under **Shared IP Address**.

> **Lower the TTL on your current DNS records to 300s at least a day before
> cutting over**, so a rollback takes minutes instead of hours.

## 2. Enable HTTPS before uploading

In cPanel, open **SSL/TLS Status** and issue/verify the free certificate for
both `beanyou.com` and `www.beanyou.com`.

Do this *first*. The `.htaccess` force-HTTPS rule will redirect every visitor to
`https://`, so if no certificate exists yet the site will appear broken.

## 3. Upload the site

### Option A — manual, via cPanel File Manager

```bash
npm ci
npm run zip     # builds, then packs out/ into beanyou-site.zip
```

In **File Manager**, open `/public_html`, upload `beanyou-site.zip`, then
**Extract** it there.

Two things people get wrong:

* Upload the **contents** of `out/`, not the `out` folder itself.
  `/public_html/index.html` is correct; `/public_html/out/index.html` is not.
* File Manager hides dotfiles by default, so **`.htaccess` looks missing**.
  Turn on *Settings → Show Hidden Files* and confirm it is there. Without it
  you get 404s on every route except the homepage.

Delete GoDaddy's placeholder `index.html`/`default.html` if present.

### Option B — automatic, on every push to `main`

`.github/workflows/deploy.yml` builds and uploads over **FTPS**. In the repo
settings add:

| Kind | Name | Value |
|---|---|---|
| Secret | `FTP_SERVER` | your FTP hostname from cPanel (e.g. `ftp.beanyou.com`) |
| Secret | `FTP_USERNAME` | the FTP user |
| Secret | `FTP_PASSWORD` | that user's password |
| Variable | `FTP_SERVER_DIR` | `/public_html/` |

Create a **dedicated FTP account scoped to `/public_html`** in cPanel rather
than using your main hosting login — that login can reach every file in the
account, and it would be sitting in GitHub.

The workflow pins `protocol: ftps`. Do not change it to `ftp`: plain FTP sends
the password and the entire site in cleartext. It also only transfers changed
files, so routine deploys move kilobytes rather than 38 MB.

## 4. Verify

```bash
curl -sI https://beanyou.com/            # expect 200
curl -sI https://beanyou.com/about       # expect 301 -> https://beanyou.com/about/
curl -sI https://beanyou.com/about/      # expect 200
curl -sI http://beanyou.com/             # expect 301 -> https://
curl -sI https://beanyou.com/nope/       # expect 404
curl -sI https://beanyou.com/_next/static/  # expect Cache-Control: immutable
```

Then load the site and check the browser console is clean.

## 5. Retire Vercel

Leave `bean-you-new.vercel.app` serving until DNS has propagated and you have
watched real traffic for a day or two. Then remove the Git integration from the
**Vercel dashboard** — nothing in this repo controls it. Keep the Vercel
project for a week as a rollback.

---

## Things to watch on shared hosting

**No CDN.** Every visitor pulls from one server in one location. The site is
38 MB total, of which 16 MB is video — fine for moderate traffic, but a busy day
or a burst of video plays will feel slower than Vercel did, especially for
visitors far from the datacentre. If that becomes a problem, putting Cloudflare
(free tier) in front of GoDaddy solves it without changing the hosting.

**Bandwidth limits.** "Unlimited" shared plans have fair-use ceilings. The two
videos are 9.7 MB and 5.5 MB; they are `preload="none"`, so they only transfer
when someone presses play — keep it that way.

**No automatic rollback.** Unlike Vercel, there is no previous deployment to
promote. The GitHub Actions artifact from each build is retained for 5 days and
can be re-uploaded if a deploy goes wrong.

---

## Other GoDaddy plans

* **VPS / dedicated** — same `out/` folder; serve it with nginx or Apache. On
  nginx, `.htaccess` is ignored: translate it to a server block using
  `try_files $uri $uri/index.html =404`.
* **Windows / Plesk** — `.htaccess` is ignored (IIS). Needs an equivalent
  `web.config` for the rewrites and caching. Ask and it can be written.
* **Website Builder** — not usable. It hosts its own page content and cannot
  serve an uploaded Next.js build.

---

## Adding new images or video

There is no image optimizer in a static export — whatever lands in `public/` is
what the browser downloads. The originals in this repo were camera-sized (one
JPEG was 8000×5333 at 24 MB), which is why `public/` was 374 MB.

**Images** — cap at 1920px on the long edge, JPEG quality ~80:

```bash
sharp -i input.jpg -o public/images/output.jpg resize 1920 --fit inside -- jpeg --quality 80
```

**Video** — 720p is ample for the sizes these render at, and `-movflags
+faststart` lets playback begin before the file finishes downloading:

```bash
ffmpeg -i input.mp4 -vf "scale=-2:720" -c:v libx264 -crf 25 -preset slow \
  -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart public/videos/output.mp4

ffmpeg -ss 3 -i public/videos/output.mp4 -frames:v 1 -q:v 4 public/images/output-poster.jpg
```

Always give a `<video>` both `preload="none"` and a `poster`. Without them the
browser starts pulling the file on page load, whether or not anyone watches it.
This matters more on shared hosting than it did on a CDN.
