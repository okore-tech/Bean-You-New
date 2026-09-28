# Deploying beanyou.com to AWS

The site is a fully static Next.js export (`output: "export"` → `out/`).
Target architecture:

```
Route 53 (beanyou.com)
  └─ A/AAAA alias → CloudFront ──(OAC)──> S3 bucket (private)
                       ├─ ACM certificate (us-east-1)
                       └─ CloudFront Function: infra/cloudfront-rewrite.js
```

Nothing runs a server. There is no EC2 instance, no TLS renewal to babysit,
and no Next.js runtime exposed to the internet.

---

## Prerequisites

* An AWS account, and the AWS CLI authenticated (`aws configure` or SSO).
* Control of the `beanyou.com` domain at its registrar.

Pick names once and reuse them:

```bash
export BUCKET=beanyou-site-prod          # must be globally unique
export REGION=eu-west-1                  # bucket region
export DOMAIN=beanyou.com
```

---

## 1. S3 bucket (private — CloudFront reaches it via OAC)

```bash
aws s3api create-bucket --bucket "$BUCKET" --region "$REGION" \
  --create-bucket-configuration LocationConstraint="$REGION"

aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

aws s3api put-bucket-encryption --bucket "$BUCKET" \
  --server-side-encryption-configuration \
  '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'

aws s3api put-bucket-versioning --bucket "$BUCKET" \
  --versioning-configuration Status=Enabled
```

Do **not** enable S3 static website hosting. That requires a public bucket.
The CloudFront Function handles index-document resolution instead.

## 2. TLS certificate — must be in us-east-1

CloudFront only reads certificates from `us-east-1`, regardless of where the
bucket lives.

```bash
aws acm request-certificate --region us-east-1 \
  --domain-name "$DOMAIN" \
  --subject-alternative-names "www.$DOMAIN" \
  --validation-method DNS
```

Add the CNAME validation records it returns, then wait for `ISSUED`:

```bash
aws acm describe-certificate --region us-east-1 \
  --certificate-arn <arn> --query 'Certificate.Status'
```

## 3. CloudFront Function for directory URLs

```bash
aws cloudfront create-function --name beanyou-rewrite \
  --function-config Comment="index.html rewrite",Runtime=cloudfront-js-2.0 \
  --function-code fileb://infra/cloudfront-rewrite.js

aws cloudfront publish-function --name beanyou-rewrite --if-match <etag>
```

## 4. CloudFront distribution

Easiest in the console. Settings that matter:

| Setting | Value |
|---|---|
| Origin | the S3 bucket, **Origin access control** (create new OAC) |
| Viewer protocol policy | Redirect HTTP to HTTPS |
| Alternate domain names | `beanyou.com`, `www.beanyou.com` |
| Custom SSL certificate | the ACM cert from step 2 |
| Default root object | `index.html` |
| Viewer request function | `beanyou-rewrite` |
| Compress objects automatically | Yes |
| Custom error response | 404 → `/404.html`, response code 404 |

When you attach the OAC, CloudFront shows the bucket policy to apply — copy it
onto the bucket so only this distribution can read it.

## 5. Route 53

```bash
aws route53 create-hosted-zone --name "$DOMAIN" \
  --caller-reference "beanyou-$(date +%s)"
```

Create **A (alias)** records for both `beanyou.com` and `www.beanyou.com`
pointing at the distribution. Alias records work at the apex; a CNAME does not.

> **Before cutting over:** lower the TTL on the existing records at your current
> DNS provider to 300s at least a day ahead, so a rollback is fast. Only then
> move the nameservers to the four Route 53 returns.

## 6. GitHub Actions deploy role (OIDC — no stored AWS keys)

Create an IAM role trusted by GitHub's OIDC provider, restricted to this repo:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
      "StringLike":   { "token.actions.githubusercontent.com:sub": "repo:okore-tech/Bean-You-New:ref:refs/heads/main" }
    }
  }]
}
```

Grant it only `s3:ListBucket` + `s3:PutObject`/`DeleteObject` on this bucket and
`cloudfront:CreateInvalidation` on this distribution. Nothing else.

Then in the GitHub repo:

* **Variables:** `AWS_REGION`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`
* **Secret:** `AWS_DEPLOY_ROLE_ARN`

`.github/workflows/deploy.yml` builds on every push and PR, but only deploys
from `main`.

## 7. Verify, then retire Vercel

Before switching DNS, test the distribution directly:

```bash
curl -sI https://<dist-id>.cloudfront.net/about/
curl -sv --resolve "$DOMAIN:443:<cloudfront-ip>" "https://$DOMAIN/" -o /dev/null
```

Leave `bean-you-new.vercel.app` serving until DNS has fully propagated and
you've watched CloudFront logs for a day or two. Then remove the Git
integration from the Vercel project — **not** from this repo, since nothing
here controls it. Keep the Vercel project for a week as a rollback.

---

## Adding new images or video

There is no image optimizer in a static export — whatever lands in `public/`
is what the browser downloads. The originals in this repo were camera-sized
(one JPEG was 8000×5333 at 24 MB), which is why `public/` was 374 MB.

Before committing new media:

**Images** — cap at 1920px on the long edge, JPEG quality ~80:

```bash
# requires: npm i -g sharp-cli   (or use any image tool)
sharp -i input.jpg -o public/images/output.jpg resize 1920 --fit inside -- jpeg --quality 80
```

**Video** — 720p is ample for the sizes these render at, and `-movflags
+faststart` lets playback begin before the file finishes downloading:

```bash
ffmpeg -i input.mp4 -vf "scale=-2:720" -c:v libx264 -crf 25 -preset slow \
  -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart public/videos/output.mp4

# poster frame, so nothing downloads until the viewer presses play
ffmpeg -ss 3 -i public/videos/output.mp4 -frames:v 1 -q:v 4 public/images/output-poster.jpg
```

Always give a `<video>` both `preload="none"` and a `poster`. Without them the
browser starts pulling the file on page load, whether or not anyone watches it.
