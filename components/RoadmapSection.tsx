'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useEffect, useRef } from 'react';

type Item = {
  imgSrc: string;
  imgAlt: string;
  titleEyebrow: string;
  title: string;
  body: string;
  cta?: { label: string; href: string; external?: boolean; onClick?: (e: MouseEvent<HTMLAnchorElement>) => void };
  bg: 'primary' | 'secondary';
};

export default function RoadmapSection() {
  const redirectToApp = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const userAgent = navigator.userAgent || (navigator as any).vendor || (window as any).opera;

    if (/android/i.test(userAgent)) {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB';
      return;
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      window.location.href = 'https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2';
      return;
    }
    alert('Please scan the QR code with your phone to download the app.');
  };

  const items: Item[] = [
    {
      imgSrc: '/images/genz.png',
      imgAlt: 'Gen‑Z community engaging with Bean You',
      titleEyebrow: 'Timeline',
      title: 'Our Journey',
      body: 'Our not-for-profit Foundation, ESG crops, cafés, gifts including tokens and free benefits.',
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
      titleEyebrow: 'INVESTOR',
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
      body: 'Ethically approved organizations, café reviews, and access to groups with similar ESG values.',
      cta: { label: 'Get to App', href: '#', onClick: redirectToApp },
      bg: 'primary',
    },
  ];

  return (
    <section id="roadmap" className="relative py-20 md:py-24 bg-[#BD570F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">Roadmap</h2>

        <div className="space-y-16 md:space-y-24">
          {items.map((item, idx) => (
            <Row key={idx} item={item} reverse={idx % 2 === 1} />
          ))}

          {/* Connector images for desktop (optional, keeps your visual language) */}
          {/* If you want the connectors between every pair, you can render them between rows instead. */}
        </div>
      </div>
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
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.2 }
    );
    if (imageRef.current) io.observe(imageRef.current);
    if (textRef.current) io.observe(textRef.current);
    return () => io.disconnect();
  }, []);

  const bgClass =
    item.bg === 'primary'
      ? 'bg-[#BD570F]' // matches your section base, but text card sits on a card color—still fine
      : 'bg-[#C85A17]';

  return (
    <div className={`grid md:grid-cols-2 items-center gap-6 md:gap-10 lg:gap-12 ${reverse ? 'md:direction-rtl' : ''}`}>
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
        className={`reveal transition-all duration-700 [transition-delay:250ms] ${reverse ? 'md:order-1' : ''}`}
      >
        <div className={`${bgClass} rounded-2xl p-6 sm:p-7 shadow-xl`}>
          <h3 className="text-orange-300 font-semibold tracking-wide mb-1">{item.titleEyebrow}</h3>
          <h4 className="text-2xl sm:text-3xl font-semibold mb-3">{item.title}</h4>
          <p className="mb-5 leading-relaxed">{item.body}</p>

          {item.cta && (
            <>
              {item.cta.onClick ? (
                <a
                  href={item.cta.href}
                  onClick={item.cta.onClick}
                  className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-5 py-2.5 rounded-full"
                >
                  {item.cta.label}
                </a>
              ) : item.cta.external ? (
                <a
                  href={item.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-5 py-2.5 rounded-full"
                >
                  {item.cta.label}
                </a>
              ) : (
                <Link
                  href={item.cta.href}
                  className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-5 py-2.5 rounded-full"
                >
                  {item.cta.label}
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(16px);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        /* For RTL flip trick only on layout, not text direction */
        .md\\:direction-rtl {
          direction: rtl;
        }
        @media (min-width: 768px) {
          .md\\:direction-rtl > * {
            direction: ltr; /* keep text normal while grid flips columns */
          }
        }
      `}</style>
    </div>
  );
}
