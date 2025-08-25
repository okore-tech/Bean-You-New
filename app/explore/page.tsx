"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SmartGetAppButton from "components/SmartGetAppButton"; // <-- add this import

/* ─────────────────────────────────────────────
   Tiny helpers (no deps)
────────────────────────────────────────────── */
function isProbablyMobile(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || (navigator as any).vendor || (window as any).opera;
  const byUA = /android|iphone|ipad|ipod|iemobile|blackberry|bb10|mini|mobile|mobi/i.test(ua);
  const byUAData = (navigator as any).userAgentData?.mobile === true;
  const byHeuristics =
    ("ontouchstart" in window || (navigator as any).maxTouchPoints > 1) &&
    window.matchMedia?.("(pointer: coarse)")?.matches &&
    window.innerWidth <= 1024;
  return Boolean(byUA || byUAData || byHeuristics);
}

function redirectToStore(): boolean {
  if (typeof window === "undefined") return false;
  const IOS = "https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2";
  const ANDROID = "https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB";
  const ua = navigator.userAgent || (navigator as any).vendor || (window as any).opera;

  if (/android/i.test(ua)) { window.location.href = ANDROID; return true; }
  if (/iPad|iPhone|iPod/i.test(ua) && !(window as any).MSStream) { window.location.href = IOS; return true; }
  if (isProbablyMobile()) {
    window.location.href = /Macintosh|iPhone|iPad|iPod/i.test(ua) ? IOS : ANDROID;
    return true;
  }
  return false;
}

