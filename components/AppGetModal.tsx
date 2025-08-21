'use client';

import * as React from 'react';
import Image from 'next/image';

type StoreLinks = {
  ios?: string;
  android?: string;
};

export type AppGetModalProps = {
  /** Controls visibility (desktop only: render conditionally with !isProbablyMobile()) */
  open: boolean;
  onClose: () => void;

  /** QR image path in /public (default: /images/bean-you-qr.png) */
  qrSrc?: string;

  /** Copy + title overrides */
  title?: string;
  copy?: string;

  /** Show App Store / Google Play badges (desktop modal) */
  showStoreBadges?: boolean;

  /** Override store URLs */
  storeLinks?: StoreLinks;
};

/* ----------------------------
   Robust device detection + store redirect
   ---------------------------- */
export function isProbablyMobile(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || (navigator as any).vendor || (window as any).opera;

  const byUA = /android|iphone|ipad|ipod|iemobile|blackberry|bb10|mini|mobile|mobi/i.test(ua);
  const byUAData = (navigator as any).userAgentData?.mobile === true;
  const byHeuristics =
    ('ontouchstart' in window || (navigator as any).maxTouchPoints > 1) &&
    window.matchMedia?.('(pointer: coarse)').matches &&
    window.innerWidth <= 1024;

  return Boolean(byUA || byUAData || byHeuristics);
}

export function redirectToStore(links?: StoreLinks): boolean {
  if (typeof window === 'undefined') return false;
  const ios = links?.ios ?? 'https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2';
  const android = links?.android ?? 'https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB';

  const ua = navigator.userAgent || (navigator as any).vendor || (window as any).opera;

  if (/android/i.test(ua)) {
    window.location.href = android;
    return true;
  }
  if (/iPad|iPhone|iPod/i.test(ua) && !(window as any).MSStream) {
    window.location.href = ios;
    return true;
  }
  if (isProbablyMobile()) {
    const isApple = /Macintosh|iPhone|iPad|iPod/i.test(ua);
    window.location.href = isApple ? ios : android;
    return true;
  }
  return false;
}

/* ----------------------------
   Hook: smart CTA — mobile = redirect, desktop = open modal
   ---------------------------- */
export function useSmartGetApp(setOpen: (v: boolean) => void, links?: StoreLinks) {
  return React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      e.preventDefault();
      if (redirectToStore(links)) return;
      setOpen(true);
    },
    [setOpen, links]
  );
}

/* ----------------------------
   3D pressable gradient button (reusable)
   ---------------------------- */
export function Press3DButton(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }
) {
  const { className = '', children, ...rest } = props;
  return (
    <a
      {...rest}
      className={[
        'relative inline-flex items-center justify-center rounded-full px-5 py-2.5',
        'font-semibold text-black select-none',
        'bg-gradient-to-r from-yellow-400 to-orange-500',
        'shadow-[0_8px_20px_rgba(0,0,0,0.25)] ring-1 ring-black/5',
        'transition-transform duration-150 ease-out hover:scale-[1.02]',
        'active:translate-y-[2px] active:shadow-[0_4px_12px_rgba(0,0,0,0.28)]',
        className,
      ].join(' ')}
    >
      {children}
    </a>
  );
}

/* ----------------------------
   Desktop QR Modal (accessible)
   ---------------------------- */
type NavigatorWithShare = Navigator & { share?: (data: any) => Promise<void> };

export function AppGetModal({
  open,
  onClose,
  qrSrc = '/images/bean-you-qr.png',
  title = 'Get the app',
  copy = 'Scan this QR with your phone camera to install the Bean You app. You can also download or share the QR, or click a store link below.',
  showStoreBadges = true,
  storeLinks,
}: AppGetModalProps) {
  const dialogRef = React.useRef<HTMLDivElement>(null);

  // Lock scroll while open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape to close + focus management
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const id = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    }, 0);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(id);
    };
  }, [open, onClose]);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      const nav = navigator as NavigatorWithShare;

      if ('share' in nav && typeof nav.share === 'function') {
        await nav.share({
          title: 'Bean You — Get the app',
          text: 'Scan this QR to install the Bean You app.',
          url,
        });
        return;
      }

      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
      }

      // Fallback for older browsers / non-secure contexts
      const temp = document.createElement('input');
      temp.value = url;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand?.('copy');
      document.body.removeChild(temp);
      alert('Link copied to clipboard!');
    } catch {
      // ignore
    }
  };

  if (!open) return null;

  const ios = storeLinks?.ios ?? 'https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2';
  const android = storeLinks?.android ?? 'https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB';

  return (
    <div aria-hidden={!open} className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      {/* dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 w-full max-w-md rounded-2xl bg-[#3C2100] text-white shadow-2xl ring-1 ring-white/10"
      >
        <div className="flex items-start justify-between p-4 sm:p-5">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            data-autofocus
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

        <div className="px-4 sm:px-5">
          <p className="text-sm text-amber-100/90">{copy}</p>
        </div>

        <div className="p-4 sm:p-5">
          <div className="mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-xl bg-white p-3 shadow-inner flex items-center justify-center">
            <Image
              src={qrSrc}
              alt="Bean You app QR code"
              width={512}
              height={512}
              className="object-contain rounded-md"
              priority
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Press3DButton href={qrSrc} download className="w-full sm:w-auto justify-center">
              Download QR
            </Press3DButton>
            <Press3DButton
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleShare();
              }}
              className="w-full sm:w-auto justify-center"
            >
              Share / Copy Link
            </Press3DButton>
          </div>

          {showStoreBadges && (
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={ios}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-label="Open in the Apple App Store"
              >
                <Image
                  src="/images/app-store-badge.png"
                  alt="Download on the App Store"
                  width={160}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </a>
              <a
                href={android}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-label="Get it on Google Play"
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
          )}

          <div className="mt-3 text-xs text-amber-200/80">Tip: Save the QR and share it with friends.</div>
        </div>

        <div className="p-4 sm:p-5">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-white/10 hover:bg-white/15 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
