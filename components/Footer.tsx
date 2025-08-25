"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <footer className="relative overflow-hidden text-white">
      {/* Warm gradient + blur */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,theme(colors.orange.700/.4),transparent),radial-gradient(800px_400px_at_110%_10%,theme(colors.red.700/.35),transparent),linear-gradient(120deg,theme(colors.orange.900/.55),theme(colors.rose.900/.55))]" />
      <div className="absolute inset-0 backdrop-blur-2xl" />

      {/* subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
        {/* Top row */}
        <div className="mb-8 sm:mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-md">
              <BeanIcon className="h-5 w-5 text-orange-200" />
            </span>
            <span className="text-base sm:text-lg font-semibold tracking-wide">
              Bean You®
            </span>
          </div>
        </div>

        {/* Content grid — 3 groups on mobile/desktop */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Legal (includes Terms, Privacy, FAQ, Jobs) */}
          <Section title="Legal">
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <button
                  onClick={() => setTermsOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-lg px-2 py-1 transition hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  <Dot /> Quick view: Terms of Use
                </button>
                <span className="text-white/40">•</span>
                <Link
                  href="app/legal/terms.tsx"
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-1 underline decoration-white/30 underline-offset-4 hover:text-orange-200"
                >
                  Read full Terms
                </Link>
              </li>

              <li>
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-lg px-2 py-1 transition hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  <Dot /> Privacy Policy
                </button>
              </li>

              <li>
                <button
                  onClick={() => setFaqOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-lg px-2 py-1 transition hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  <Dot /> FAQ
                </button>
              </li>

              <li>
                <button
                  onClick={() => setJobsOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-lg px-2 py-1 transition hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  <Dot /> Jobs
                </button>
              </li>
            </ul>
          </Section>

          {/* Franchise */}
          <Section title="Franchise">
            <p className="text-white/85">
              Bean You® is franchising our cafes with initial target markets being
              Kenya, UK, China, Brazil, USA and France.
            </p>
            <p className="mt-2">
              If you are interested in our franchising opportunity please contact us at{" "}
              <a
                className="underline decoration-white/30 underline-offset-4 hover:text-orange-200"
                href="mailto:info@beanyou.com"
              >
                info@beanyou.com
              </a>.
            </p>
          </Section>

          {/* Contact */}
          <Section title="Contact">
            <ul className="space-y-3">
              <ContactItem label="General Enquiries" email="info@beanyou.com" />
              <ContactItem label="Social Media" email="socialmedia@beanyou.com" />
              <ContactItem label="Support" email="support@beanyou.com" />
            </ul>
          </Section>
        </div>

        {/* Divider */}
        <div className="my-8 sm:my-10 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-white/80">
          <div>© Bean You® 2025</div>
          <div className="opacity-80">
            Built for mobile • Tap-friendly • Accessible
          </div>
        </div>
      </div>

      {/* ---- Modals (trimmed content) ---- */}
      <Modal open={termsOpen} onClose={() => setTermsOpen(false)} title="Terms of Use — Quick View">
        <div className="space-y-3 text-sm leading-6 text-white/90">
          <p className="font-semibold">Summary (short):</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use of the Bean You® website, app, and services is subject to acceptable use and local laws.</li>
            <li>Content and brand assets are protected; do not copy or misuse.</li>
            <li>Accounts must be accurate; you are responsible for activity under your login.</li>
            <li>We may update features and policies to keep users safe and compliant.</li>
          </ul>
          <p className="pt-2">
            For the full, binding Terms please read the complete document.
          </p>
          <div className="pt-1">
            <Link
              href="components/terms.tsx"
              className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm underline decoration-white/30 underline-offset-4 hover:bg-white/15"
            >
              Read full Terms
            </Link>
          </div>
        </div>
      </Modal>

      <Modal open={privacyOpen} onClose={() => setPrivacyOpen(false)} title="Privacy Policy">
        <div className="space-y-4 text-sm leading-6 text-white/90">
          <p>
            <strong>Bean You®</strong> is fully compliant with UK GDPR (General Data Protection Regulation) and the Data Protection Act 2018.
          </p>
          <p>
            Bean You Limited is registered with the UK Information Commissioner Office (ICO) reference <strong>ZB961675</strong>.
          </p>
          <p>
            We process personal data lawfully, fairly and transparently, for specified, explicit purposes, using data minimisation and appropriate security. To exercise your data rights or make a request, contact{" "}
            <a href="mailto:info@beanyou.com" className="underline decoration-white/30 underline-offset-4 hover:text-orange-200">
              info@beanyou.com
            </a>.
          </p>
        </div>
      </Modal>

      <Modal open={jobsOpen} onClose={() => setJobsOpen(false)} title="Jobs">
        <div className="space-y-3 text-sm leading-6 text-white/90">
          <p>
            We are currently looking for an <strong>international retail CEO</strong>.
          </p>
          <p>
            Please apply with a full resume to the Chair,{" "}
            <a
              href="mailto:olinga.taeed@beanyou.com?subject=Application%20-%20International%20Retail%20CEO"
              className="underline decoration-white/30 underline-offset-4 hover:text-orange-200"
            >
              Dr Olinga Taeed
            </a>.
          </p>
        </div>
      </Modal>

      <Modal open={faqOpen} onClose={() => setFaqOpen(false)} title="BUY ESG — FAQ">
        <div className="text-sm text-white/90">
          <p className="mb-4">
            Through livestreams and symbolic &lsquo;adoption&rsquo; of coffee plots, you witness the life cycle of your coffee bean and the people behind it. It&rsquo;s not entertainment, it&rsquo;s consumption turning into connection.
          </p>

          <FaqItem q="1. What is iRWA (intangible Real World Assets)?">
            We connect Bean You® customers worldwide to coffee farmers in Kenya. We have created a digital twin of all our farms and broken the land into 1m² plots, equivalent to one coffee crop. We encourage our audience to connect to our 1m² coffee plots which carry rights and privileges they can benefit from.
          </FaqItem>

          <FaqItem q="2. What&rsquo;s in it for me?">
            <p className="mb-3">
              You gain both tangible and intangible value. We group these into <strong>Hard Benefits</strong> and <strong>Soft Benefits</strong>.
            </p>

            <details className="group mb-3 rounded-lg border border-white/10 bg-white/5 p-3 open:mb-4">
              <summary className="flex cursor-pointer items-center justify-between text-white/95 hover:text-orange-200">
                <span className="font-medium">Hard Benefits</span>
                <span className="shrink-0 rounded-md px-2 py-0.5 text-[10px] ring-1 ring-white/20 group-open:rotate-45 transition">+</span>
              </summary>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-[13px] leading-6">
                <li>Direct ESG ownership in 1m² coffee crop plots.</li>
                <li>Early access to rare and appreciating coffee plot rights.</li>
                <li>Potential to transfer ESG entitlements in the future.</li>
                <li>Traceability of your coffee&rsquo;s lifecycle.</li>
              </ul>
            </details>

            <details className="group rounded-lg border border-white/10 bg-white/5 p-3">
              <summary className="flex cursor-pointer items-center justify-between text-white/95 hover:text-orange-200">
                <span className="font-medium">Soft Benefits</span>
                <span className="shrink-0 rounded-md px-2 py-0.5 text-[10px] ring-1 ring-white/20 group-open:rotate-45 transition">+</span>
              </summary>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-[13px] leading-6">
                <li>Personal connection to coffee farmers and their families.</li>
                <li>Contribute to health, education and technology initiatives.</li>
                <li>Emotional ownership &mdash; turning consumption into connection.</li>
                <li>Community belonging with Bean You® adopters worldwide.</li>
              </ul>
            </details>
          </FaqItem>

          <FaqItem q="3. What is the Process?">
            ESG investors can select which farm, zoom into 1m² plot(s) through our website and App at the touch of a button, and purchase the ESG rights.
          </FaqItem>

          <FaqItem q="4. How much do I Pay?">
            You pay as little as 500 KSH (less than US$ 4). Over time the price may increase due to rarity of available crops, so we encourage you to act quickly.
          </FaqItem>

          <FaqItem q="5. How do I Pay?">
            On the website or mobile you can select and pay using KSH, credit/debit cards, MPesa and cryptocurrency.
          </FaqItem>

          <FaqItem q="6. Where does my money go?">
            Your donation, less costs, goes to the Asili Foundation, a not-for-profit ESG organisation registered in Kenya with a Board of Trustees that distribute funds to farmers for health, education and technology.
          </FaqItem>

          <FaqItem q="7. Can I get support?">
            Email us at{" "}
            <a className="underline decoration-white/30 underline-offset-4 hover:text-orange-200" href="mailto:support@beanyou.com">
              support@beanyou.com
            </a>{" "}
            and we will respond within 24 hours.
          </FaqItem>
        </div>
      </Modal>
    </footer>
  );
}

/* ---------- Small UI bits ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 ring-1 ring-white/10 backdrop-blur-md">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide">
        <Sparkle className="h-4 w-4 text-orange-200" />
        {title}
      </h4>
      <div className="text-[13px] leading-6">{children}</div>
    </div>
  );
}

function ContactItem({ label, email }: { label: string; email: string }) {
  return (
    <li className="flex items-start gap-2">
      <MailIcon className="mt-0.5 h-4 w-4 text-white/70" />
      <div>
        <div className="text-white/90">{label}</div>
        <a
          href={`mailto:${email}`}
          className="text-white/85 underline decoration-white/30 underline-offset-4 hover:text-orange-200 break-all"
        >
          {email}
        </a>
      </div>
    </li>
  );
}

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative m-2 w-full max-w-lg rounded-2xl border border-white/15 bg-gradient-to-br from-white/15 to-white/5 p-5 sm:p-6 text-white shadow-2xl ring-1 ring-white/20 backdrop-blur-2xl">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-[15px] sm:text-base font-semibold tracking-wide">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 px-2 py-1 text-xs hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Close"
          >
            Close
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto pr-1 sm:pr-2">{children}</div>
      </div>
    </div>
  );
}

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 ring-1 ring-white/10 backdrop-blur-md mb-3 open:mb-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-white/95 hover:text-orange-200">
        <span className="font-medium">{q}</span>
        <span
          className="shrink-0 rounded-md px-2 py-0.5 text-[10px] ring-1 ring-white/20 group-open:rotate-45 transition"
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <div className="mt-3 text-white/90 leading-6 text-[13px]">{children}</div>
    </details>
  );
}

/* ---------- Icons ---------- */

function BeanIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.9 2.1c-3.7 0-6.8 3-6.8 6.8 0 5.4 4.4 9 7.7 12 .5.4 1.1.4 1.6 0 3.3-3 7.7-6.6 7.7-12 0-3.7-3-6.8-6.8-6.8-1.8 0-3.5.7-4.8 1.9C10.8 2.5 11.8 2.1 12.9 2.1z" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.2-.5 7.3 5.1c.3.2.7.2 1 0l7.3-5.1H4.2Z" />
    </svg>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2c.4 2.5 2.5 4.6 5 5-.7.1-1.4.4-2 .8-.6.4-1.1.9-1.5 1.5-.4.6-.7 1.3-.8 2-.4-2.5-2.5-4.6-5-5 .7-.1 1.4-.4 2-.8.6-.4 1.1-.9 1.5-1.5.4-.6.7-1.3.8-2Zm0 10c.3 1.7 1.7 3.1 3.5 3.5-1.8.4-3.2 1.8-3.5 3.5-.3-1.7-1.7-3.1-3.5-3.5 1.8-.4 3.2-1.8 3.5-3.5Z" />
    </svg>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden="true" />;
}
