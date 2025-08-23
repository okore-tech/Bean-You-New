"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";

/* ===== Font (local, page-only fix) ===== */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

/* ===========================
   Bean You — Roadmap + Values
   =========================== */

/* ---------- Scroll-to-top & no restoration ---------- */
function useLoadAtTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      const prev = (history as any).scrollRestoration;
      (history as any).scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return () => {
        (history as any).scrollRestoration = prev ?? "auto";
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, []);
}

// ---------- Roadmap Data ----------
const ROADMAP_ITEMS: Array<{
  year: string;
  title: string;
  details: string[];
  artSrc: string;
  ctas?: { label: string; href: string }[];
}> = [
  {
    year: "2023",
    title:
      "Established Asili Coffee Group Foundation — a not-for-profit to help Kenyan farmers in health, education, and tech resources",
    details: [],
    artSrc: "/images/asili.png",
    ctas: [{ label: "Visit Asili Estates", href: "https://asiliestates.co.ke/" }],
  },
  {
    year: "2024",
    title:
      "Asili farm pilots — establish international tech partners; integrate IoT, 5G, and blockchain into 5 coffee farms",
    details: [],
    artSrc: "/images/blockchain2.png",
    ctas: [{ label: "Asili Estates", href: "https://asiliestates.co.ke/" }],
  },
  {
    year: "2025",
    title: "Launch iRWA (intangible Real World Asset) program up to 15,000 acres",
    details: [
      "Issue Bean You® token as a free gift for every $5 spent",
      "Map user web3 values systems using Bean You® AI through the App",
    ],
    artSrc: "/images/token2.png",
    ctas: [{ label: "Farm Platform", href: "https://parcels.beanyou.com/" }],
  },
  {
    year: "2026",
    title:
      "Franchise Bean You® cafés in Kenya, UK, China, Brazil; connect App users globally by interests and values",
    details: [
      "Provide benefits via App — educational diplomas, gaming, aligned retailers",
      "Issue Bean You® Points rewarding good ESG behaviour",
    ],
    artSrc: "/images/globe.png",
    // no link CTAs here; 2026 will show exactly ONE “Get the App” button via SmartAppButton.
    ctas: [],
  },
  // 2027 REMOVED COMPLETELY
];

// ---------- Value slides ----------
const VALUE_SLIDES: Array<{
  key: string;
  image: string;
  heading: string;
  blurb: string;
  bullets: string[];
  cta?: { label: string; href: string };
}> = [
  {
    key: "connections",
    image: "/images/values.png",
    heading: "Free, Purpose-Led Connections",
    blurb: "Find your tribe by values & actions — learn, play, and grow together.",
    bullets: ["Courses & challenges", "Tokens & rewards", "AI helpers"],
    cta: { label: "Meet Your Tribe", href: "/connect" },
  },
  {
    key: "cafes",
    image: "/images/cafe01.png",
    heading: "10,000+ Cafés = Real-World Network",
    blurb: "Cafés host tribes, redeem rewards, and anchor local communities.",
    bullets: ["In-store rewards", "Events & pop-ups", "Brand promos"],
    cta: { label: "Partner With Us", href: "/partners" },
  },
  {
    key: "irwa",
    image: "/images/token.png",
    heading: "Farms + iRWA Platform",
    blurb: "Adopt coffee crops, track the journey, and support ESG projects.",
    bullets: ["Platform tools", "Service revenue", "Donations"],
    cta: { label: "Explore Farm Platform", href: "https://parcels.beanyou.com/" },
  },
];

