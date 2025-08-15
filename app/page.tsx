"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BeanYou_RoadmapAndValue from "@/components/BeanYou_RoadmapAndValue";

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
      {/* HERO */}
      <section className="relative w-full min-h-[500px] md:min-h-[600px] flex flex-col md:flex-row items-center justify-between overflow-hidden">
        <div
          className="relative z-20 w-full md:w-1/2 px-4 md:px-4 py-10 md:py-16 space-y-6 max-w-2xl mx-auto md:mx-0"
          data-aos="fade-right"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Find your Tribe
          </h1>
          <p className="text-lg text-orange-100 leading-relaxed">
            Explore and join communities to discover untapped potentials and opportunities that fit into your daily life.
          </p>
          <Link
            href="#roadmap"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>Start Exploring</span>
          </Link>
        </div>

        <div className="relative w-full md:w-1/2 flex items-end md:items-center justify-center min-h-[500px]">
          {/* angled gradient shape */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M0,0 C25,0 25,100 0,100 L100,100 C75,100 75,0 100,0 Z" fill="url(#grad)" />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FACC15" stopOpacity="1" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute bottom-0 md:relative z-10 w-2/3 md:w-3/4 max-w-lg" data-aos="fade-up">
            <Image
              src="/images/hero1.png"
              alt="Hero Image"
              width={900}
              height={900}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

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
      <BeanYou_RoadmapAndValue />

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
