"use client";

import { useEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export default function AboutPage() {
  // AOS
  useEffect(() => {
    (async () => {
      try {
        const AOS = (await import("aos")).default;
        await import("aos/dist/aos.css");
        AOS.init({ duration: 800, once: true, easing: "ease-out" });
      } catch {
        /* AOS optional */
      }
    })();
  }, []);

  // DATA
  const directors = [
    { name: "Patrick Ngumi", role: "Interim CEO", img: "/images/patrick.png", linkedin: "https://www.linkedin.com/in/patrick-ngumi" },
    { name: "Peter Kangiri", role: "Founder", img: "/images/peter.png", linkedin: "https://www.linkedin.com/in/peter-kang-iri-790794151" },
    { name: "Duncan Kinuthia", role: "Retail Director", img: "/images/duncan.png", linkedin: "https://www.linkedin.com/in/duncan-kinuthia-9ba92448" },
    { name: "Olinga Taeed", role: "Executive Chair", img: "/images/OLINGA.png", linkedin: "https://linkedin.com/in/olingataeed" },
  ];

  const nonExecs = [
    { name: "Carlos Casthilos", role: "25 years experience with grain production and commercialization, focusing on soya-beans and coffee", img: "/images/exec1.png" },
    { name: "Anja Rahn", role: "Coffee scientist with deep knowledge of coffee and aromatherapy with practical applications", img: "/images/exec2.png" },
    { name: "Barbara Taeed", role: "Senior career UK banker with more than 30 years at Barclays", img: "/images/exec3.png" },
  ];

  const localPartners = [
    { name: "Quickmart", img: "/images/quickmart.png", desc: "Second largest retailer in Kenya, 60+ superstores; one of Africa’s fastest growing companies." },
    { name: "Family Bank", img: "/images/familybank.png", desc: "Regulated Kenyan bank with 92 branches and 1.7M+ customers; strong in farming and land." },
    { name: "Strathmore University", img: "/images/strathmore.png", desc: "Leading not-for-profit university in Kenya with 4,500+ students." },
    { name: "NEMA", img: "/images/nema.png", desc: "Government instrument for environmental policy implementation in Kenya." },
    { name: "Stanbic Bank", img: "/images/stanbic (1).png", desc: "Financial services provider in Kenya with subsidiaries across Africa." },
  ];

  const internationalPartners = [
    { name: "CCEG Blockchain UN lab", img: "/images/partnerblockchain.png", desc: "Global 4IR collaborator." },
    { name: "AITEA ", img: "/images/hovername.png", desc: "AI / Web3 specialist." },
    { name: "MiValues", img: "/images/mivalues.jpg", desc: "Blockchain & ESG tooling." },
     { name: "MiMeta", img: "/images/mimeta.jpg", desc: "Blockchain & ESG tooling." },
  { name: "Aiza World", img: "/images/aiza.png", desc: "Blockchain & ESG tooling." },
{ name: "Cyber Future", img: "/images/partner4.png", desc: "Blockchain & ESG tooling." },
{ name: "Citizenship Enterprise and Governance", img: "/images/partner5.png", desc: "Blockchain & ESG tooling." },
];
  return (
    <main className={`${poppins.className} text-white overflow-x-hidden`} style={{ backgroundColor: "#652B06" }}>
      {/* HERO */}
      <section className="bg-[#793A17] py-20 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text */}
          <div className="md:w-1/2 flex flex-col md:items-start items-center text-center md:text-left space-y-6 order-1" data-aos="fade-right">
            <p className="text-white text-lg font-mono animated-text">From Seed to your Heart</p>
            <h1 className="text-5xl md:text-6xl font-black text-[#F3B019]">BEAN YOU</h1>
            <p className="text-orange-100 text-lg md:text-xl leading-relaxed">
              Connecting people globally through coffee plots, shared values, and brand collaborations.
              Empowering movements & communities with purpose.
            </p>
          </div>

          {/* Cups & Buttons */}
          <div
            className="md:w-1/2 flex flex-col sm:flex-row gap-6 items-center justify-center order-2 md:order-none"
            data-aos="fade-left"
          >
            <div className="flex flex-col items-center">
              <img src="/images/first.png" className="w-20 h-20 rounded-full shadow-lg" alt="" loading="lazy" />
              <a
                href="#directors"
                className="mt-2 bg-[#F3B019] text-[#793A17] px-4 py-1 rounded-full text-sm font-semibold hover:scale-105 transition"
              >
                Directors
              </a>
                </div>
            <div className="flex flex-col items-center">
              <img src="/images/second.png" className="w-20 h-20 rounded-full shadow-lg" alt="" loading="lazy" />
              <a
                href="#non-executives"
                className="mt-2 bg-[#F3B019] text-[#793A17] px-4 py-1 rounded-full text-sm font-semibold hover:scale-105 transition"
              >
                Non‑Executives
              </a>
                </div>
            <div className="flex flex-col items-center">
              <img src="/images/last.png" className="w-20 h-20 rounded-full shadow-lg" alt="" loading="lazy" />
              <a
                href="#partners"
                className="mt-2 bg-[#F3B019] text-[#793A17] px-4 py-1 rounded-full text-sm font-semibold hover:scale-105 transition"
              >
                Partners
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT ABOUT US */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row overflow-hidden rounded-xl shadow-lg">
          <div className="w-full md:w-1/2">
            <img
              src="/images/Project - Afro Hair Day 1.png"
              alt="hero woman"
              className="object-cover w-full h-full max-h-[360px]"
              loading="lazy"
            />
          </div>
          <div className="w-full md:w-1/2 bg-[#C91F1F] p-10 flex flex-col justify-center" data-aos="fade-up">
            <p className="uppercase text-sm tracking-widest text-orange-100 animate-pulse">Uniquely You</p>
            <h2 className="text-4xl font-bold text-[#F3B019] mt-2 mb-4">About Us</h2>
            <p className="text-white text-lg leading-relaxed max-w-md">
              We are passionate about connecting people worldwide who share similar values, interests, and goals.
            </p>
          </div>
        </div>
      </section>

      {/* DIRECTORS */}
      <section id="directors" className="bg-gradient-to-br from-[#FBE9E7] to-[#FFF3E0] py-20 text-[#2C150C] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-12">Our Directors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {directors.map((d, i) => (
              <div
                key={d.name}
                className="relative p-6 text-center rounded-2xl"
                data-aos="fade-up"
                data-aos-delay={100 + i * 50}
              >
                {/* glass frosting */}
                <div className="absolute inset-0 rounded-2xl bg-white/40 backdrop-blur-xl ring-1 ring-white/50 shadow-xl" />
                <div className="relative">
                  <img src={d.img} alt={d.name} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" loading="lazy" />
                  <h3 className="font-semibold text-lg">{d.name}</h3>
                  <p className="text-sm opacity-80">{d.role}</p>

                  {/* Icon-only LinkedIn button */}
                  <a
                    href={d.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${d.name} LinkedIn`}
                    title="LinkedIn"
                    className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/50"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.2 2.3-2.46 4.73-2.46 5.06 0 6 3.33 6 7.66V24h-5v-7.6c0-1.81-.03-4.14-2.52-4.14-2.52 0-2.91 1.97-2.91 4V24h-5V8z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NON-EXECUTIVES */}
      <section id="non-executives" className="bg-gradient-to-br from-[#FFF8F1] to-[#FFEFD9] py-20 text-[#2C150C] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-12">Non-Executives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {nonExecs.map((n, i) => (
              <div key={n.name} className="relative flex items-center gap-4 p-4 rounded-2xl" data-aos="fade-up" data-aos-delay={100 + i * 50}>
                <div className="absolute inset-0 rounded-2xl bg-white/40 backdrop-blur-xl ring-1 ring-white/50 shadow-xl" />
                <img src={n.img} alt={n.name} className="relative w-24 h-24 rounded-full object-cover shrink-0" loading="lazy" />
                <div className="relative">
                  <h3 className="font-semibold text-lg">{n.name}</h3>
                  <p className="text-sm opacity-80">{n.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <TechnologySection />

      {/* PARTNERS */}
      <section id="partners" className="bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] py-20 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-[#3E1E0D]">Partners</h2>

          {/* Local Pilot Partners */}
          <h3 className="mt-10 mb-4 text-xl font-semibold text-[#5c2c16]">Local Pilot Partners</h3>
          <PartnerGallery items={localPartners} />

          {/* International Partners */}
          <h3 className="mt-12 mb-4 text-xl font-semibold text-[#5c2c16]">International Partners</h3>
          <PartnerGallery
            items={internationalPartners}
            tagForName="AITEA" /* small tag only on the partner whose name contains AITEA */
          />
        </div>
      </section>

      {/* Page-scoped styles */}
      <style jsx global>{`
        .animated-text {
          overflow: hidden;
          white-space: nowrap;
          border-right: 0.15em solid #f3b019;
          animation: typing 3s steps(30, end), blink 0.75s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes typing { from { width: 0; } to { width: 100%; } }
        @media (prefers-reduced-motion: reduce) {
          .animated-text { border-right: none; animation: none; }
          [data-aos] { transition: none !important; animation: none !important; }
        }
      `}</style>
    </main>
  );
}

/* ========= Technology Section ========= */
function TechnologySection() {
  return (
    <section id="technology" className="relative py-16 md:py-20 overflow-x-hidden" aria-labelledby="technology-title">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a150e] via-[#793A17] to-[#F3B019] opacity-90" />
        <div className="absolute inset-0 [clip-path:polygon(0_8%,100%_0,100%_92%,0_100%)] bg-white/10" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[380px] w-[380px] rounded-full bg-[#F3B019]/20 blur-3xl max-w-[100vw]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#F97316]/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <header className="text-center mb-10" data-aos="fade-up">
          <span className="inline-block text-xs md:text-sm tracking-[.2em] uppercase text-yellow-300/90">Innovation Backbone</span>
          <h2 id="technology-title" className="mt-3 text-3xl md:text-5xl font-extrabold text-white">Technology</h2>
          <p className="mt-2 max-w-3xl mx-auto text-orange-50/95">Fourth Industrial Revolution partners, research whitepapers, and impact-linked tokens.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-6 items-stretch">
          {/* LEFT: compact cards with blocking hover overlays */}
          <div className="grid sm:grid-cols-2 gap-4" data-aos="fade-right">
            {[
              {
                title: "4IR Partners",
                subtitle: "AI • Blockchain • IoT • 5G • Web3",
                details: "Onboarded in 2024; 15-month collaboration powering ESG tech for Bean You® and pilot farms at Asili Coffee Estates.",
                chips: ["China", "Vietnam", "Switzerland", "Portugal", "UK", "USA"],
              },
              {
                title: "SER & Whitepapers",
                subtitle: "Centre for Citizenship, Enterprise & Governance",
                details: "Social Earnings Ratio® measures social impact using sentiment analysis. Developed since 2011; 16th paper in 2024; 220k+ community.",
                link: { href: "https://ccegblockchain.com/white-papers/", label: "CCEG White Papers" },
              },
              {
                title: "Tokens & Points",
                subtitle: "ETH (SER) • ETC (MCR)",
                details: "Value linked to measurable social impact for farms & farmers; non-financial points on MCR.",
              },
            ].map((card) => (
              <article key={card.title} className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-lg p-5 shadow-[0_14px_44px_rgba(0,0,0,.35)]" tabIndex={0}>
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <p className="mt-1 text-sm text-yellow-100/90">{card.subtitle}</p>
                {"chips" in card && (
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-yellow-100/90">
                    {(card as any).chips.map((c: string) => (
                      <span key={c} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/15">{c}</span>
                    ))}
                  </div>
                )}
                {"link" in card && (card as any).link && (
                  <a
                    href={(card as any).link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm underline underline-offset-4 text-yellow-200 hover:text-yellow-100"
                  >
                    {(card as any).link.label}
                  </a>
                )}
                {/* blocking hover overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" aria-hidden="true">
                  <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center p-5">
                    <p className="text-[13px] text-white leading-relaxed text-center">{card.details}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* RIGHT: Chandler spotlight */}
          <aside className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg p-0 shadow-[0_20px_60px_rgba(0,0,0,.35)]" data-aos="fade-left" tabIndex={0}>
            <div className="relative h-48 w-full bg-gradient-to-r from-yellow-300/30 to-orange-500/30">
              <img src="/images/chandler.jpeg" alt="Chandler Guo" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity" loading="lazy" />
              <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,100%_78%,0_100%)] bg-gradient-to-b from-transparent to-[#00000066]" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[.2em] text-yellow-200/90">Early Support</p>
              <h3 className="mt-1 text-2xl font-bold text-white">Chandler Guo</h3>
              <p className="mt-1 text-sm text-orange-50/95">A major crypto miner who supported SER early and now lives in the US.</p>
              <div className="mt-4">
                <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-yellow-200 text-xs">Hover or focus to read more</span>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" aria-hidden="true">
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <p className="text-sm text-white leading-relaxed text-center max-w-md">
                  SER (Social Earnings Ratio®) and MCR were both created in 2017 as part of the UK’s first official ICO process.
                  Bean You® builds on this foundation to link value with measurable social impact.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ========= PartnerGallery (modern slider w/ dots on mobile, grid on desktop) ========= */
function PartnerGallery({
  items,
  tagForName,
}: {
  items: { name: string; img: string; desc?: string }[];
  tagForName?: string; // e.g., "AITEA" to tag only that partner card
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  // Mobile dots + swipe sync
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const slides = Array.from(el.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = slides.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { root: el, threshold: 0.6 }
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const node = el.children[i] as HTMLElement | undefined;
    node?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const matchesTag = (name: string) =>
    tagForName ? name.toLowerCase().includes(tagForName.toLowerCase()) : false;

  return (
    <>
      {/* Desktop grid with glass-frost hover reveal */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-6">
        {items.map((p) => {
          const showTag = matchesTag(p.name);
          return (
            <article
              key={p.name}
              className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-md"
            >
              <div className="relative h-24 w-full bg-white">
                <img
                  src={p.img}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-contain p-3"
                  loading="lazy"
                />
              </div>
              <div className="px-3 py-3">
                <p className="text-[12px] text-[#3b1a0b] font-semibold truncate">{p.name}</p>
              </div>

              {/* Hover reveal */}
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-white/65 backdrop-blur-xl ring-1 ring-white/60" />
                <div className="relative h-full w-full p-4 flex items-center justify-center">
                  <p className="text-[12px] text-[#3b1a0b] text-center leading-relaxed">{p.desc || "—"}</p>
                </div>
                {showTag && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 text-[#3b1a0b] text-[10px] font-bold shadow">
                    {tagForName}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Mobile swipe + dots */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1"
          style={{ scrollBehavior: "smooth" }}
        >
          {items.map((p) => {
            const showTag = matchesTag(p.name);
            return (
              <article
                key={p.name}
                className="snap-center shrink-0 w-[75%] rounded-2xl overflow-hidden bg-white ring-1 ring-black/5 shadow-md relative"
              >
                <div className="relative h-28 w-full bg-white">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-contain p-3"
                    loading="lazy"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-[13px] text-[#3b1a0b] font-semibold">{p.name}</p>
                </div>

                {/* Tap/hover reveal */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-xl ring-1 ring-white/60" />
                  <div className="relative h-full w-full p-4 flex items-center justify-center">
                    <p className="text-[12px] text-[#3b1a0b] text-center leading-relaxed">{p.desc || "—"}</p>
                  </div>
                  {showTag && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 text-[#3b1a0b] text-[10px] font-bold shadow">
                      {tagForName}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Dots */}
        <div className="mt-3 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${active === i ? "bg-[#3b1a0b]" : "bg-[#3b1a0b]/30"}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
