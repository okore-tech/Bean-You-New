"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import RoadmapSection from "@/components/RoadmapSection";

/* ----------------------
   Minimal enter animation
   ---------------------- */
function useEnterAnimation() {
  const rootRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = root.querySelectorAll<HTMLElement>("[data-enter]");

    if (prefersReduced) {
      els.forEach((el) => el.classList.add("entered"));
      return;
    }
    els.forEach((el) => el.classList.add("enter"));
    els.forEach((el, i) => {
      const delay = Number(el.dataset.delay ?? i * 80);
      const t = window.setTimeout(() => el.classList.add("entered"), delay);
      return () => window.clearTimeout(t);
    });
  }, []);

  return rootRef;
}

/* -------------
   HERO section
   ------------- */
function Hero() {
  const heroRef = useEnterAnimation();

  return (
    <section
      ref={heroRef as any}
      id="hero"
      className="relative w-full min-h-[100svh] md:min-h-[72vh] flex flex-col md:flex-row items-center justify-between overflow-hidden"
    >
      {/* LEFT: copy (responsive order for the strip) */}
<div className="relative z-20 w-full md:w-1/2 max-w-2xl mx-auto md:mx-0 px-4 md:px-6 pt-14 md:pt-20 pb-6">
  <div className="flex flex-col gap-5 md:gap-6">
    {/* WORD STRIP — mobile first (above), desktop (below) */}
    <div
      data-enter
      data-delay="40"
      className="order-1 md:order-2 enter:opacity-0 entered:opacity-100 transition-opacity duration-700"
    >
      <div className="relative">
        {/* tunnel mask & top sheen for depth */}
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_65%_at_50%_50%,#000_42%,transparent_78%)]" />
        <div className="pointer-events-none absolute inset-x-0 -top-1 h-1 bg-white/15 blur-[2px]" />

        {/* high‑contrast pill */}
        <div className="relative overflow-hidden rounded-full border border-white/15 bg-gradient-to-r from-amber-400/25 via-orange-500/25 to-amber-400/25 backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
          <div
            className="word-track whitespace-nowrap py-2 md:py-3 will-change-transform"
            aria-hidden="true"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="mx-6 inline-block text-[13px] md:text-[15px] font-semibold tracking-wide text-amber-50/95 drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]"
              >
                It’s not just coffee, it’s an expression of yourself.
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* H1 — vivid, legible, brandy */}
    <h1
      data-enter
      data-delay="0"
      className="order-2 md:order-1 enter:opacity-0 enter:translate-y-3 entered:opacity-100 entered:translate-y-0 transition-all duration-700 text-5xl/[1.05] md:text-7xl/[1.02] font-extrabold tracking-tight"
    >
      <span className="bg-gradient-to-b from-amber-200 via-white to-amber-200 bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(0,0,0,0.25)]">
        Find your Tribe
      </span>
    </h1>

    {/* Supporting copy */}
    <p
      data-enter
      data-delay="120"
      className="order-3 enter:opacity-0 enter:translate-y-3 entered:opacity-100 entered:translate-y-0 transition-all duration-700 text-base md:text-lg text-orange-50/95 leading-relaxed"
    >
      Explore and join communities to discover your untapped potential and opportunities that fit into your daily life.
    </p>

    {/* CTA */}
    <div
      data-enter
      data-delay="220"
      className="order-4 enter:opacity-0 enter:translate-y-3 entered:opacity-100 entered:translate-y-0 transition-all duration-700"
    >
      <Link
        href="/explore"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg hover:scale-[1.04] active:scale-95 transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span>Start Exploring</span>
      </Link>
    </div>
  </div>

  {/* local styles for track */}
  <style jsx>{`
    @keyframes tunnelScroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .word-track { display: inline-block; animation: tunnelScroll 18s linear infinite; }
    @media (prefers-reduced-motion: reduce) { .word-track { animation: none; } }
  `}</style>
</div>


      {/* RIGHT: gradient panel + image (unchanged) */}
      <div className="relative w-full md:w-1/2 flex items-end md:items-center justify-center min-h-[44svh] md:min-h-[560px]">
        {/* angled gradient: shorter on mobile so CTA fits on one screen */}
        <div className="absolute inset-x-0 bottom-0 md:inset-0 h-[46svh] md:h-full pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="hero-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
            <path d="M0,0 C25,0 25,100 0,100 L100,100 C75,100 75,0 100,0 Z" fill="url(#hero-grad)" />
          </svg>
        </div>

        {/* image: contained on desktop, fuller on mobile */}
        <div
          data-enter
          data-delay="320"
          className="enter:opacity-0 enter:translate-y-3 entered:opacity-100 entered:translate-y-0 transition-all duration-700 relative z-10 w-4/5 md:w-3/4 max-w-[560px] aspect-[1/1]"
        >
          <Image
            src="/images/hero1.png"
            alt="Hero Image"
            fill
            priority
            sizes="(max-width: 768px) 80vw, 38vw"
            className="object-contain"
          />
        </div>
      </div>

      {/* local utility styles for enter/entered + word track */}
      <style >{`
        .enter\\:opacity-0.enter { opacity: 0; }
        .enter\\:translate-y-3.enter { transform: translateY(12px); }
        .entered\\:opacity-100.entered { opacity: 1; }
        .entered\\:translate-y-0.entered { transform: translateY(0); }

        /* Word tunnel / marquee */
        @keyframes tunnelScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .word-track {
          display: inline-block;
          animation: tunnelScroll 18s linear infinite;
          /* “tunnel” feel via slight perspective & skew */
          transform-origin: center;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .word-track { animation: none; }
        }
      `}</style>
    </section>
  );
}

export default function HomePage() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <main>
      {/* HERO (new) */}
      <Hero />

      {/* IDENTIFY YOUR INTERESTS */}
      <section className="bg-brand-deep py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2" data-aos="fade-right">
            <Image
              src="/images/interests.jpg"
              alt="Identify Interests"
              width={1200}
              height={800}
              className="w-full rounded-xl shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-6" data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-300">Identify Your Interests</h2>
            <p className="text-orange-100 text-lg">
              Bean You is about giving people a space to learn, trade, and invest. Choose your interests and we’ll help
              you discover communities that match.
            </p>
            <Link
              href="/connect"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <RoadmapSection />

      {/* COMMUNITY */}
      <section id="community" className="py-20 bg-brand-deep text-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:space-x-12" data-aos="fade-up">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/images/community.jpg"
              alt="Join Community"
              width={1200}
              height={640}
              className="rounded-2xl shadow-lg w-full h-64 md:h-80 object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold mb-4">Join the Community</h2>
            <p className="text-orange-100 text-lg mb-6">
              Let’s brew great communities together. Connect with like-minded people and access exclusive opportunities.
            </p>
            <Link
              href="/social"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Join Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