/* ---------- Utilities ---------- */
function useRevealOnScroll<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const onIntersect: IntersectionObserverCallback = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    };
    const io = new IntersectionObserver(onIntersect, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/* ---------- Smart single app button ---------- */
function SmartAppButton() {
  const handleClick = () => {
    if (typeof window === "undefined") return;
    const ua = navigator.userAgent || (navigator as any).vendor || (window as any).opera;
    const android = "https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB";
    const ios =
      "https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2";

    if (/android/i.test(ua)) window.location.href = android;
    else if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) window.location.href = ios;
    else {
      window.open(android, "_blank");
      window.open(ios, "_blank");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 text-black font-semibold shadow-md hover:scale-[1.03] active:scale-95 transition"
      aria-label="Get the Bean You app"
    >
      Get the App
    </button>
  );
}

/* ---------- Roadmap Mosaic ---------- */
function RoadmapMosaic({ items = ROADMAP_ITEMS }: { items?: typeof ROADMAP_ITEMS }) {
  return (
    <section id="roadmap" className="relative py-20 md:py-24 overflow-hidden">
      {/* Background to match previous section */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a150e] via-[#793A17] to-[#F3B019] opacity-90" />
      <div className="absolute inset-0 [clip-path:polygon(0_0,100%_6%,100%_100%,0_94%)] bg-white/5" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-3 text-[#FDE68A] drop-shadow">
          Roadmap
        </h2>
        <p className="text-center text-orange-100/90 mb-12 md:mb-14 max-w-3xl mx-auto text-[15.5px]">
          Our not-for-profit Foundation, ESG crops, cafés, gifts — including tokens and
          free benefits. Follow our journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {items.map((step, idx) => (
            <RoadmapItem key={`${step.year}-${idx}`} step={step} idx={idx} />
          ))}
        </div>
      </div>

      {/* Particles (kept) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
        <Particles />
      </div>

      {/* Local styles */}
      <style jsx global>{`
        .card-reveal {
          opacity: 0;
          transform: translateY(14px) scale(0.985);
        }
        .card-reveal.in-view {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .year-pill {
          background-image: linear-gradient(90deg, #8b1e1e, #7a3a17, #bd570f, #f97316);
          background-size: 200% 100%;
          animation: yearSlide 0.9s ease-out both, yearShimmer 6s linear infinite;
        }
        @keyframes yearSlide {
          from {
            transform: translateX(-24px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes yearShimmer {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 0%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        .hue-rotate-anim {
          animation: hueShift 9s linear infinite;
        }
        @keyframes hueShift {
          0% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(12deg) saturate(1.05);
          }
          100% {
            filter: hue-rotate(0deg);
          }
        }
        .roadmap-card:hover .year-pill {
          filter: drop-shadow(0 8px 22px rgba(249, 115, 22, 0.55));
        }
      `}</style>
    </section>
  );
}

/* ---------- One item: YEAR above + card ---------- */
function RoadmapItem({
  step,
  idx,
}: {
  step: (typeof ROADMAP_ITEMS)[number];
  idx: number;
}) {
  // keep only non-app CTAs everywhere
  const filtered = (step.ctas || []).filter((c) => !/get\s*the\s*app/i.test(c.label));
  return (
    <div className="flex flex-col gap-2.5 sm:gap-3">
      <div className="pl-0.5">
        <YearSticker year={step.year} />
      </div>
      <RoadmapCard step={{ ...step, ctas: filtered }} idx={idx} />
    </div>
  );
}

/* ---------- Card body ---------- */
function RoadmapCard({
  step,
  idx,
}: {
  step: (typeof ROADMAP_ITEMS)[number];
  idx: number;
}) {
  const ref = useRevealOnScroll<HTMLDivElement>(0.25);
  const is2026 = step.year === "2026";
  const firstCta = step.ctas?.[0]; // enforce ONE CTA per card

  return (
    <div
      ref={ref}
      className="card-reveal relative group roadmap-card rounded-[26px] border border-white/18 bg-white/10 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.35)] p-5 sm:p-6 md:p-7 overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-[180px,1fr] gap-5 items-center">
        {/* Image */}
        <div className="relative w-full h-44 sm:h-40 md:h-44 lg:h-52 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/20 to-white/10 hue-rotate-anim overflow-hidden">
          <div className="absolute inset-0 rounded-2xl [clip-path:polygon(12%_0,100%_0,100%_88%,88%_100%,0_100%,0_12%)] pointer-events-none" />
          <Image
            src={step.artSrc}
            alt={`${step.year} art`}
            fill
            sizes="(max-width: 640px) 100vw, 180px"
            className="object-cover md:object-contain md:p-3"
            priority={idx < 1}
          />
        </div>

        {/* Text + CTA */}
        <div>
          <h3 className="text-[18px] sm:text-[19px] md:text-[20px] lg:text-[22px] font-extrabold text-white/95 leading-snug">
            {step.title}
          </h3>

          {step.details.length > 0 && (
            <ul className="mt-3 space-y-2 text-orange-50/90 text-[14px] leading-relaxed">
              {step.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-yellow-300/90 shrink-0 animate-pulse" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            {is2026 ? (
              <SmartAppButton />
            ) : firstCta ? (
              <Link
                href={firstCta.href}
                target="_blank"
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 text-black font-semibold shadow-md hover:scale-[1.03] active:scale-95 transition"
              >
                {firstCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Year pill ---------- */
function YearSticker({ year }: { year: string }) {
  return (
    <div className="relative inline-block select-none">
      <div className="year-pill px-5 sm:px-6 py-2 rounded-full text-2xl sm:text-3xl md:text-4xl font-extrabold text-white shadow-[0_10px_30px_rgba(0,0,0,.45)] ring-2 ring-white/20 leading-none">
        <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,.6)] tracking-wide">{year}</span>
      </div>
      <div className="absolute -inset-1 rounded-full blur-sm bg-[conic-gradient(at_50%_50%,#ffffff33,transparent_30%)] opacity-60 pointer-events-none" />
    </div>
  );
}

/* ---------- Floating particles ---------- */
function Particles() {
  const dots = new Array(20).fill(0);
  return (
    <div className="absolute inset-0">
      {dots.map((_, i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 bg-yellow-300/40 rounded-full animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${(Math.random() * 4).toFixed(2)}s`,
            animationDuration: `${(3 + Math.random() * 4).toFixed(2)}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes floaty {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.9;
          }
          50% {
            transform: translateY(-10px) scale(1.02);
            opacity: 1;
          }
        }
        .animate-float {
          animation: floaty 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* ---------- Value/Profit Carousel (stops first-render scroll) ---------- */
function ValueProfitCarousel({ slides = VALUE_SLIDES }: { slides?: typeof VALUE_SLIDES }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const didMount = useRef(false);

  const go = (dir: -1 | 1) => {
    setIndex((prev) => (prev + dir + slides.length) % slides.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true; // prevent initial scroll that could jump the page
      return;
    }
    const node = trackRef.current;
    if (!node) return;
    const slide = node.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  return (
    <section id="value" className="relative overflow-hidden py-20 md:py-24">
      {/* Gradient base to match family */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120805] via-[#2a150e] to-[#5f2c14]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-[#F3B019]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[340px] w-[340px] rounded-full bg-[#F97316]/20 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block text-xs md:text-sm tracking-[.2em] uppercase text-yellow-300/90">
            The Bean-You Value Engine
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-white">
            Free connection for users. Smart profits for the ecosystem.
          </h2>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-[1.3fr,0.9fr] gap-8 items-stretch">
          <div className="group relative rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-white/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5" />
            <Image
              key={slides[index].image}
              src={slides[index].image}
              alt={slides[index].heading}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to ${s.heading}`}
                  className={`h-2.5 w-7 rounded-full transition ${
                    i === index ? "bg-yellow-300" : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-7 bg-white/10 backdrop-blur-lg border border-white/15 shadow-[0_15px_50px_rgba(0,0,0,.35)] flex flex-col">
            <div className="flex items-start gap-4">
              <div className="shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-400 text-black grid place-items-center font-bold">
                {index + 1}
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">{slides[index].heading}</h3>
                <p className="mt-2 text-orange-50/95 leading-relaxed">{slides[index].blurb}</p>
              </div>
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-yellow-100/90 text-sm">
              {slides[index].bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-300" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6 flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                className="px-4 py-2 rounded-full bg-white/10 text-yellow-200 border border-white/20 hover:bg-white/15 transition"
                aria-label="Previous"
              >
                ← Prev
              </button>
              <button
                onClick={() => go(1)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 text-black font-semibold shadow-md hover:scale-[1.03] active:scale-95 transition"
                aria-label="Next"
              >
                Next →
              </button>
              {slides[index].cta && (
                <Link
                  href={slides[index].cta.href}
                  className="ml-auto px-4 py-2 rounded-full bg-white/10 text-yellow-200 border border-white/20 hover:bg-white/15 transition"
                >
                  {slides[index].cta.label}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: swipeable */}
        <div className="md:hidden">
          <MobileCarousel slides={VALUE_SLIDES} />
        </div>

        {/* Profit row (unchanged) */}
        {(() => {
          const profit = [
            { k: "Cafés & Events", d: "In-store revenue, memberships, promos" },
            { k: "Partners & Retail", d: "Affiliate & brand integrations" },
            { k: "Platform & iRWA", d: "Tools, services, value-add fees" },
            { k: "Token & Rewards", d: "Promotional sinks & sponsorships" },
          ];
          const slideToProfit: Record<string, number> = { connections: 3, cafes: 0, irwa: 2 };
          const active = slideToProfit[VALUE_SLIDES[index].key] ?? 0;
          return (
            <div className="mt-12 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {profit.map((t, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl border p-4 text-orange-50 transition shadow-[0_10px_30px_rgba(0,0,0,.3)] backdrop-blur-md ${
                    i === active
                      ? "border-white/40 bg-gradient-to-br from-white/20 via-[#ffffff1a] to-orange-500/20 ring-2 ring-orange-300/40 scale-[1.02]"
                      : "border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25"
                  }`}
                >
                  <div
                    className={`absolute -right-6 -top-6 h-16 w-16 rounded-full animate-float ${
                      i === active
                        ? "bg-gradient-to-br from-orange-300/60 to-yellow-300/50"
                        : "bg-gradient-to-br from-yellow-300/40 to-orange-500/30"
                    }`}
                  />
                  <p className={`text-[12.5px] uppercase tracking-wide ${i === active ? "text-white" : "text-yellow-200"}`}>
                    {t.k}
                  </p>
                  <p className={`mt-1 text-[12.5px] ${i === active ? "text-white/90" : "opacity-90"}`}>{t.d}</p>
                </div>
              ))}
            </div>
          );
        })()}

        {/* CTA bar */}
        <div className="mt-10 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-3">
          <Link
            href="/connect"
            className="px-5 py-3 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 text-black font-semibold shadow-md hover:scale-[1.03] active:scale-95 transition"
          >
            Meet Your Tribe
          </Link>
          <a
            href="https://parcels.beanyou.com/"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-full bg-white/10 text-yellow-200 border border-white/20 hover:bg-white/15 transition"
          >
            Explore Farm Platform
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Mobile carousel (stop first-render scroll) ---------- */
function MobileCarousel({ slides }: { slides: typeof VALUE_SLIDES }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true; // prevent initial auto-scroll
      return;
    }
    const node = trackRef.current;
    if (!node) return;
    const slide = node.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  return (
    <>
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
        style={{ scrollBehavior: "smooth" }}
      >
        {slides.map((s) => (
          <article
            key={s.key}
            className="snap-center shrink-0 w-[86%] rounded-3xl overflow-hidden border border-white/15 bg-white/5 shadow-[0_14px_44px_rgba(0,0,0,.35)]"
          >
            <div className="relative h-52">
              <Image src={s.image} alt={s.heading} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white">{s.heading}</h3>
              <p className="mt-1 text-[14.5px] text-orange-50/95">{s.blurb}</p>
              <ul className="mt-3 space-y-1 text-yellow-100/90 text-[13.5px]">
                {s.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-300" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {s.cta && (
                <Link
                  href={s.cta.href}
                  className="inline-block mt-4 px-4 py-2 rounded-full bg-white/10 text-yellow-200 border border-white/20 hover:bg-white/15 transition"
                >
                  {s.cta.label}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-yellow-300" : "bg-white/40"}`}
            aria-label={`Go to ${s.heading}`}
          />
        ))}
      </div>
    </>
  );
}

/* ---------- Exported wrapper ---------- */
export default function BeanYou_RoadmapAndValue() {
  useLoadAtTop();
  return (
    <div className={`${poppins.className} antialiased`}>
      <RoadmapMosaic />
      <ValueProfitCarousel />
    </div>
  );
}
