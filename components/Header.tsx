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

        <div className="hidden md:flex space-x-8 text-sm font-semibold">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx("hover:underline", pathname === item.href && "underline")}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white focus:outline-none"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {!open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          )}
        </button>
      </nav>

      {/* mobile drawer */}
      {open && (
        <div className="md:hidden bg-orange-600 text-white text-center px-6 py-6 space-y-4 shadow-md">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="block hover:underline">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
