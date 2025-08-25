"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/* ------------------------------
   Store URLs
------------------------------ */
const IOS_URL = "https://apps.apple.com/app/id6742394096";
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.beanu";

/* ------------------------------
   Types
------------------------------ */
type SmartGetAppButtonProps = {
  label?: string;
  className?: string;
  genericQrSrc?: string; // optional fallback QR
};

/* ------------------------------
   Platform detection (SSR-safe)
------------------------------ */
function isIPadOS13Plus(ua: string): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  return /Macintosh/i.test(ua) && ("ontouchend" in document);
}

function detectPlatform():
  | "android"
  | "ios"
  | "ipad"
  | "iphone"
  | "desktop"
  | "unknown" {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent || (navigator as any).vendor || (window as any).opera || "";

  if (/android/i.test(ua)) return "android";
  if (isIPadOS13Plus(ua)) return "ipad";
  if (/iPad/i.test(ua)) return "ipad";
  if (/iPhone|iPod/i.test(ua)) return "iphone";
  if (/iOS/i.test(ua)) return "ios";
  if (/Windows|Macintosh|Linux|X11/i.test(ua)) return "desktop";
  return "unknown";
}

/* ------------------------------
   3D Gradient Button
------------------------------ */
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

/* ------------------------------
   Minimal, robust scroll lock (ref-counted)
------------------------------ */
const scrollLock = (() => {
  let count = 0;
  let savedY = 0;
  const prev = { position: "", top: "", width: "", overflow: "" };

  function lock() {
    if (typeof window === "undefined") return;
    if (count++ > 0) return;

    const body = document.body;
    savedY = window.scrollY || window.pageYOffset || 0;

    prev.position = body.style.position;
    prev.top = body.style.top;
    prev.width = body.style.width;
    prev.overflow = body.style.overflow;

    body.style.position = "fixed";
    body.style.top = `-${savedY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
  }

  function unlock() {
    if (typeof window === "undefined") return;
    if (--count > 0) return;

    const body = document.body;
    body.style.position = prev.position;
    body.style.top = prev.top;
    body.style.width = prev.width;
    body.style.overflow = prev.overflow;

    window.scrollTo(0, savedY);
  }

  return { lock, unlock };
})();

/* ------------------------------
   QR Modal (portal, centered, scrollable)
------------------------------ */
function QrModal({
  open,
  onClose,
  qrSrc = "/images/bean-you-qr.png",
}: {
  open: boolean;
  onClose: () => void;
  qrSrc?: string;
}) {
  // Hooks must be unconditioned:
  const dialogRef = useRef<HTMLDivElement>(null);
  const [qrType, setQrType] = useState<"ios" | "android">("ios");
  const [mounted, setMounted] = useState(false);

  // Mark mounted so we can safely access document/portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock page scroll only while open and mounted
  useEffect(() => {
    if (!mounted || !open) return;
    scrollLock.lock();
    return () => scrollLock.unlock();
  }, [mounted, open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus close button after mount
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLButtonElement>("button[data-close]")?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!mounted || !open) return null;

  const currentQr =
    qrType === "ios" ? "/images/bean-you-ios-qr.png" : "/images/bean-you-android-qr.png";

  const modal = (
    <div aria-hidden={!open} className="fixed inset-0 z-[999]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Scrollable wrapper keeps dialog centered but scrollable if tall */}
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Get the Bean You app"
            className="w-[min(92vw,28rem)] max-h-[90vh] overflow-hidden rounded-2xl bg-[#3C2100] text-white shadow-2xl ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-4 sm:p-5">
              <h3 className="text-lg font-bold">
                Get the app ({qrType === "ios" ? "App Store" : "Google Play"})
              </h3>
              <button
                data-close
                onClick={onClose}
                className="rounded-full p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-label="Close dialog"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10l-4.95-4.95L5.05 3.636z"
                  />
                </svg>
              </button>
            </div>

            {/* Body (scrolls within) */}
            <div className="px-4 sm:px-5 pb-1 overflow-y-auto max-h-[calc(90vh-4rem)]">
              <p className="text-sm text-amber-100/90">
                Scan this QR with your phone camera to install the Bean You app. You can also
                download/share the QR or switch between stores.
              </p>

              <div className="p-4 sm:p-5">
                {/* QR */}
                <div className="mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-xl bg-white p-3 shadow-inner flex items-center justify-center">
                  <Image
                    src={currentQr}
                    alt={qrType === "ios" ? "App Store QR" : "Google Play QR"}
                    width={512}
                    height={512}
                    className="object-contain rounded-md"
                    priority
                  />
                </div>

                {/* Toggle store QR */}
                <div className="mt-4 flex gap-3 justify-center flex-wrap">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setQrType("ios"); }}
                    className={`relative inline-flex items-center justify-center rounded-full px-5 py-2.5 font-semibold text-black select-none bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_8px_20px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-transform duration-150 ease-out hover:scale-[1.02] active:translate-y-[2px] active:shadow-[0_4px_12px_rgba(0,0,0,0.28)] ${qrType === "ios" ? "" : "opacity-90"}`}
                  >
                    App Store QR
                  </a>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setQrType("android"); }}
                    className={`relative inline-flex items-center justify-center rounded-full px-5 py-2.5 font-semibold text-black select-none bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_8px_20px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-transform duration-150 ease-out hover:scale-[1.02] active:translate-y-[2px] active:shadow-[0_4px_12px_rgba(0,0,0,0.28)] ${qrType === "android" ? "" : "opacity-90"}`}
                  >
                    Play Store QR
                  </a>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-col items-center gap-3">
                  <a
                    href={currentQr}
                    download
                    className="w-full sm:w-2/3 text-center relative inline-flex items-center justify-center rounded-full px-5 py-2.5 font-semibold text-black select-none bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_8px_20px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-transform duration-150 ease-out hover:scale-[1.02] active:translate-y-[2px] active:shadow-[0_4px_12px_rgba(0,0,0,0.28)]"
                  >
                    Download QR
                  </a>
                  <a
                    href="#"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        const url = window.location.href;
                        if (typeof (navigator as any).share === "function") {
                          await (navigator as any).share({
                            title: "Bean You — Get the app",
                            text: "Scan this QR to install the Bean You app.",
                            url,
                          });
                        } else {
                          await navigator.clipboard.writeText(url);
                          alert("Link copied to clipboard!");
                        }
                      } catch { /* no-op */ }
                    }}
                    className="w-full sm:w-2/3 text-center relative inline-flex items-center justify-center rounded-full px-5 py-2.5 font-semibold text-black select-none bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_8px_20px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-transform duration-150 ease-out hover:scale-[1.02] active:translate-y-[2px] active:shadow-[0_4px_12px_rgba(0,0,0,0.28)]"
                  >
                    Share / Copy Link
                  </a>
                </div>

                {/* Store badges */}
                <div className="mt-6 flex justify-center gap-4 flex-wrap">
                  <a
                    href={IOS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  >
                    <Image
                      src="/images/app-store-badge.svg"
                      alt="Download on the App Store"
                      width={160}
                      height={48}
                      className="h-10 w-auto object-contain"
                    />
                  </a>
                  <a
                    href={ANDROID_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  >
                    <Image
                      src="/images/google-play-badge.png"
                      alt="Get it on Google Play"
                      width={180}
                      height={54}
                      className="h-10 w-auto object-contain"
                    />
                  </a>
                </div>

                <div className="mt-3 text-xs text-amber-200/80 text-center">
                  Tip: Save the QR to your photos and share it with friends.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-white/10">
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-white/10 hover:bg-white/15 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

/* ------------------------------
   Public Button
------------------------------ */
export default function SmartGetAppButton({
  label = "Get the App",
  className,
  genericQrSrc,
}: SmartGetAppButtonProps) {
  const [qrOpen, setQrOpen] = useState(false);

  const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const platform = detectPlatform();

    if (platform === "android") {
      window.location.href = ANDROID_URL;
      return;
    }
    if (platform === "iphone" || platform === "ipad" || platform === "ios") {
      window.location.href = IOS_URL;
      return;
    }
    // Desktop/unknown → QR modal
    setQrOpen(true);
  }, []);

  return (
    <>
      <Press3DButton href="#" onClick={onClick} className={className}>
        {label}
      </Press3DButton>

      {/* Renders only when open; locks scroll safely */}
      {qrOpen && (
        <QrModal open={qrOpen} onClose={() => setQrOpen(false)} qrSrc={genericQrSrc} />
      )}
    </>
  );
}
