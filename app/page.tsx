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
    // Always start at top so hero is visible on route/reload
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
      // cleanup per element timeout if needed
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
      {/* LEFT: copy */}
      <div className="relative z-20 w-full md:w-1/2 max-w-2xl mx-auto md:mx-0 px-4 md:px-6 pt-14 md:pt-20 pb-6 space-y-5">
        <h1
          data-enter
          data-delay="0"
          className="enter:opacity-0 enter:translate-y-3 entered:opacity-100 entered:translate-y-0 transition-all duration-700 text-4xl/[1.1] md:text-6xl/[1.05] font-extrabold text-white tracking-tight"
        >
          Find your Tribe
        </h1>

        <p
          data-enter
          data-delay="120"
          className="enter:opacity-0 enter:translate-y-3 entered:opacity-100 entered:translate-y-0 transition-all duration-700 text-base md:text-lg text-orange-100/95 leading-relaxed"
        >
          Explore and join communities to discover untapped potentials and opportunities
          that fit into your daily life.
        </p>

        <div
          data-enter
          data-delay="220"
          className="enter:opacity-0 enter:translate-y-3 entered:opacity-100 entered:translate-y-0 transition-all duration-700"
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

      {/* RIGHT: gradient panel + image */}
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

      {/* local utility styles for enter/entered */}
      <style jsx>{`
        .enter\\:opacity-0.enter { opacity: 0; }
        .enter\\:translate-y-3.enter { transform: translateY(12px); }
        .entered\\:opacity-100.entered { opacity: 1; }
        .entered\\:translate-y-0.entered { transform: translateY(0); }
      `}</style>
    </section>
  );
}

export default function HomePage() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const redirectToApp = () => {
    if (typeof window === "undefined") return;
    const userAgent =
      navigator.userAgent || (navigator as any).vendor || (window as any).opera;

    if (/android/i.test(userAgent)) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      window.location.href =
        "https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2";
    } else {
      alert("Please scan the QR code with your phone to download the app.");
    }
  };

  return (
    <main>
      {/* HERO (new) */}
      <Hero />

      {/* IDENTIFY YOUR INTERESTS */}
      <section className="bg-brand-deep py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2" data-aos="fade-right">
            <Image
              src="/images/interests.jpg"  // ✅ fixed path
              alt="Identify Interests"
              width={1200}
              height={800}
              className="w-full rounded-xl shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-6" data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl font-bold">Identify Your Interests</h2>
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

      {/* ROADMAP + VALUE/PROFIT CAROUSEL */}
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
