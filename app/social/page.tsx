"use client";

import { useEffect, useState } from "react";

/* ---- WeChat helpers ---- */
const WECHAT = {
  id: "beanyou_official", // update if your official ID differs
  qr: "/images/wechatqr.jpg", // keep as provided; PNG is ideal if you switch assets later
};

function openWeChat() {
  try {
    // Some Android browsers honor this scheme; iOS Safari often ignores (harmless fail).
    window.location.href = "weixin://dl/scan";
  } catch {
    /* no-op */
  }
}

async function copyWeChatId(setCopied: (v: boolean) => void) {
  try {
    await navigator.clipboard.writeText(WECHAT.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch {
    /* optional: toast fallback */
  }
}

export default function SocialPage() {
  const [wechatOpen, setWeChatOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Lazy-init AOS if it exists (won't error if it's not installed)
  useEffect(() => {
    (async () => {
      try {
        const AOS = (await import("aos")).default;
        await import("aos/dist/aos.css");
        AOS.init({ duration: 800, once: true, easing: "ease-out" });
      } catch {
        /* no-op */
      }
    })();
  }, []);

  // Close modal with ESC key
  useEffect(() => {
    if (!wechatOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setWeChatOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [wechatOpen]);

  return (
    <main
      className="text-white"
      style={{ backgroundColor: "#BD570F", fontFamily: "Poppins, sans-serif" }}
    >
      {/* HERO SECTION */}

      {/* SOCIAL MEDIA SECTION (gradient + clip path + glass cards) */}
      <section
        className="relative py-20 sm:py-28 px-6 overflow-hidden bg-gradient-to-br from-[#2a150e] via-[#793A17] to-[#F3B019] clip-path-triangle"
        aria-labelledby="follow-the-buzz"
      >
        <div
          className="relative z-10 max-w-6xl mx-auto text-center mb-12 sm:mb-20"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 id="follow-the-buzz" className="text-4xl md:text-6xl font-extrabold text-[#F3B019]">
            Follow the Buzz
          </h2>
          <p className="mt-4 text-base sm:text-lg text-orange-200 max-w-2xl mx-auto">
            Where trends roast and reels pour — follow us across the brew-verse.
          </p>
        </div>

        <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 max-w-6xl mx-auto">
          {[
            {
              href: "https://www.instagram.com/bean__you/",
              img: "/images/instagram-icon.png",
              label: "Instagram",
              sub: "Visual brews & reels",
            },
            {
              href: "https://www.tiktok.com/@bean__you",
              img: "/images/imageTK.png",
              label: "TikTok",
              sub: "Trendy coffee clips",
            },
            {
              href: "https://www.youtube.com/@user-pb6bt1cj6m",
              img: "/images/youtube.png",
              label: "YouTube",
              sub: "Watch our brew journey",
            },
            {
              href: "https://x.com/Bean__You",
              img: "/images/xicon.png",
              label: "X",
              sub: "Post updates & news",
            },
            {
              href: "https://www.facebook.com/profile.php?id=61563809891807",
              img: "/images/imageF.png",
              label: "Facebook",
              sub: "Global coffee fam",
            },
            {
              href: "https://www.linkedin.com/company/beanyouofficial/",
              img: "/images/logos--linkedin-icon.png",
              label: "LinkedIn",
              sub: "Coffee careers & culture",
            },
          ].map(({ href, img, label, sub }, i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-6 sm:p-7 transition-transform duration-300 hover:scale-[1.03] focus:scale-[1.03] outline-none"
              data-aos="fade-up"
              data-aos-delay={100 + i * 50}
            >
              {/* glass frosting */}
              <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" />
              {/* subtle gradient sheen */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-70" />
              <div className="relative">
                <div className="relative mb-4">
                  <img
                    src={img}
                    alt={label}
                    loading="lazy"
                    className="w-20 h-20 mx-auto rounded-full border-4 border-[#F3B019] object-cover shadow-xl"
                  />
                  {/* playful accents */}
                  {label === "Instagram" && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-[#F3B019] rounded-full animate-ping" />
                  )}
                  {label === "TikTok" && (
                    <span className="absolute bottom-0 left-0 w-5 h-5 bg-[#F3B019] rounded-full animate-bounce" />
                  )}
                  {label === "YouTube" && (
                    <span className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#F3B019] rounded-full animate-pulse -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-center text-[#F3B019]">{label}</h3>
                <p className="text-sm text-center text-orange-100 mt-1">{sub}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* MESSAGING SECTION (ellipse clip + frosted links) */}
      <section className="relative text-[#2a150e] py-20 sm:py-28 px-6 overflow-hidden bg-[#F3B019] clip-path-ellipse">
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/30 to-[#793A17]/20 opacity-50"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto text-center mb-12 sm:mb-20" data-aos="zoom-in">
          <h2 className="text-4xl md:text-6xl font-extrabold">Let’s Talk Beans</h2>
          <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Got thoughts, feedback, or love for the brew? Drop us a message anytime.
          </p>
        </div>

        <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {[
            {
              href: "https://whatsapp.com/channel/0029Vanh5ybFHWq6S79YRb1q/",
              img: "/images/whatsapp.png",
              label: "WhatsApp",
              sub: "Chat directly",
              type: "link",
            },
            {
              href: "https://t.me/+YIxx1c2wXzQxOGZk",
              img: "/images/telegram.png",
              label: "Telegram",
              sub: "Join our group",
              type: "link",
            },
            {
              href: "#wechat",
              img: "/images/wechat-qr.png",
              label: "WeChat",
              sub: "Scan & connect",
              type: "modal", // open QR modal
            },
            {
              href: "https://www.snapchat.com/add/beanyouofficial?share_id=BLTpB3OHA1c&locale=en-GB",
              img: "/images/snap.png",
              label: "Snapchat",
              sub: "Send snaps & vibes",
              type: "link",
            },
          ].map(({ href, img, label, sub, type }, i) =>
            type === "modal" ? (
              <button
                key={label}
                type="button"
                onClick={() => setWeChatOpen(true)}
                aria-haspopup="dialog"
                aria-controls="wechat-modal"
                className="group relative rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-[1.02] focus:scale-[1.02] outline-none"
                data-aos="fade-up"
                data-aos-delay={100 + i * 50}
              >
                {/* frosted glass */}
                <div className="absolute inset-0 rounded-2xl bg-white/30 backdrop-blur-xl ring-1 ring-white/30 shadow-lg" />
                <div className="relative">
                  <img
                    src={img}
                    alt={label}
                    loading="lazy"
                    className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[#793A17] transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="text-lg font-semibold">{label}</h3>
                  <p className="text-sm opacity-80">{sub}</p>
                </div>
              </button>
            ) : (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-[1.02] focus:scale-[1.02] outline-none"
                data-aos="fade-up"
                data-aos-delay={100 + i * 50}
              >
                {/* frosted glass */}
                <div className="absolute inset-0 rounded-2xl bg-white/30 backdrop-blur-xl ring-1 ring-white/30 shadow-lg" />
                <div className="relative">
                  <img
                    src={img}
                    alt={label}
                    loading="lazy"
                    className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[#793A17] transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="text-lg font-semibold">{label}</h3>
                  <p className="text-sm opacity-80">{sub}</p>
                </div>
              </a>
            )
          )}
        </div>
      </section>

      {/* WeChat QR Modal (bilingual + actions) */}
      <Modal id="wechat-modal" open={wechatOpen} onClose={() => setWeChatOpen(false)} title="WeChat">
        <div className="flex flex-col items-center gap-4">
          <img
            src={WECHAT.qr}
            alt="WeChat QR code for Bean You"
            className="w-full max-w-xs rounded-xl border border-white/20 shadow-2xl bg-white p-2"
            loading="eager"
          />
          <div className="text-center text-sm text-white/90 space-y-1">
            <p>
              <strong>English:</strong> Open WeChat → Discover → Scan → point at this QR.
            </p>
          </div>

          <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-xs">
            <button
              onClick={openWeChat}
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15"
            >
              Open WeChat
            </button>
            <button
              onClick={() => copyWeChatId(setCopied)}
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15"
            >
              Copy ID
            </button>
            {copied && (
              <div className="mt-2 text-green-300 text-xs text-center transition-opacity duration-300">
                WeChat ID copied!
              </div>
            )}
            <a
              href={WECHAT.qr}
              download="beanyou-wechat-qr"
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 text-center"
            >
              Download QR
            </a>
          </div>

          <p className="text-center text-xs text-white/80">
            WeChat ID: <span className="font-medium">{WECHAT.id}</span> 
          </p>
        </div>
      </Modal>

      {/* Page-scoped extras: clip-path utilities + motion prefs */}
      <style jsx global>{`
        .clip-path-triangle {
          clip-path: polygon(0 0, 100% 5%, 100% 95%, 0 100%);
        }
        .clip-path-wave {
          clip-path: ellipse(100% 100% at 50% 0%);
        }
        .clip-path-skewed {
          clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
        }
        .clip-path-ellipse {
          clip-path: ellipse(120% 100% at 50% 0%);
        }
        @media (prefers-reduced-motion: reduce) {
          [data-aos] {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

/* ---------- Reusable Modal ---------- */
function Modal({
  id,
  open,
  onClose,
  title,
  children,
}: {
  id?: string;
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative m-3 w-full max-w-md rounded-2xl border border-white/15 bg-gradient-to-br from-white/15 to-white/5 p-5 text-white shadow-2xl ring-1 ring-white/20 backdrop-blur-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold tracking-wide">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 px-2 py-1 text-xs hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Close"
          >
            Close
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto pr-1">{children}</div>
      </div>
    </div>
  );
}
