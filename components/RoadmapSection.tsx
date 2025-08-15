'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent } from 'react';

export default function RoadmapSection() {
  const redirectToApp = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const userAgent = navigator.userAgent || (navigator as any).vendor || (window as any).opera;

    if (/android/i.test(userAgent)) {
      window.location.href =
        'https://play.google.com/store/apps/details?id=com.beanu&hl=en_GB';
      return;
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      window.location.href =
        'https://apps.apple.com/us/app/bean-you-be-your-identities/id6742394096?uo=2';
      return;
    }
    alert('Please scan the QR code with your phone to download the app.');
  };

  return (
    <section id="roadmap" className="relative py-20 bg-[#BD570F] text-white">
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-4xl font-bold text-center mb-12">Roadmap</h2>

        <div className="relative flex flex-col space-y-24">

          {/* Item 1 */}
          <div className="flex flex-col md:flex-row items-center md:space-x-8 relative z-10">
            <div className="w-full md:w-1/2">
              <Image
                src="/images/genz.png"
                alt="Gen‑Z"
                width={1200}
                height={800}
                className="w-full rounded-xl object-cover"
                priority
              />
            </div>
            <div className="bg-[#C85A17] p-6 rounded-xl w-full md:w-1/2 shadow-lg mt-4 md:mt-0">
              <h3 className="text-orange-300 font-bold mb-1">Timeline</h3>
              <h4 className="text-2xl font-semibold mb-2">Our Journey</h4>
              <p className="mb-4">Our not-for-profit Foundation, ESG crops, cafes, gifts including tokens and free benefits</p>
              <Link
                href="roadmap"
                className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-2 rounded-full"
              >
                Discover More
              </Link>
            </div>
          </div>

          {/* Connector 1-2 */}
          <div className="hidden md:flex justify-center relative w-full h-12">
            <Image
              src="/images/connecter.png"
              alt="Roadmap connector"
              width={200}
              height={48}
              className="mx-auto w-[200px] h-auto"
            />
          </div>

          {/* Item 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8 md:space-x-reverse relative z-10">
            <div className="w-full md:w-1/2">
              <Image
                src="/images/coffeelover.png"
                alt="Coffee Lover"
                width={1200}
                height={800}
                className="w-full rounded-xl object-cover"
              />
            </div>
            <div className="bg-[#BD570F] p-6 rounded-xl w-full md:w-1/2 shadow-lg mt-4 md:mt-0">
              <h3 className="text-orange-300 font-bold mb-1">Coffee Lover</h3>
              <h4 className="text-2xl font-semibold mb-2">Brewed to Your Taste</h4>
              <p className="mb-4">
                Connect to the farm behind your favorite brew and be part of its journey — from seed to sip, rooted in sustainability.
              </p>
              <a
                href="https://asiliestates.co.ke"
                className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get to Farm
              </a>
            </div>
          </div>

          {/* Connector 2-3 */}
          <div className="hidden md:flex justify-center relative w-full h-12">
            <Image
              src="/images/connecter.png"
              alt="Roadmap connector"
              width={200}
              height={48}
              className="mx-auto w-[200px] h-auto"
            />
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8 relative z-10 mt-24">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/investor.jpg"
              alt="Investor"
              width={1200}
              height={800}
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="bg-[#C85A17] p-6 rounded-xl w-full md:w-1/2 shadow-lg mt-4 md:mt-0">
            <h3 className="text-orange-300 font-bold mb-1">INVESTOR</h3>
            <h4 className="text-2xl font-semibold mb-2">Your Wealth Creation</h4>
            <p className="mb-4">Invest in identity. Grow with purpose. Empower communities.</p>
            <a
              href="https://parcels.beanyou.com/"
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-2 rounded-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discover More
            </a>
          </div>
        </div>

        {/* Connector 3-4 */}
        <div className="hidden md:flex justify-center relative w-full h-12">
          <Image
            src="/images/connecter.png"
            alt="Roadmap connector"
            width={200}
            height={48}
            className="mx-auto w-[200px] h-auto"
          />
        </div>

        {/* Item 4 */}
        <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8 md:space-x-reverse relative z-10 mt-24">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/ecowarrior.jpg"
              alt="Eco Warrior"
              width={1200}
              height={800}
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="bg-[#BD570F] p-6 rounded-xl w-full md:w-1/2 shadow-lg mt-4 md:mt-0">
            <h3 className="text-orange-300 font-bold mb-1">Eco Warrior</h3>
            <h4 className="text-2xl font-semibold mb-2">Community Governance</h4>
            <p className="mb-4">
              Ethically approved organizations, cafés reviews and access to groups of similar ESG.
            </p>

           

            {/* Smart Button */}
            <a
              href="#"
              onClick={redirectToApp}
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-2 rounded-full"
            >
              Get to App
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