/* ─────────────────────────────────────────────
   3D Button
────────────────────────────────────────────── */
function Press3DButton(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }
) {
  const { className = "", children, ...rest } = props;
  return (
    <a
      {...rest}
      className={[
        "relative inline-flex items-center justify-center rounded-full px-5 py-2.5",
        "font-semibold text-black select-none",
        "bg-gradient-to-r from-yellow-300 to-orange-400",
        "shadow-[0_10px_24px_rgba(0,0,0,0.28)] ring-1 ring-black/5",
        "transition-transform duration-150 ease-out hover:scale-[1.03]",
        "active:translate-y-[2px] active:shadow-[0_6px_16px_rgba(0,0,0,0.32)]",
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}

/* ─────────────────────────────────────────────
   Desktop QR Modal
────────────────────────────────────────────── */
function QrModal({
  open,
  onClose,
  qrSrc = "/images/bean-you-qr.png",
}: {
  open: boolean;
  onClose: () => void;
  qrSrc?: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLButtonElement>("[data-close]")?.focus();
    }, 0);
    return () => { window.removeEventListener("keydown", onKey); window.clearTimeout(id); };
  }, [open, onClose]);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof (navigator as any).share === "function") {
        await (navigator as any).share({ title: "Bean You — Get the app", text: "Scan this QR to install the Bean You app.", url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch {}
  };

  if (!open) return null;

  const IOS_URL = "https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2";
  const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB";

  return (
    <div aria-hidden={!open} className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Get the Bean You app"
        className="relative z-10 w-full max-w-md rounded-2xl bg-[#3C2100] text-white shadow-2xl ring-1 ring-white/10"
      >
        <div className="flex items-start justify-between p-4 sm:p-5">
          <h3 className="text-lg font-bold">Get the app</h3>
          <button
            data-close
            onClick={onClose}
            className="rounded-full p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10l-4.95-4.95L5.05 3.636z" />
            </svg>
          </button>
        </div>

        <div className="px-4 sm:px-6 text-center">
          <p className="text-sm text-amber-100/90">Scan this QR with your phone camera to install the Bean You app. You can also download, share, or use the badges below.</p>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-xl bg-white p-3 shadow-inner flex items-center justify-center">
            <Image src={qrSrc} alt="Bean You app QR code" width={512} height={512} className="object-contain rounded-md" priority />
          </div>

          <div className="mt-5 flex flex-col items-center gap-3">
            <Press3DButton href={qrSrc} download className="w-full sm:w-auto">Download QR</Press3DButton>
            <Press3DButton href="#" onClick={(e) => { e.preventDefault(); handleShare(); }} className="w-full sm:w-auto">
              Share / Copy Link
            </Press3DButton>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 max-w-xs mx-auto">
            <a href={IOS_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-300" aria-label="Open in the Apple App Store">
              <Image src="/images/app-store-badge.png" alt="Download on the App Store" width={160} height={48} className="h-10 w-auto object-contain" />
            </a>
            <a href={ANDROID_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-300" aria-label="Get it on Google Play">
              <Image src="/images/google-play-badge.png" alt="Get it on Google Play" width={180} height={54} className="h-10 w-auto object-contain" />
            </a>
          </div>

          <p className="mt-3 text-center text-xs text-amber-200/80">Tip: Save the QR and share it with friends.</p>
        </div>

        <div className="p-4 sm:p-6">
          <button onClick={onClose} className="w-full rounded-xl bg-white/10 hover:bg-white/15 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-300">Close</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Café Showcase (Step 3 only)
────────────────────────────────────────────── */
type CafePhoto = { src: string; alt?: string };

const CAFE_PHOTOS: CafePhoto[] = [
  { src: "/images/cafe5.jpg", alt: "Bean You® café — warm interior" },
  { src: "/images/cafe4.jpg", alt: "Bean You® café — community table" },
  { src: "/images/cafe8.jpg", alt: "Bean You® café — counter & brew bar" },
  { src: "/images/cafe7.jpg", alt: "Bean You® café — facade" },
  { src: "/images/cafe1.png", alt: "Bean You® café — outdoor seating" },
  { src: "/images/cafe3.png", alt: "Bean You® café — evening ambience" },
  { src: "/images/cafe9.png", alt: "Bean You® café — style" },
];

function CafeCollage() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: number) => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: dir * Math.min(node.clientWidth * 0.9, 480), behavior: "smooth" });
  };

  return (
    <div className="mt-0">
      {/* Mobile: swipeable slider */}
      <div className="md:hidden relative">
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1"
          style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
        >
          {CAFE_PHOTOS.map((p, i) => (
            <article
              key={i}
              className="snap-center shrink-0 w-[86%] rounded-2xl overflow-hidden border border-white/15 bg-white/5 shadow-[0_14px_44px_rgba(0,0,0,.35)]"
            >
              <div className="relative h-56">
                <Image src={p.src} alt={p.alt ?? "Bean You® café"} fill className="object-cover" />
              </div>
            </article>
          ))}
        </div>

        {/* gradient edges + arrows */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#000]/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#000]/40 to-transparent" />
        <div className="absolute inset-y-0 left-1 flex items-center">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous café"
            className="pointer-events-auto rounded-full bg-white/15 hover:bg-white/25 p-2 backdrop-blur border border-white/20"
          >
            ‹
          </button>
        </div>
        <div className="absolute inset-y-0 right-1 flex items-center">
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next café"
            className="pointer-events-auto rounded-full bg白e/15 hover:bg-white/25 p-2 backdrop-blur border border-white/20"
          >
            ›
          </button>
        </div>
      </div>

      {/* Desktop: mosaic grid */}
      <div className="hidden md:grid grid-cols-12 gap-3">
        <div className="col-span-7 row-span-2">
          <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 bg-white/5 shadow-[0_18px_54px_rgba(0,0,0,.35)] aspect-[4/3]">
            <Image src={CAFE_PHOTOS[0].src} alt={CAFE_PHOTOS[0].alt ?? "Bean You® café"} fill className="object-cover" />
          </div>
        </div>
        <div className="col-span-5 row-span-2">
          <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 bg-white/5 shadow-[0_18px_54px_rgba(0,0,0,.35)] aspect-[3/4]">
            <Image src={CAFE_PHOTOS[3].src} alt={CAFE_PHOTOS[3].alt ?? "Bean You® café"} fill className="object-cover" />
          </div>
        </div>
        {[1, 2, 4].map((idx) => (
          <div key={idx} className="col-span-4">
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-white/5 shadow-[0_12px_36px_rgba(0,0,0,.32)] aspect-[16/10]">
              <Image src={CAFE_PHOTOS[idx].src} alt={CAFE_PHOTOS[idx].alt ?? "Bean You® café"} fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>

      {/* Underline message */}
      <p className="mt-4 text-center text-orange-50/95 text-sm md:text-base">
        Stores are to be opened in many major cities and towns around the world.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared Step Container
────────────────────────────────────────────── */
type StepCTA = { label: string; href?: string; onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void };
type Step = { id: string; n: string; title: string; text: string; img?: string; ctas?: StepCTA[] };

function StepSection({
  step,
  index,
  sectionRef,
  childrenMedia, // for Step 3
}: {
  step: Step;
  index: number;
  sectionRef?: (el: HTMLElement | null) => void;
  childrenMedia?: React.ReactNode;
}) {
  return (
    <section id={step.id} ref={sectionRef} data-idx={index} className="scroll-mt-28">
      <div className="rounded-3xl border border-white/15 bg-white/5 shadow-[0_18px_54px_rgba(0,0,0,.35)] p-5 md:p-7">
        {/* Header/Text */}
        <div data-reveal className="reveal">
          <div className="inline-flex items-center gap-2">
            <StepBadge n={step.n} />
            <span className="text-amber-200/90 font-semibold">Step {step.n}</span>
          </div>
          <h2 className="mt-3 text-2xl md:text-3xl font-extrabold">{step.title}</h2>
          <p className="mt-3 text-orange-50/95 leading-relaxed">{step.text}</p>
        </div>

        {/* Media */}
        <div className="mt-6">
          {childrenMedia ? (
            <div data-reveal className="reveal">
              {childrenMedia}
            </div>
          ) : step.img ? (
            <div
              data-reveal
              className="reveal relative w-full aspect-[16/10] md:aspect-[21/9] max-h-[520px] rounded-2xl overflow-hidden border border-white/15 bg-white/5"
            >
              <Image
                src={step.img}
                alt={step.title}
                fill
                className="object-cover"
                priority={index < 2}
              />
            </div>
          ) : null}
        </div>

        {/* CTAs (none for step 3) */}
        {!!(step.ctas?.length && step.id !== "step-3") && (
          <div data-reveal className="reveal mt-5 flex flex-wrap gap-3">
            {step.ctas!.map((c, i) =>
              /get the app/i.test(c.label) ? (
                <SmartGetAppButton key={`get-app-${i}`} /> // <-- use shared component
              ) : c.onClick ? (
                <Press3DButton key={c.label} href="#" onClick={c.onClick}>
                  {c.label}
                </Press3DButton>
              ) : (
                <Link key={c.label} href={c.href!} className="inline-block">
                  <Press3DButton>{c.label}</Press3DButton>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Page
────────────────────────────────────────────── */
export default function ExplorePage() {
  const [qrOpen, setQrOpen] = useState(false);
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Smart get-app: mobile → store, desktop → QR
  const onGetApp = useCallback((e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault?.();
    if (redirectToStore()) return;
    setQrOpen(true);
  }, []);

  const steps = useMemo<Step[]>(
    () => [
      {
        id: "step-1",
        n: "1",
        title: "Recognise Who You Are",
        text: "Share your values by simple text, a 60-sec voice note, or a 30-sec selfie video. Our AI does the rest.",
        img: "/images/explore1.jpg",
        ctas: [{ label: "Get the app", onClick: onGetApp }],
      },
      {
        id: "step-2",
        n: "2",
        title: "Find Your Tribe",
        text: "We connect you to people and opportunities aligned to your values — education, gaming, and AI helpers.",
        img: "/images/connect.jpg",
        ctas: [{ label: "Connect", href: "/connect" }],
      },
      {
        id: "step-3",
        n: "3",
        title: "Meet In Real Life (IRL) in Our Cafés",
        text: "We’re rolling out 10,000 cafés worldwide. Enjoy a free cup, meet your tribe, and grow together.",
        // media via <CafeCollage/>, no CTAs here
      },
      {
        id: "step-4",
        n: "4",
        title: "Earn Points for Doing Good",
        text: "Get rewarded for positive actions — helping others, moving more, living healthy, and sustainability.",
        img: "/images/gifts.png",
        ctas: [{ label: "Get the app", onClick: onGetApp }],
      },
      {
        id: "step-5",
        n: "5",
        title: "Support the Farm Behind Your Coffee",
        text: "Adopt a coffee crop from as little as US$3.8 one-off, chat with the farmer, and follow the journey.",
        img: "/images/kahirofarm.webp",
        ctas: [{ label: "Adopt on the 1m² Platform", href: "https://parcels.beanyou.com/" }],
      },
    ],
    [onGetApp]
  );

  // Observe active section (for top path & mobile mini-map)
  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const onScreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (onScreen[0]) {
          const idx = Number(onScreen[0].target.getAttribute("data-idx"));
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);

  // Reveal on view (targets [data-reveal])
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const jumpTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative overflow-hidden">
      {/* Sticky background with texture */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-[#2a150e] via-[#793A17] to-[#F3B019]" />
      <div aria-hidden className="fixed inset-0 -z-[9] [clip-path:polygon(0_0,100%_8%,100%_100%,0_92%)] bg-black/10" />
      <div
        aria-hidden
        className="fixed inset-0 -z-[8] opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.35) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* HERO */}
      <section className="relative min-h-[62vh] grid place-items-center py-20 md:py-24 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Top path mini-nav */}
          <nav aria-label="Path" className="mx-auto mb-6 flex items-center justify-center gap-2 md:gap-3">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => jumpTo(i)}
                className={[
                  "group relative grid place-items-center w-9 h-9 md:w-10 md:h-10 rounded-full ring-1 transition",
                  i === active
                    ? "bg-gradient-to-r from-yellow-300 to-orange-400 text-black ring-black/10 scale-105"
                    : "bg-white/10 text-white ring-white/10 hover:bg-white/15",
                ].join(" ")}
                aria-label={`Jump to ${s.title}`}
              >
                <span className="text-[13px] md:text-sm font-bold">{s.n}</span>
                <span
                  className={[
                    "pointer-events-none absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2",
                    "px-2 py-1 rounded-lg bg-black/70 text-white text-xs whitespace-nowrap",
                    "opacity-0 translate-y-[-4px] group-hover:opacity-100 group-hover:translate-y-0",
                    "transition",
                  ].join(" ")}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </nav>

          <p className="uppercase tracking-[0.2em] text-amber-200/90 text-sm md:text-base">
            A journey in five sips
          </p>

          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold drop-shadow">
            Explore Bean{" "}
            <span className="relative inline-flex">
              You
              <sup className="ml-0.5 text-xs align-top animate-r-pop">®</sup>
            </span>
          </h1>

          <p className="mt-4 text-orange-50/95 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
            Find your tribe, do good, and share a coffee — online and in our cafés.
          </p>

          <div className="mt-8 flex justify-center">
            <Press3DButton href="#path">Start Exploring</Press3DButton>
          </div>
        </div>
      </section>

      {/* PATH / STEPS */}
      <section id="path" className="relative text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10 md:space-y-14">
          {steps.map((s, i) => (
            <StepSection
              key={s.id}
              step={s}
              index={i}
              sectionRef={(el) => { sectionRefs.current[i] = el; }}
              {...(s.id === "step-3" ? { childrenMedia: <CafeCollage /> } : {})}
            />
          ))}
        </div>
      </section>

      {/* MOBILE MINI-MAP (floating) */}
      <nav
        aria-label="Path (mobile)"
        className="md:hidden fixed bottom-3 inset-x-0 z-[95] flex items-center justify-center"
      >
        <div className="mx-3 px-2 py-1.5 rounded-full bg-black/40 backdrop-blur supports-[backdrop-filter]:backdrop-blur-lg border border-white/10 shadow-lg">
          <ul className="flex items-center gap-1.5">
            {steps.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => jumpTo(i)}
                  className={[
                    "grid place-items-center w-7 h-7 rounded-full ring-1 transition",
                    i === active
                      ? "bg-gradient-to-r from-yellow-300 to-orange-400 text-black ring-black/10 scale-105"
                      : "bg-white/10 text-white ring-white/10 active:bg-white/20",
                  ].join(" ")}
                  aria-label={`Jump to ${s.title}`}
                >
                  <span className="text-[12px] font-bold">{s.n}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* OUTRO */}
      <section className="relative py-20 md:py-28 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:4xl font-extrabold drop-shadow">Join the Movement</h3>
          <p className="mt-3 text-orange-50/95">Connect to your tribe, support farmers, and earn rewards for doing good.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/connect" className="inline-block">
              <Press3DButton>Explore Connect</Press3DButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Desktop QR modal for get-app */}
      {!isProbablyMobile() && <QrModal open={qrOpen} onClose={() => setQrOpen(false)} />}

      {/* Local styles */}
      <style>{`
        html { scroll-behavior: smooth; }

        .reveal { opacity: 0; transform: translateY(14px) scale(0.99); transition: opacity .6s ease, transform .6s ease; }
        .reveal.is-visible { opacity: 1; transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) {
          .reveal, .reveal.is-visible { opacity: 1 !important; transform: none !important; transition: none !important; }
        }

        @keyframes r-pop {
          0%   { transform: translateY(-2px) scale(0.6); opacity: 0; }
          60%  { transform: translateY(0) scale(1.15); opacity: 1; }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-r-pop { animation: r-pop 600ms cubic-bezier(.2,.8,.2,1) 300ms both; }
      `}</style>
    </main>
  );
}

/* Step badge */
function StepBadge({ n }: { n: string }) {
  return (
    <span className="inline-grid place-items-center w-9 h-9 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-[#BD570F] text-white font-extrabold shadow ring-1 ring-white/30">
      {n}
    </span>
  );
}
