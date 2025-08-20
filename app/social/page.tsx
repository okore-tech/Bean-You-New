"use client";

import { useEffect } from "react";

export default function SocialPage() {
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

  return (
    <main className="text-white" style={{ backgroundColor: "#BD570F", fontFamily: "Poppins, sans-serif" }}>
        {/* HERO SECTION */}

      {/* SOCIAL MEDIA SECTION (gradient + clip path + glass cards) */}
      <section
        className="relative py-20 sm:py-28 px-6 overflow-hidden bg-gradient-to-br from-[#2a150e] via-[#793A17] to-[#F3B019] clip-path-triangle"
        aria-labelledby="follow-the-buzz"
      >
        <div className="relative z-10 max-w-6xl mx-auto text-center mb-12 sm:mb-20" data-aos="fade-up" data-aos-delay="100">
          <h2 id="follow-the-buzz" className="text-4xl md:text-6xl font-extrabold text-[#F3B019]">
            Follow the Buzz
          </h2>
          <p className="mt-4 text-base sm:text-lg text-orange-200 max-w-2xl mx-auto">
            Where trends roast and reels pour — follow us across the brew‑verse.
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
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-[#793A17]/20 opacity-50" aria-hidden="true" />

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
            },
            {
              href: "https://t.me/+YIxx1c2wXzQxOGZk",
              img: "/images/telegram.png",
              label: "Telegram",
              sub: "Join our group",
            },
            {
              href: "#",
              img: "/images/wechat-qr.png",
              label: "WeChat",
              sub: "Scan & connect",
            },
            {
              href: "https://www.snapchat.com/add/beanyouofficial?share_id=BLTpB3OHA1c&locale=en-GB",
              img: "/images/snap.png",
              label: "Snapchat",
              sub: "Send snaps & vibes",
            },
          ].map(({ href, img, label, sub }, i) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
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
          ))}
        </div>
      </section>

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
