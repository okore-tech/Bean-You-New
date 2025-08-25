"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const nav = [
  { href: "/face-of-bean-you", label: "Face of Bean You" },
  { href: "/explore", label: "Explore" },
  { href: "/connect", label: "Connect" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/about", label: "About Us" },
  { href: "/social", label: "Social Media" },
];

const ESG_URL = "https://parcels.beanyou.com/";

function ESGInvestButton({ className = "" }: { className?: string }) {
  const hoverCopy = "  Own 1m² Crops"; // note leading spaces per your request
  return (
    <Link
      href={ESG_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open ESG Invest (opens in a new tab)"
      className={clsx(
        "group press3d relative inline-flex items-center rounded-full p-[2px]",
        "bg-gradient-to-r from-amber-300 via-orange-400 to-[#BD570F]",
        "transition-[filter,transform] duration-200 ease-out hover:brightness-105 focus-visible:brightness-105",
        className
      )}
    >
      <span
        className={clsx(
          "btn-face relative inline-flex items-center gap-2 rounded-full bg-white",
          "px-4 py-2 font-semibold text-[#0F5132] shadow",
          "transition-all duration-200 ease-out group-hover:text-[#0B3D2A] group-focus-visible:text-[#0B3D2A]"
        )}
      >
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3c4.97 0 9 3.134 9 7 0 3.866-4.03 7-9 7s-9-3.134-9-7c0-.523.07-1.03.2-1.52l2.07.64C6.09 9.39 6 9.69 6 10c0 2.761 3.134 5 7 5s7-2.239 7-5-3.134-5-7-5c-2.244 0-4.244.81-5.434 2.06l-1.47-1.35C7.64 3.82 9.69 3 12 3Zm0 7c.552 0 1 .448 1 1v7h-2v-7c0-.552.448-1 1-1Z" />
        </svg>
        <span className="label grid whitespace-nowrap">
          <span className="label-default col-start-1 row-start-1">ESG Invest</span>
          <span className="label-hover col-start-1 row-start-1">{hoverCopy}</span>
        </span>
        <span className="ml-1 inline-flex h-1.5 w-1.5 rounded-full bg-[#BD570F]/70 shadow-inner animate-pulse-soft" />
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector("header");
      if (!header) return;
      if (window.scrollY > 10) header.classList.add("scrolled-header");
      else header.classList.remove("scrolled-header");
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="bg-orange-500 text-white fixed top-0 left-0 w-full z-50 transition-colors">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center space-x-2" aria-label="Bean You Home">
          <Image src="/images/logo.png" alt="Bean You logo" width={120} height={40} className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative inline-flex items-center",
                "hover:underline underline-offset-4",
                pathname === item.href && "underline"
              )}
            >
              {item.label}
            </Link>
          ))}
          <ESGInvestButton />
        </div>

        {/* Burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white focus:outline-none rounded-lg p-1.5 hover:bg-white/10"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {!open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* backdrop tap closes */}
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
          />
          {/* panel */}
          <div
            role="dialog"
            aria-modal="true"
            className={clsx(
              "relative mx-3 mt-2 rounded-2xl border border-white/10",
              "bg-gradient-to-br from-white/15 to-white/5 text-white",
              "ring-1 ring-white/20 backdrop-blur-2xl shadow-2xl",
              "p-5 space-y-3 animate-in slide-in-from-top-2 duration-200"
            )}
          >
            {/* top row with manual close */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-wide">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl bg-white/10 px-2.5 py-1.5 text-xs font-medium hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            <ESGInvestButton className="w-full justify-center" />

            <div className="grid grid-cols-1 divide-y divide-white/10">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => { /* close on tap */ setOpen(false); }}
                  className={clsx(
                    "block px-2 py-3 text-base font-medium rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                    "hover:bg-white/10 active:bg-white/15"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="pt-1 text-center text-xs text-white/80">Bean You® — find your tribe</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        header.scrolled-header {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
          backdrop-filter: saturate(1.05) blur(6px);
        }

        /* pulsing dot */
        @keyframes pulseSoft {
          0% { transform: scale(1); opacity: .65; }
          50% { transform: scale(1.25); opacity: .9; }
          100% { transform: scale(1); opacity: .65; }
        }
        .animate-pulse-soft { animation: pulseSoft 1.8s ease-in-out infinite; }

        /* 3D press illusion */
        .press3d { position: relative; }
        .press3d::before {
          content: "";
          position: absolute; inset: 0;
          border-radius: 9999px;
          transform: translateY(3px);
          background: linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.08));
          filter: blur(.5px);
          z-index: -1;
          transition: transform .15s ease-out, opacity .15s ease-out;
        }
        .group:active.press3d::before { transform: translateY(1px); opacity: .9; }

        /* inner face + press */
        .btn-face { position: relative; overflow: hidden; box-shadow:
          0 8px 18px rgba(0,0,0,.18),
          inset 0 1px 0 rgba(255,255,255,.8);
          transform: translateY(0);
        }
        .group:active .btn-face {
          transform: translateY(2px);
          box-shadow:
            0 4px 10px rgba(0,0,0,.18),
            inset 0 1px 0 rgba(255,255,255,.7);
        }

        /* color sweep on hover/focus */
        .btn-face::after {
          content: "";
          position: absolute; inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            rgba(253, 230, 138, 0.45) 0%,
            rgba(251, 146, 60, 0.45) 50%,
            rgba(189, 87, 15, 0.45) 100%
          );
          transition: transform .45s cubic-bezier(.2,.8,.2,1);
          pointer-events: none;
        }
        .group:hover .btn-face::after,
        .group:focus-visible .btn-face::after {
          transform: translateX(0);
        }

        /* label swap */
        .label { position: relative; }
        .label-default, .label-hover {
          transition: opacity .25s ease, transform .25s ease;
          will-change: opacity, transform;
        }
        .label-default { opacity: 1; transform: translateY(0); }
        .label-hover { opacity: 0; transform: translateY(6px); }
        .group:hover .label-default,
        .group:focus-visible .label-default { opacity: 0; transform: translateY(-6px); }
        .group:hover .label-hover,
        .group:focus-visible .label-hover { opacity: 1; transform: translateY(0); }

        /* drawer motion */
        @keyframes slideInTop2 { from { transform: translateY(-8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-in { animation-duration: .2s; animation-fill-mode: both; }
        .slide-in-from-top-2 { animation-name: slideInTop2; }
      `}</style>
    </header>
  );
}
