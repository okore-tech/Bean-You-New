'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';

type Item = {
  imgSrc: string;
  imgAlt: string;
  titleEyebrow: string;
  title: string;
  body: string;
  cta?: {
    label: string;
    href: string;
    external?: boolean;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  };
  bg: 'primary' | 'secondary';
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent || (navigator as any).vendor || (window as any).opera;
    const mobile = /android|iphone|ipad|ipod/i.test(ua);
    setIsMobile(mobile);
  }, []);
  return isMobile;
}

/* 3D pressable gradient button */
function Press3DButton(
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

function useAppRedirect() {
  return () => {
    const ua = navigator.userAgent || (navigator as any).vendor || (window as any).opera;
    if (/android/i.test(ua)) {
      window.location.href =
        'https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB';
      return;
    }
    if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) {
      window.location.href =
        'https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2';
      return;
    }
    alert('Scan the QR code on desktop to get the app.');
  };
}

/* Modal for desktop QR (unchanged style, now with QR switch + store badges) */
function QrModal({
  open,
  onClose,
  // Optional: a generic single QR if you want; we’ll still allow switching below
  qrSrc = '/images/bean-you-qr.png',
}: {
  open: boolean;
  onClose: () => void;
  qrSrc?: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [qrType, setQrType] = useState<'ios' | 'android'>('ios');

  // Provide per-store QR images. Replace with your real files.
  const IOS_QR = '/images/bean-you-ios-qr.png';
  const ANDROID_QR = '/images/bean-you-android-qr.png';

  // Store URLs
  const IOS_URL =
    'https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2';
  const ANDROID_URL =
    'https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const id = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLButtonElement>('button[data-close]')?.focus();
    }, 0);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(id);
    };
  }, [open, onClose]);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (typeof (navigator as any).share === 'function') {
        await (navigator as any).share({
          title: 'Bean You — Get the app',
          text: 'Scan this QR to install the Bean You app.',
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch {
      // ignore
    }
  };

  if (!open) return null;

  // Decide which QR to render: prefer per-store QRs; fallback to single generic qrSrc
  const currentQr =
    (qrType === 'ios' ? IOS_QR : ANDROID_QR) || qrSrc;

  return (
    <div aria-hidden={!open} className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Get the Bean You app"
        className="relative z-10 w-full max-w-md rounded-2xl bg-[#3C2100] text-white shadow-2xl ring-1 ring-white/10"
      >
        <div className="flex items-start justify-between p-4 sm:p-5">
          <h3 className="text-lg font-bold">
            Get the app ({qrType === 'ios' ? 'App Store' : 'Google Play'})
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

        <div className="px-4 sm:px-5">
          <p className="text-sm text-amber-100/90">
            Scan this QR with your phone camera to install the Bean You app. You can also download or share the QR, or switch between stores.
          </p>
        </div>

        <div className="p-4 sm:p-5">
          {/* QR */}
          <div className="mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-xl bg-white p-3 shadow-inner flex items-center justify-center">
            <Image
              src={currentQr}
              alt={qrType === 'ios' ? 'App Store QR' : 'Google Play QR'}
              width={512}
              height={512}
              className="object-contain rounded-md"
              priority
            />
          </div>

{/* Toggle store QR */}
<div className="mt-4 flex gap-3 justify-center flex-wrap">
  <Press3DButton
    href="#"
    onClick={(e) => { e.preventDefault(); setQrType('ios'); }}
    className={qrType === 'ios' ? '' : 'opacity-90'}
  >
    App Store QR
  </Press3DButton>
  <Press3DButton
    href="#"
    onClick={(e) => { e.preventDefault(); setQrType('android'); }}
    className={qrType === 'android' ? '' : 'opacity-90'}
  >
    Play Store QR
  </Press3DButton>
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
    onClick={(e) => { e.preventDefault(); handleShare(); }}
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


          <div className="mt-3 text-xs text-amber-200/80">
            Tip: Save the QR to your photos and share it with friends.
          </div>
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

export default function RoadmapSection() {
  const isMobile = useIsMobile();
  const redirectToApp = useAppRedirect();

  // Smart CTA: mobile -> redirect; desktop -> open modal
  const [qrOpen, setQrOpen] = useState(false);
  const handleSmartGetApp = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isMobile) {
      redirectToApp();
    } else {
      setQrOpen(true);
    }
  };

  const items: Item[] = useMemo(
    () => [
      {
        imgSrc: '/images/genz.png',
        imgAlt: 'Gen‑Z community engaging with Bean You',
        titleEyebrow: 'Timeline',
        title: 'Our Journey',
        body:
          'Our not-for-profit Foundation, ESG crops, cafés, gifts including tokens and free benefits.',
        cta: { label: 'Discover More', href: '/roadmap' },
        bg: 'secondary',
      },
      {
        imgSrc: '/images/cafe01.png',
        imgAlt: 'Coffee lover brewing their favorite cup',
        titleEyebrow: 'Coffee Lover',
        title: 'Brewed to Your Taste',
        body:
          'Connect to the farm behind your favorite brew and be part of its journey — from seed to your heart, rooted in sustainability.',
        cta: { label: 'Get to Farm', href: 'https://asiliestates.co.ke', external: true },
        bg: 'primary',
      },
      {
        imgSrc: '/images/invest2.jpg',
        imgAlt: 'Investor exploring Bean You opportunities',
        titleEyebrow: 'Investor',
        title: 'Your Wealth Creation',
        body: 'Invest in identity. Grow with purpose. Empower communities.',
        cta: { label: 'Discover More', href: 'https://parcels.beanyou.com/', external: true },
        bg: 'secondary',
      },
      {
        imgSrc: '/images/ecowarrior.jpg',
        imgAlt: 'Eco warrior in a sustainable community',
        titleEyebrow: 'Eco Warrior',
        title: 'Community Governance',
        body:
          'Ethically approved organizations, café reviews, and access to groups with similar ESG values.',
        cta: { label: 'Get to App', href: '#', onClick: handleSmartGetApp },
        bg: 'primary',
      },
    ],
    [isMobile]
  );

  return (
    <section id="roadmap" className="relative py-20 md:py-24 bg-[#BD570F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">Roadmap</h2>

        <div className="space-y-16 md:space-y-24">
          {items.map((item, idx) => (
            <Row key={idx} item={item} reverse={idx % 2 === 1} />
          ))}
        </div>
      </div>

      {/* Desktop QR modal */}
      {!isMobile && <QrModal open={qrOpen} onClose={() => setQrOpen(false)} qrSrc="/images/bean-you-qr.png" />}
    </section>
  );
}

function Row({ item, reverse }: { item: Item; reverse?: boolean }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-visible');
        }
      });
    },
    { threshold: 0.2 }
  );
  if (imageRef.current) io.observe(imageRef.current);
  if (textRef.current) io.observe(textRef.current);
  return () => io.disconnect();
}, []);


  const bgClass = item.bg === 'primary' ? 'bg-[#BD570F]' : 'bg-[#C85A17]';

  return (
    <div
      className={`grid md:grid-cols-2 items-center gap-6 md:gap-10 lg:gap-12 ${
        reverse ? 'md:direction-rtl' : ''
      }`}
    >
      {/* IMAGE */}
      <div
        ref={imageRef}
        className={`reveal transition-all duration-700 [transition-delay:120ms] ${
          reverse ? 'md:order-2' : ''
        }`}
      >
        <div className="relative aspect-[16/10] md:aspect-[5/4] w-full overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={item.imgSrc}
            alt={item.imgAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={item.title === 'Our Journey'}
          />
        </div>
      </div>

      {/* TEXT CARD */}
      <div
        ref={textRef}
        className={`reveal transition-all duration-700 [transition-delay:250ms] ${
          reverse ? 'md:order-1' : ''
        }`}
      >
        <div className={`${bgClass} rounded-2xl p-6 sm:p-7 shadow-xl`}>
          <h3 className="text-orange-300 font-semibold tracking-wide mb-1">
            {item.titleEyebrow}
          </h3>
          <h4 className="text-2xl sm:text-3xl font-semibold mb-3">{item.title}</h4>
          <p className="mb-5 leading-relaxed">{item.body}</p>

          {item.cta && (
            <>
              {item.cta.onClick ? (
                <Press3DButton href={item.cta.href} onClick={item.cta.onClick}>
                  {item.cta.label}
                </Press3DButton>
              ) : item.cta.external ? (
                <Press3DButton
                  href={item.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.cta.label}
                </Press3DButton>
              ) : (
                <Link href={item.cta.href} className="inline-block">
                  <Press3DButton>{item.cta.label}</Press3DButton>
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .reveal { opacity: 0; transform: translateY(16px); }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }
        .md\\:direction-rtl { direction: rtl; }
        @media (min-width: 768px) { .md\\:direction-rtl > * { direction: ltr; } }
      `}</style>
    </div>
  );
}
