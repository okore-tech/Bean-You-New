"use client";

import { useEffect } from "react";

export default function AboutPage() {
  // Optional AOS (animation on scroll)
  useEffect(() => {
    (async () => {
      try {
        const AOS = (await import("aos")).default;
        await import("aos/dist/aos.css");
        AOS.init({ duration: 800, once: true, easing: "ease-out" });
      } catch {
        /* AOS not installed: ignore */
      }
    })();
  }, []);

  const directors = [
    { name: "Patrick Ngumi", role: "Interim CEO", img: "/images/patrick.png" },
    { name: "Peter Kangiri", role: "Founder", img: "/images/peter.png" },
    { name: "Duncan Kinuthia", role: "Retail Director", img: "/images/duncan.png" },
    { name: "Olinga Taeed", role: "Executive Chair", img: "/images/OLINGA.png" },
  ];

  const nonExecs = [
    {
      name: "Carlos Casthilos",
      role:
        "25 years experience with grain production and commercialization, focusing on soya‑beans and coffee",
      img: "/images/exec1.png",
    },
    {
      name: "Anja Rahn",
      role:
        "Coffee scientist with deep knowledge of coffee and aromatherapy with practical applications",
      img: "/images/exec2.png",
    },
    {
      name: "Barbara Taeed",
      role: "Senior career UK banker with more than 30 years at Barclays",
      img: "/images/exec3.png",
    },
  ];

  const partners = [
    {
      name: "Quickmart",
      img: "/images/quickmart.png",
      desc:
        "Second largest retailer in Kenya, operates over 60 superstores with 7000+ employees; one of the top 50 fastest growing companies in Africa.",
    },
    {
      name: "Family Bank",
      img: "/images/familybank.png",
      desc:
        "A regulated commercial Kenyan bank with 92 branches and 1.7M+ customers. Very active with farming and land.",
    },
    {
      name: "Citizen TV",
      img: "/images/citizen (1).png",
      desc: "The leading broadcaster (TV & Radio) in Kenya with ~90% of the market.",
    },
    {
      name: "Strathmore University",
      img: "/images/strathmore.png",
      desc: "A leading chartered not‑for‑profit university in Kenya with 4500+ students.",
    },
    {
      name: "NEMA",
      img: "/images/nema.png",
      desc:
        "The principal instrument of the Kenyan Government for the implementation of environmental policy.",
    },
    {
      name: "Stanbic Bank",
      img: "/images/stanbic (1).png",
      desc: "A financial services provider in Kenya with subsidiaries across Africa.",
    },
  ];

  return (
    <main
      className="text-white"
      style={{ backgroundColor: "#652B06", fontFamily: "Poppins, sans-serif" }}
    >
    

      {/* HERO */}
      <section className="bg-[#793A17] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text */}
          <div
            className="md:w-1/2 flex flex-col md:items-start items-center text-center md:text-left space-y-6 order-1"
            data-aos="fade-right"
          >
            <p className="text-white text-lg font-mono animated-text">From seed to heart</p>
            <h1 className="text-5xl md:text-6xl font-black text-[#F3B019]">BEAN YOU</h1>
            <p className="text-orange-100 text-xl leading-relaxed">
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

      {/* DIRECTORS (frosted cards) */}
      <section id="directors" className="bg-gradient-to-br from-[#FBE9E7] to-[#FFF3E0] py-20 text-[#2C150C]">
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
                  <img
                    src={d.img}
                    alt={d.name}
                    className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                    loading="lazy"
                  />
                  <h3 className="font-semibold text-lg">{d.name}</h3>
                  <p className="text-sm opacity-80">{d.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NON-EXECUTIVES (frosted rows) */}
      <section id="non-executives" className="bg-gradient-to-br from-[#FFF8F1] to-[#FFEFD9] py-20 text-[#2C150C]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-12">Non‑Executives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {nonExecs.map((n, i) => (
              <div
                key={n.name}
                className="relative flex items-center gap-4 p-4 rounded-2xl"
                data-aos="fade-up"
                data-aos-delay={100 + i * 50}
              >
                {/* glass frosting */}
                <div className="absolute inset-0 rounded-2xl bg-white/40 backdrop-blur-xl ring-1 ring-white/50 shadow-xl" />
                <img
                  src={n.img}
                  alt={n.name}
                  className="relative w-24 h-24 rounded-full object-cover shrink-0"
                  loading="lazy"
                />
                <div className="relative">
                  <h3 className="font-semibold text-lg">{n.name}</h3>
                  <p className="text-sm opacity-80">{n.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS (cards with frosted hover overlay) */}
      <section id="partners" className="bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-12 text-[#3E1E0D]">Partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((p, i) => (
              <div
                key={p.name}
                className="relative group overflow-hidden rounded-2xl shadow-xl"
                data-aos="zoom-in"
                data-aos-delay={100 + i * 50}
              >
                <img src={p.img} alt={p.name} className="w-full h-48 object-cover" loading="lazy" />
                <div className="absolute bottom-0 inset-x-0 px-4 py-3 text-sm text-[#2C150C] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* frosted overlay */}
                  <div className="absolute inset-0 bg-white/35 backdrop-blur-md rounded-t-2xl" />
                  <p className="relative">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page-scoped styles for typing effect */}
      <style jsx global>{`
        .animated-text {
          overflow: hidden;
          white-space: nowrap;
          border-right: 0.15em solid #f3b019;
          animation: typing 3s steps(30, end), blink 0.75s step-end infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animated-text {
            border-right: none;
            animation: none;
          }
          [data-aos] {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
