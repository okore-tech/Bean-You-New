"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

/* --------------------------------
   Shared deep-link helper (app UX)
   -------------------------------- */
function useAppRedirect() {
  return () => {
    if (typeof window === "undefined") return;
    const ua = navigator.userAgent || (navigator as any).vendor || (window as any).opera;
    try { localStorage.setItem("cupTooltipSeen", "1"); } catch {}
    if (/android/i.test(ua)) {
      window.location.href = "https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB";
      return;
    }
    if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) {
      window.location.href = "https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2";
      return;
    }
    alert("On mobile? Tap to open your app store. Otherwise, use the QR code below to install the app.");
  };
}

/* ----------------------
   Small inline cup (mobile)
   ---------------------- */
function AppCupInline({ size = 28 }: { size?: number }) {
  const redirectToApp = useAppRedirect();
  const [ripples, setRipples] = useState<{ id: number }[]>([]);

  return (
    <button
      type="button"
      onClick={() => {
        setRipples((r) => [...r, { id: Date.now() }]);
        setTimeout(() => setRipples((r) => r.slice(1)), 520);
        redirectToApp();
      }}
      className="relative md:hidden shrink-0 ml-2 rounded-full outline-none focus:ring-2 focus:ring-yellow-300"
      aria-label="Install the Bean You app"
    >
      {/* ripple */}
      <div className="pointer-events-none absolute inset-0">
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute left-1/2 top-1/2 block w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-[0.5px] animate-cupRipple"
          />
        ))}
      </div>
      <Image
        src="/images/coffee-cup.png"
        alt="App cup"
        width={size}
        height={size}
        className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
        priority
      />
      <style >{`
        @keyframes cupRipple {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(2.0); opacity: 0; }
        }
        .animate-cupRipple { animation: cupRipple 0.52s ease-out forwards; }
      `}</style>
    </button>
  );
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
          className="enter:opacity-0 enter:translate-y-3 entered:opacity-100 entered:translate-y-0 transition-all duration-700 text-4xl/[1.1] md:text-6xl/[1.05] font-extrabold tracking-tight"
        >
          <span className="block text-3xl md:text-6xl text-orange-400">It&apos;s not just</span>
          <span className="block text-5xl md:text-[6.5rem] leading-none text-black">coffee,</span>
          <span className="block text-lg md:text-2xl text-yellow-300 mt-2">it&apos;s an expression of yourself.</span>
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
          className="enter:opacity-0 enter:translate-y-3 entered:opacity-100 entered:translate-y-0 transition-all duration-700 flex items-center"
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
          {/* mini cup next to CTA (mobile only) */}
          <AppCupInline />
        </div>
      </div>

      {/* RIGHT: gradient panel + image */}
      <div className="relative w-full md:w-1/2 flex items-end md:items-center justify-center min-h-[44svh] md:min-h-[560px]">
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

      <style>{`
        .enter\\:opacity-0.enter { opacity: 0; }
        .enter\\:translate-y-3.enter { transform: translateY(12px); }
        .entered\\:opacity-100.entered { opacity: 1; }
        .entered\\:translate-y-0.entered { transform: translateY(0); }
      `}</style>
    </section>
  );
}

/* ----------------------
   Site-wide interactive cup (desktop/tablet)
   - shakes when Roadmap enters view
   ---------------------- */
function CupOverlay() {
  const redirectToApp = useAppRedirect();
  const [ripples, setRipples] = useState<{ id: number }[]>([]);
  const [yOffset, setYOffset] = useState(0);
  const [shake, setShake] = useState(false);

  // subtle parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY;
      setYOffset(Math.min(12, s * 0.02)); // clamp to 12px
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // shake when Roadmap enters viewport
  useEffect(() => {
    const target = document.getElementById("roadmap-anchor");
    if (!target) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShake(true);
            const t = setTimeout(() => setShake(false), 900);
            return () => clearTimeout(t);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const handleClick = () => {
    setRipples((arr) => [...arr, { id: Date.now() }]);
    setTimeout(() => setRipples((arr) => arr.slice(1)), 550);
    redirectToApp();
  };

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="hidden md:block fixed z-[60] bottom-6 right-4 md:right-10 select-none"
      style={{ transform: `translateY(-${yOffset}px)` }}
    >
      <div
        className={`relative w-16 h-16 md:w-40 md:h-40 cursor-pointer ${shake ? "animate-cupShake" : "animate-cupFloat"}`}
        role="button"
        aria-label="Open app store to install Bean You"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={onKey}
      >
        {/* ripples */}
        <div className="pointer-events-none absolute inset-0">
          {ripples.map((r) => (
            <span
              key={r.id}
              className="absolute left-1/2 top-1/2 block w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-[1px] animate-cupRipple"
            />
          ))}
        </div>

        {/* shadow blob */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-28 h-8 md:w-44 md:h-10 rounded-full bg-black/25 blur-xl animate-shadowPulse" />

        {/* cup image */}
        <Image src="/coffee-cup.png" alt="Bean You coffee cup" fill className="object-contain" priority />
      </div>

      <style jsx>{`
        @keyframes cupFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes cupRipple { 0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0.6; } 100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; } }
        @keyframes shadowPulse { 0%, 100% { transform: translateX(-50%) scale(0.95, 0.8); opacity: 0.55; } 50% { transform: translateX(-50%) scale(1.08, 0.9); opacity: 0.75; } }
        @keyframes cupShake {
          0% { transform: translateY(0) rotate(0deg); }
          20% { transform: translateY(-2px) rotate(-6deg); }
          40% { transform: translateY(0) rotate(4deg); }
          60% { transform: translateY(-1px) rotate(-3deg); }
          80% { transform: translateY(0) rotate(2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-cupRipple { animation: cupRipple 0.55s ease-out forwards; }
        .animate-shadowPulse { animation: shadowPulse 2.8s ease-in-out infinite; }
        .animate-cupFloat { animation: cupFloat 4.8s ease-in-out infinite; }
        .animate-cupShake { animation: cupShake 0.9s ease-in-out 1; }

        @media (prefers-reduced-motion: reduce) {
          .animate-cupRipple,
          .animate-shadowPulse,
          .animate-cupFloat,
          .animate-cupShake {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function HomePage() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <main>
      {/* HERO */}
      <Hero />

      {/* site-wide cup overlay (desktop/tablet) */}
      <CupOverlay />

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
            <div className="flex items-center">
              <Link
                href="/connect"
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Get Started
              </Link>
              {/* mini cup next to CTA (mobile only) */}
              <AppCupInline />
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP (wrap with anchor for shake trigger) */}
      <div id="roadmap-anchor">
        <RoadmapSection />
      </div>

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
            <div className="flex items-center">
              <Link
                href="/social"
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Join Now
              </Link>
              {/* mini cup next to CTA (mobile only) */}
              <AppCupInline />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
