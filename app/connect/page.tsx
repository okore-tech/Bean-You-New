"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Types */
type Tribe = {
  id: string;
  name: string;
  img: string;
  desc: string;
};

/** Page */
export default function ConnectPage() {
  const pathname = usePathname();

  // Header + Mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Parallax
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  // Carousel
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Modal
  const tribes: Tribe[] = useMemo(
    () => [
      {
        id: "genz",
        name: "GEN-Z",
        img: "/images/genz.png",
        desc: "Young creators and disruptors connected to new age culture and innovation.",
      },
      {
        id: "investor",
        name: "Investor",
        img: "/images/investor.jpg",
        desc: "Visionaries supporting innovation through investment in sustainable ecosystems.",
      },
      {
        id: "coffee",
        name: "Coffee Lover",
        img: "/images/coffeelover2.jpg",
        desc: "Passionate about every sip, origin and ritual of your brew.",
      },
      {
        id: "eco",
        name: "Eco Warrior",
        img: "/images/ecowarrior.jpg",
        desc: "Green-spirited advocates transforming the planet one step at a time.",
      },
      {
        id: "global",
        name: "Global Community",
        img: "/images/community.jpg",
        desc: "Social connectors making local-global impact from where they stand.",
      },
    ],
    []
  );
  const [activeTribe, setActiveTribe] = useState<Tribe | null>(null);

  // “How to get connected” cards (mobile toggle + desktop hover)
  const [openCard, setOpenCard] = useState<Record<number, boolean>>({});
  const toggleCard = (i: number) =>
    setOpenCard((prev) => ({ ...prev, [i]: !prev[i] }));

  const CARDS = [
    {
      title: "🌱 Choose Your Bean",
      lead: "Select the bean crop and community category that aligns with your passion.",
      detail:
        "Start by selecting a type of bean that symbolizes your identity. This gives you a symbolic crop and community entry point.",
    },
    {
      title: "🪴 Claim Your Plot",
      lead: "Register and reserve your symbolic plot in the Bean–You digital farm.",
      detail:
        "Every tribe member gets a symbolic plot where their bean story grows. It’s your badge of belonging.",
    },
    {
      title: "📍 Track Your Journey",
      lead: "Monitor your community growth, challenges and rewards through the app.",
      detail:
        "Follow the progress of your bean plot and tribe. Earn badges, unlock perks and celebrate community wins.",
    },
    {
      title: "🌍 Connect",
      lead: "Find your tribe, share ideas, and unlock opportunities with other members.",
      detail:
        "You’re now a part of a tribe — engage in events, courses, and shared projects via the Bean‑You platform.",
    },
  ];

  /** Effects: header scroll, parallax, lazy AOS */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setScrolled(y > 10);
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${y * 0.3}px)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const AOS = (await import("aos")).default;
        await import("aos/dist/aos.css");
        AOS.init({ duration: 900, once: true, easing: "ease-out" });
      } catch {
        // AOS not installed — ignore
      }
    })();
  }, []);

  /** Helpers */
  const isActive = (href: string) => pathname === href;

  const scrollCarousel = (dir: number) => {
    if (!trackRef.current) return;
    const scrollAmount = 280;
    trackRef.current.scrollBy({ left: scrollAmount * dir, behavior: "smooth" });
  };

  const openModal = (id: string) =>
    setActiveTribe(tribes.find((t) => t.id === id) ?? null);
  const closeModal = () => setActiveTribe(null);

  const redirectToApp = () => {
    const ua = navigator.userAgent || (navigator as any).vendor || (window as any).opera;
    if (/android/i.test(ua)) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB";
    } else if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) {
      window.location.href =
        "https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2";
    } else {
      alert("Please open this on your phone or scan our QR code to download the app.");
    }
  };

  /** Render */
  return (
    <div
      style={{ background: "#BD570F", fontFamily: "Poppins, sans-serif" }}
      className="text-white"
    >

      {/* HERO */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[rgba(197,17,17,0.23)] backdrop-blur-md z-0" />
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 z-10">
          <div className="w-full md:w-1/2 text-white" data-aos="fade-right">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Create opportunities globally, find your tribe
              <br />
              and get connected with <span className="text-yellow-300">Bean‑You</span>
            </h1>
            <a
              href="#tribes"
              className="inline-block mt-4 px-8 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 shadow-lg transform hover:scale-105 transition"
            >
              START
            </a>
          </div>

          <div className="relative w-full md:w-[500px] h-[500px] mx-auto mt-10 md:mt-0">
            <div className="absolute top-14 left-20 w-[200px] h-[260px] border-2 border-dashed border-white rounded-lg z-0" />
            <div className="absolute bottom-0 right-4 w-[220px] h-[280px] border-2 border-dashed border-white rounded-lg z-0" />
            <img
              src="/public/images/tribe1.png"
              alt="Diverse Collage"
              className="absolute bottom-0 left-0 w-[160px] md:w-[180px] rounded-xl z-10 shadow-xl"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/public/images/tribe2.png"
              alt="Rainbow Group"
              className="absolute top-8 left-24 w-[200px] md:w-[220px] rounded-xl z-20 shadow-xl"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/public/images/tribe3.png"
              alt="Happy People"
              className="absolute top-0 right-0 w-[180px] md:w-[200px] rounded-xl z-30 shadow-xl"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* TRIBES CAROUSEL */}
      <section id="tribes" className="bg-[#FFEAE3] text-black py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 sm:mb-12 drop-shadow-lg">
            Find your tribe and get connected
          </h2>

          <div className="relative">
            <button
              onClick={() => scrollCarousel(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#F4A261] hover:bg-[#E76F51] text-white rounded-full p-3 shadow-md hidden sm:block"
              aria-label="Scroll left"
            >
              &#9664;
            </button>

            <div
              ref={trackRef}
              className="flex space-x-4 sm:space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 sm:px-8 pb-4 scrollbar-hide"
            >
              {tribes.map((tribe) => (
                <div
                  key={tribe.id}
                  className="snap-start shrink-0 w-64 bg-white text-black rounded-3xl shadow-xl overflow-hidden group relative transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={tribe.img}
                    alt={tribe.name}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="p-4">
                    <p className="text-xl font-semibold mb-2">{tribe.name}</p>
                    <button
                      className="w-full text-sm font-bold text-[#C25500] bg-yellow-300 rounded-full px-4 py-2 mt-2 hover:bg-orange-300 transition-all"
                      onClick={() => openModal(tribe.id)}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollCarousel(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#F4A261] hover:bg-[#E76F51] text-white rounded-full p-3 shadow-md hidden sm:block"
              aria-label="Scroll right"
            >
              &#9654;
            </button>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {activeTribe && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl w-full sm:w-11/12 max-w-xl p-6 sm:p-8 relative text-black shadow-2xl animate-fadeInUp">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-3xl font-bold text-[#C25500]"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="space-y-4">
              <h3 className="text-3xl font-extrabold text-[#BD570F]">{activeTribe.name}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{activeTribe.desc}</p>
              <p className="text-sm text-gray-600">
                Each tribe is represented by a symbolic tree on the Bean‑You virtual farm. Join your tribe and grow your
                identity through community, shared values, and purpose. Download the Bean‑You App to get started.
              </p>
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    redirectToApp();
                  }}
                  className="self-center sm:self-start text-center w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold text-sm sm:text-base px-6 py-2.5 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
                >
                  🚀 Get the App
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HOW TO GET CONNECTED – hover on desktop, tap on mobile */}
      <section className="bg-[#C25500] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-12">
            How to get connected <br />
            <span className="text-yellow-400">through Bean–You farms</span>
          </h2>

          {/* Mobile hint */}
          <p className="md:hidden text-xs text-yellow-200 mb-6">
            Tip: tap a card to reveal more details.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {CARDS.map((card, i) => (
              <div
                key={i}
                className="group relative bg-white text-black p-6 rounded-xl shadow-md overflow-hidden hover:bg-yellow-50 transition duration-300"
              >
                {/* Mobile tap target */}
                <button
                  type="button"
                  aria-expanded={!!openCard[i]}
                  onClick={() => toggleCard(i)}
                  className="text-left w-full focus:outline-none"
                >
                  <div className="text-xl font-bold mb-2 text-[#C25500]">
                    {card.title}
                  </div>
                  <p className="opacity-70">{card.lead}</p>
                </button>

                {/* Slide-up detail */}
                <div
                  className={[
                    "absolute left-0 bg-[#FFE7C4] text-black p-4 w-full rounded-b-xl transition-all duration-500 ease-in-out",
                    openCard[i] ? "bottom-0" : "bottom-[-100%]",
                    "md:group-hover:bottom-0",
                  ].join(" ")}
                >
                  <p className="text-sm">{card.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFEAE3] text-black py-20 px-6">
        <div className="max-w-6xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Frequently Asked <span className="italic text-red-600">Questions</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-yellow-100 border-l-4 border-[#BD570F] p-5 rounded-md shadow">
                <h3 className="font-bold text-lg mb-2">Why Bean–You exists</h3>
                <p className="text-sm">
                  Bean–You empowers people to connect with purpose-driven communities rooted in coffee farms. Through
                  tribes, tokens, and tech — we build bridges from the soil to the screen.
                </p>
              </div>

              {[
                {
                  q: "How is Bean–You connected to coffee?",
                  a: "Our roots begin in real coffee farms like Asili in Kenya. Bean–You symbolizes more than coffee—it represents people, purpose, and identity tied to sustainable agriculture and community growth.",
                },
                {
                  q: "What does ESG have to do with my tribe?",
                  a: "Every tribe promotes Environmental, Social, and Governance values. Your activities on the Bean–You app help support ESG-aligned actions—from tree planting to educational support to fair trade.",
                },
                {
                  q: "How do I join a tribe?",
                  a: "Download the app, choose a symbolic bean crop that reflects your values, and claim your digital plot. That’s your entry point into a tribe that resonates with who you are.",
                },
                {
                  q: "What are Bean–You tokens?",
                  a: "They are digital rewards earned through app actions, participation, and tribe contributions. You can redeem them for free courses, community games, collaborations, and exclusive rewards.",
                },
                {
                  q: "What is Asili Coffee’s role?",
                  a: "Asili Coffee is a real-life example of a farm community powering Bean–You. It’s a model tribe—farmers, youth, and global allies working together through the platform to grow and trade sustainably.",
                },
                {
                  q: "How is this different from just another app?",
                  a: "Bean–You isn’t just digital. It’s physical farms, real rewards, and live impact. The goal is to unite people globally around action, expression, and shared purpose rooted in agriculture and culture.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="bg-white rounded shadow p-4 group cursor-pointer hover:bg-yellow-50 transition">
                  <summary className="font-semibold flex justify-between items-center select-none">
                    <span>{q}</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-open:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-sm mt-2">{a}</p>
                </details>
              ))}
            </div>

            <div className="flex items-center justify-center">
              <img
                src="/pulic/images/coffee-cup.png"
                alt="Find Your Tree"
                className="w-2/3 md:w-1/2"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-500 py-24 text-white text-center overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center opacity-10 will-change-transform"
          style={{ backgroundImage: "url('/images/bg-beans.jpg')" }}
          data-parallax=""
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6" data-aos="fade-up">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
            Ready to root your story in coffee, community and connection?
          </h3>
          <p className="text-base sm:text-lg mb-10 opacity-90 leading-relaxed">
            Download the <strong>Bean‑You App</strong> to claim your digital farm plot, join your tribe, and earn tokens
            redeemable for free learning, games, and collaborations.
          </p>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              redirectToApp();
            }}
            className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold text-sm sm:text-base px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
          >
            🚀 Get the App
          </a>
        </div>
      </section>

      

      {/* Utilities */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
