"use client";

import Image from "next/image";
import Link from "next/link";

export default function ExplorePage() {
  const steps = [
    {
      n: "1",
      title: "Recognise Who You Are",
      text:
        "Download the Bean You® App and share your values by simple text, a 60‑sec voice note, or a 30‑sec selfie video. Our AI will do the rest.",
      img: "/images/explore1.jpg",
      ctas: [
        {
          label: "Download (Android)",
          href: "https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB",
        },
        {
          label: "Download (iOS)",
          href:
            "https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2",
        },
      ],
    },
    {
      n: "2",
      title: "Get Free, Values‑Aligned Connections",
      text:
        "Bean You® offers free connections to people who share your values — your tribe. Get solutions aligned to your values: online education, mobile gaming, and AI helpers.",
      img: "/images/gifts.png",
      ctas: [{ label: "Go to Connect", href: "/connect" }],
    },
    {
      n: "3",
      title: "Meet IRL in Our Cafés",
      text:
        "We’re rolling out 10,000 Bean You® coffee cafés worldwide. Enjoy a free cup on us, meet your tribe — and the more you show up together, the bigger the discounts.",
      img: "/images/cafe01.png",
      // point this to your gallery when ready
    },
    {
      n: "4",
      title: "Earn Points for Doing Good",
      text:
        "Bean You® Points reward good ESG behaviour — helping others, walking more, living healthy, and sustainability actions. Redeem for gifts, discounts, and diploma credits with aligned retailers.",
      img: "/images/gifts.png",
      
    },
    {
      n: "5",
      title: "Connect to the Farm Behind Your Coffee",
      text:
        "Adopt as little as one coffee crop, monitor its growth, talk to the farmer, tip them, and support a not‑for‑profit foundation — from as little as US$3.8 one‑off.",
      img: "/images/kahirofarm.webp",
      ctas: [
        {
          label: "Adopt on the 1m² Platform",
          href: "https://parcels.beanyou.com/",
        },
      ],
    },
  ];

  return (
    <main className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[60vh] grid place-items-center py-24">
        {/* Coffee gradient + soft clip */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a150e] via-[#793A17] to-[#F3B019] opacity-95" />
        <div className="absolute inset-0 [clip-path:polygon(0_0,100%_7%,100%_100%,0_93%)] bg-black/10" />
        {/* subtle texture overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow">
            Explore Bean You
          </h1>
          <p className="mt-4 text-orange-50/95 text-lg md:text-xl leading-relaxed">
            Our goal is to make your life better, and to make the planet better.
            Connect IRL and online — at our cafés and through our free App — to
            meet, collaborate, and create. Just five simple steps.
          </p>
          <a
            href="#steps"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 text-black font-semibold shadow-md hover:scale-[1.03] active:scale-95 transition"
          >
            Start Exploring
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* STEPS */}
      <section
        id="steps"
        className="relative py-20 bg-gradient-to-b from-[#120805] via-[#2a150e] to-[#5f2c14] text-white scroll-mt-28"
      >
        {/* soft glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-[#F3B019]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[#F97316]/20 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Desktop: 2-col alternating; Mobile: stacked with swipeable option */}
          <div className="space-y-10 md:space-y-14">
            {steps.map((s, i) => {
              const even = i % 2 === 1;
              return (
                <article
                  key={s.n}
                  className={`grid items-center gap-6 md:gap-10 ${
                    even ? "md:grid-cols-[1fr,1.1fr]" : "md:grid-cols-[1.1fr,1fr]"
                  }`}
                >
                  {/* IMAGE */}
                  <div
                    className={`relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 shadow-[0_18px_54px_rgba(0,0,0,.35)] min-h-[240px] md:min-h-[320px] ${
                      even ? "md:order-2" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5" />
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      className="object-cover"
                      priority={i < 2}
                    />
                    {/* Big number badge, anchored inside so it never clips */}
                    <div className="absolute top-4 left-4">
                      <StepBadge n={s.n} />
                    </div>
                  </div>

                  {/* TEXT */}
                  <div className={`${even ? "md:order-1" : ""}`}>
                    <h2 className="text-2xl md:text-3xl font-extrabold">{s.title}</h2>
                    <p className="mt-3 text-orange-50/95 leading-relaxed">{s.text}</p>
                    {s.ctas?.length ? (
                      <div className="mt-5 flex flex-wrap gap-3">
                        {s.ctas.map((c) => (
                          <Link
                            key={c.label}
                            href={c.href}
                            target={c.href.startsWith("http") ? "_blank" : "_self"}
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 text-black font-semibold shadow-md hover:scale-[1.03] active:scale-95 transition"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Mobile helper: horizontal quick-scan strip of numbers (optional) */}
          <div className="mt-10 md:mt-14 flex md:hidden items-center justify-center gap-2">
            {steps.map((s, i) => (
              <span
                key={s.n}
                className="h-2.5 w-2.5 rounded-full bg-white/30"
                aria-hidden
              />
            ))}
          </div>
        </div>
      </section>

      

      {/* FINAL CTA */}
      <section className="relative py-16 bg-gradient-to-tr from-[#2a150e] via-[#793A17] to-[#F3B019] text-white">
        <div className="absolute inset-0 [clip-path:polygon(0_0,100%_12%,100%_100%,0_88%)] bg-black/10" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold drop-shadow">
            Join the Movement
          </h3>
          <p className="mt-3 text-orange-50/95">
            Connect to your tribe, support farmers, and earn rewards for doing good.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB"
              target="_blank"
              className="px-5 py-3 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 text-black font-semibold shadow-md hover:scale-[1.03] active:scale-95 transition"
            >
              Get the App (Android)
            </Link>
            <Link
              href="https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2"
              target="_blank"
              className="px-5 py-3 rounded-full bg-white/10 text-yellow-200 border border-white/20 hover:bg-white/15 transition"
            >
              Get the App (iOS)
            </Link>
            <Link
              href="/connect"
              className="px-5 py-3 rounded-full bg-white/10 text-yellow-200 border border-white/20 hover:bg-white/15 transition"
            >
              Explore Connect
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/** Big gradient badge for step numbers */
function StepBadge({ n }: { n: string }) {
  return (
    <div className="relative inline-block select-none">
      <div className="px-4 py-1.5 md:px-5 md:py-2 rounded-full text-3xl md:text-5xl font-extrabold text-white ring-2 ring-white/20 shadow-[0_10px_30px_rgba(0,0,0,.45)] bg-gradient-to-r from-yellow-300 via-orange-400 to-[#BD570F] leading-none">
        {n}
      </div>
      <div className="absolute -inset-1 rounded-full blur-sm bg-[conic-gradient(at_50%_50%,#ffffff33,transparent_30%)] opacity-60 pointer-events-none" />
    </div>
  );
}
