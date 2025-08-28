"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Tab = "Ambassadors" | "tech" | "applicants";

type Card = {
  img: string;
  title: string;
  desc: string;
  alt?: string;
  video?: string; // local or external video URL
  cta?: string;   // button label
  href?: string;  // optional link (used when no video)
};

function isYouTubeUrl(url: string) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
}
function toYouTubeEmbed(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    }
    const id = u.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    if (u.pathname.includes("/embed/")) return `${u.toString()}?autoplay=1&rel=0&modestbranding=1`;
  } catch {}
  return url;
}

export default function FaceOfBeanYouPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isYT, setIsYT] = useState(false);
  const [filter, setFilter] = useState<Tab>("Ambassadors");
  const [isLoading, setIsLoading] = useState(false);
  const [readyKey, setReadyKey] = useState(0); // force re-mount on tab change after preload

  // Keep AOS for sections, but not for cards
  useEffect(() => {
    (async () => {
      try {
        const AOS = (await import("aos")).default;
        await import("aos/dist/aos.css");
        AOS.init({
          duration: 700,
          easing: "ease-out",
          once: true,
          mirror: false,
          offset: 50,
        });
      } catch {}
    })();
  }, []);

  const cards = useMemo<Record<Tab, Card[]>>(
    () => ({
      Ambassadors: [
        {
          img: "/images/Kevin.jpg",
          title: "Kevin Mills • Musician",
          desc: "Afro-futuristic rhythms born of soul and steam.",
          video: "https://youtu.be/h517KvsUmX0",
          cta: "🎥 Watch Video",
        },
        {
          img: "/images/Anne.jpeg",
          title: "Spotlight • Anne",
          desc: "Courage, culture, community. Applicants submission.",
          href: "#contact",
          cta: "✉️ Message the Team",
        },
        {
          img: "/images/band.png",
          title: "Gen-z • Band",
          desc: "Expression through music.",
          video: "https://youtu.be/SQxvFfcRKlc",
          cta: "🎥 Watch Video",
          alt: "Gen-z band",
        },
      ],
      tech: [
        {
          img: "/images/billy.png",
          title: "Billy • Virtual Architect",
          desc: "Mapping beans into the metaverse. Real farms, virtual plots.",
          href: "#contact",
          cta: "✉️ Send Message",
        },
        {
          img: "/images/joyce1.jpeg",
          title: "Joyce • Gen-z tech",
          desc: "Ideology + code to spark creativity and modern UI/UX.",
          href: "#contact",
          cta: "✉️ Send Message",
        },
      ],
      applicants: [
        {
          img: "/images/euginia2.jpg",
          title: "Spotlight • Vivian",
          desc: "Courage, culture, community. Applicants submission.",
          video: "/videos/Vivian.mp4",
          cta: "🎥 Watch",
        },
        {
          img: "/images/community.jpg",
          title: "Your Turn • Send a Message",
          desc:
            "Pitch your idea, collab, or cause — we reply within 24 hours. Share links and socials too.",
          href: "#contact",
          cta: "✉️ Message the Team",
        },
      ],
    }),
    []
  );

  // Preload images when switching tabs; show a simple spinner meanwhile
  useEffect(() => {
    let cancelled = false;
    const preload = async () => {
      setIsLoading(true);
      const imgs = cards[filter].map((c) => c.img);
      await Promise.all(
        imgs.map(
          (src) =>
            new Promise<void>((resolve) => {
              const i = new window.Image();
              i.onload = () => resolve();
              i.onerror = () => resolve();
              i.src = src;
            })
        )
      );
      if (!cancelled) {
        setIsLoading(false);
        // force a fresh mount for the grid to avoid stale images
        setReadyKey((k) => k + 1);
      }
    };
    preload();
    return () => {
      cancelled = true;
    };
  }, [filter, cards]);

  return (
    <div className="relative">
      {/* helper styles */}
      <style jsx global>{`
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .floating-blob { animation: floatBlob 8s ease-in-out infinite; opacity: 0.08; z-index: 0; }
        .clip-diagonal { clip-path: polygon(0 0, 100% 0, 100% 94%, 0% 100%); }
        @media (max-width: 768px) {
          .clip-diagonal { clip-path: polygon(0 0, 100% 0, 100% 98%, 0% 100%); }
        }

        /* SIMPLE LOADER */
        .spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(0,0,0,0.15);
          border-top-color: rgba(234, 88, 12, 1); /* orange-600 */
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Keep subtle hero image mask, remove card hover/clip animations */
        .hero-img-mask {
          clip-path: polygon(10% 0%, 100% 10%, 90% 100%, 0% 90%);
          transition: all 0.5s ease;
        }
        .hero-img-mask:hover { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); transform: scale(1.02); }
      `}</style>

      <main className="relative z-10">
        {/* HERO */}
        <section className="clip-diagonal relative overflow-hidden bg-[#fefae0] px-6 py-24 text-[#4e342e]">
          <div className="floating-blob absolute left-0 top-0 h-80 w-80 rounded-full mix-blend-multiply blur-3xl" style={{ backgroundColor: "#fecaca" }} data-aos="zoom-in" />
          <div className="floating-blob absolute bottom-0 right-0 h-80 w-80 rounded-full mix-blend-multiply blur-2xl" style={{ backgroundColor: "#ea580c" }} data-aos="zoom-in" data-aos-delay="300" />
          <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "url(/images/texture.png)" }} />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 md:flex-row">
            <div className="text-center md:w-1/2 md:text-left">
              <h1 className="mb-6 text-5xl font-bold">Find Your Tribe, Build Your Bean You.</h1>
              <p className="mb-4 max-w-xl text-lg">
                Celebrate culture, creativity and collaboration with the faces shaping the Bean You universe.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row md:justify-start">
                <a href="#faces" className="rounded-full bg-orange-700 px-6 py-3 font-bold text-white shadow transition hover:bg-orange-800">
                  🌍 Meet the Faces
                </a>
                <a href="#misskenya" className="rounded-full bg-orange-100 px-6 py-3 font-bold text-orange-800 shadow transition hover:bg-orange-200">
                  👑 Watch Miss Kenya
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/animated-hero.png"
                alt="Diverse tribe"
                width={800}
                height={600}
                className="hero-img-mask mx-auto w-full max-w-md rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* MISS KENYA */}
        <section id="misskenya" className="relative overflow-hidden bg-orange-100 px-6 py-24 text-[#4e342e]">
          <div className="floating-blob absolute left-0 top-0 h-96 w-96 rounded-full mix-blend-multiply blur-2xl" style={{ backgroundColor: "#c2410c" }} data-aos="fade-right" />
          <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "url(/images/texture.png)" }} />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 md:flex-row">
            <div className="md:w-1/2" data-aos="fade-right">
              <div className="overflow-hidden rounded-xl border-8 border-orange-200 shadow-2xl">
                <video controls className="h-auto w-full rounded-xl" playsInline>
                  <source src="/videos/grace.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="text-center md:w-1/2 md:text-left" data-aos="fade-left">
              <h2 className="mb-4 text-4xl font-bold">👑 Miss Kenya Joins the Story</h2>
              <p className="italic">
                &quot;Bean You isn&apos;t just about coffee. It&apos;s about voices, vision, and where our roots meet our future.&quot;
              </p>
              <p className="mt-6 text-orange-700">— Miss Kenya 2025</p>
            </div>
          </div>
        </section>

        {/* TRIBE SECTION */}
        <section id="faces" className="relative overflow-hidden bg-[#e1b382] px-6 py-24 text-[#4e342e]">
          <div className="floating-blob absolute right-0 top-0 h-96 w-96 rounded-full mix-blend-multiply blur-3xl" style={{ backgroundColor: "#9a3412" }} data-aos="fade-left" />
          <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "url(/images/texture.png)" }} />
          <div className="relative z-10 mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-4xl font-bold">Meet the Tribe</h2>

            {/* Filter Tabs */}
            <div className="mb-10 flex justify-center gap-4">
              {(["Ambassadors", "tech", "applicants"] as Tab[]).map((tab) => {
                const active = filter === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`rounded-full px-6 py-2 font-semibold shadow transition ${
                      active ? "bg-orange-600 text-white" : "bg-white text-orange-700 hover:scale-105"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                );
              })}
            </div>

            {/* Loader on tab switch */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="spinner" aria-label="Loading" />
              </div>
            ) : (
              <div
                key={readyKey}
                className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 animate-fadein"
              >
                {cards[filter].map((c: Card, idx) => {
                  const isApplicants = filter === "applicants";
                  return (
                    <div
                      key={idx}
                      className={`relative overflow-hidden rounded-2xl bg-white shadow-xl ${
                        isApplicants ? "ring-2 ring-offset-2 ring-offset-[#e1b382] ring-orange-400/70" : ""
                      }`}
                    >
                      {/* Small badge for applicants */}
                      {isApplicants && (
                        <span
                          className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-white shadow ${
                            idx === 0 ? "bg-orange-600" : "bg-emerald-600"
                          }`}
                        >
                          {idx === 0 ? "Spotlight" : "Your Turn"}
                        </span>
                      )}

                      <Image
                        src={c.img}
                        alt={c.alt ?? c.title}
                        width={900}
                        height={600}
                        className="h-64 w-full object-cover"
                        priority={false}
                      />
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-extrabold text-orange-900 tracking-tight">{c.title}</h3>
                        <p className="mt-2 text-sm text-[#4e342e]/90">{c.desc}</p>

                        {/* unified gradient CTA for all */}
                        {c.video ? (
                          <button
                            onClick={() => {
                              const yt = isYouTubeUrl(c.video!);
                              setIsYT(yt);
                              setVideoUrl(yt ? toYouTubeEmbed(c.video!) : c.video!);
                              setLightboxOpen(true);
                            }}
                            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 to-orange-500 px-5 py-2 font-semibold text-black shadow-md hover:scale-[1.03] active:scale-95 transition"
                          >
                            {c.cta ?? "🎥 Watch Video"}
                          </button>
                        ) : (
                          <a
                            href={c.href ?? "#contact"}
                            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 to-orange-500 px-5 py-2 font-semibold text-black shadow-md hover:scale-[1.03] active:scale-95 transition"
                          >
                            {c.cta ?? "✉️ Send Message"}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* VIDEO LIGHTBOX */}
          {lightboxOpen && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={(e) => { if (e.currentTarget === e.target) setLightboxOpen(false); }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url(/images/texture.png)" }} />
              <div className="relative w-full max-w-3xl p-4">
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
                  aria-label="Close video"
                >
                  &times;
                </button>

                <div className="relative w-full overflow-hidden rounded-xl border-4 border-white shadow-2xl">
                  {isYT ? (
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                      <iframe
                        src={videoUrl}
                        className="absolute left-0 top-0 h-full w-full"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <video controls autoPlay playsInline className="max-h-[80vh] w-full">
                      <source src={videoUrl} type={/\.mov$/i.test(videoUrl) ? "video/quicktime" : "video/mp4"} />
                      { /\.mov$/i.test(videoUrl) && (
                        <source src={videoUrl.replace(/\.mov$/i, "Vivian.mp4")} type="video/mp4" />
                      ) }
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative overflow-hidden bg-[#fcd5ce] px-6 py-24 text-[#4e342e]">
          <div className="floating-blob absolute left-0 top-0 h-96 w-96 rounded-full mix-blend-multiply blur-2xl" style={{ backgroundColor: "#fecaca" }} />
          <div className="floating-blob absolute bottom-0 right-0 h-80 w-80 rounded-full mix-blend-multiply blur-3xl" style={{ backgroundColor: "#c2410c" }} />
          <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "url(/images/texture.png)" }} />
          <div className="relative z-10 mx-auto max-w-xl text-center">
            <h2 className="mb-4 text-4xl font-bold">📬 Let’s Brew Something</h2>
            <p className="mb-6">Collab, connect, or just say hi — we’re building this tribe together.</p>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const name = (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "";
                const email = (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "";
                const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? "";
                const subject = `Face of Bean You message from ${name}`;
                const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
                window.location.href = `mailto:info@beanyou.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              }}
            >
              <input name="name" type="text" placeholder="Your Name" className="w-full rounded-lg border border-gray-300 px-4 py-3" required />
              <input name="email" type="email" placeholder="Your Email" className="w-full rounded-lg border border-gray-300 px-4 py-3" required />
              <textarea name="message" placeholder="Your Message" rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-3" required />
              <button type="submit" className="w-full rounded-full bg-orange-700 py-3 font-bold text-white transition hover:bg-orange-800">
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* SCROLL TO TOP */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-700 p-3 text-white shadow-lg transition hover:bg-orange-800"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      </main>
    </div>
  );
}
