"use client";

/*
  IMPECCABLE DIRECTION CONTRACT — /parcels — seed 6f9d3677
  (the same contract is emitted as an HTML comment in app/layout.tsx so it survives the build)

  THESIS: A closed programme, told on the land it was drawn on. This page refuses
  the archive scroller of hero-plus-timeline-cards; it is one aerial photograph
  that the visitor's scroll surveys.
  OWN-WORLD: Bean You's established world — brand orange #BD570F, deep brown
  #3C2100, amber #F59E0B, Poppins 800 display. Two materials only: the Kahiro
  aerial photograph, and one strict 1m² cell grid drawn in amber. No gradients on
  the land.
  STORY: See real ground → watch it become a twin → see one square metre isolated
  → learn what it carried → read the close: closed August 2026, adoptions
  honoured. Leave to the app or the tribe.
  FIRST VIEWPORT: Full-bleed aerial (drone video when supplied; photo now),
  ungridded. Caption low-left: "This is Kahiro farm, Kenya." Status line top.
  Scroll cue. No grid yet — the scroll draws it.
  FORM: Survey Overlay, #1 on my ranked list, dealt as index 1 of seed 6f9d3677.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, DESIGN.md, and every shipping raster carrying its
  provenance.
*/

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SmartGetAppButton from "@/components/SmartGetAppButton";

/* ----------------------------------------------------------------
   Survey grid density. The real twin drew a line every metre; at the
   scale of this photograph that would be a solid haze, so the grid
   is drawn at reduced density and the caption says so.
   ---------------------------------------------------------------- */
const COLS = 48;
const ROWS = 28;
/* The square the story isolates: one cell of the survey grid. */
const CELL_COL = 27;
const CELL_ROW = 15;

/* Drone footage slot. When the footage arrives, save it as
   public/videos/kahiro-drone.mp4 (720p H.264, +faststart) and set this to
   "/videos/kahiro-drone.mp4". The layer then fades in over the photograph on
   its own. Left null, nothing is requested, so the page never 404s on a file
   that is not there yet. */
const DRONE_VIDEO_SRC: string | null = null;

type Phase = 0 | 1 | 2 | 3 | 4;

const CAPTIONS: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "This is Kahiro farm, Kenya.",
    body: "Coffee, planted in rows on red soil. One of the Asili farms.",
  },
  {
    title: "In 2025 we made a digital twin of it.",
    body: "Every farm was mapped, and a line drawn every metre. Shown here at reduced density.",
  },
  {
    title: "Each square: one metre by one metre.",
    body: "One square metre of ground grows one coffee crop. We called it iRWA — an intangible real-world asset.",
  },
  {
    title: "Adopters chose one.",
    body: "From anywhere in the world, for as little as 500 KSH, you could hold the ESG rights to a single square.",
  },
  {
    title: "And followed it through the year.",
    body: "Livestreams, updates, and the people behind the crop. Consumption turning into connection.",
  },
];

function phaseFor(p: number): Phase {
  if (p < 0.14) return 0;
  if (p < 0.42) return 1;
  if (p < 0.58) return 2;
  if (p < 0.74) return 3;
  return 4;
}

/* Scroll → progress (0..1) → CSS custom property on the stage. Everything
   visual derives from --p in CSS; React only tracks the caption phase. */
function useSurveyProgress(
  outerRef: React.RefObject<HTMLDivElement | null>,
  stageRef: React.RefObject<HTMLDivElement | null>
) {
  const [phase, setPhase] = useState<Phase>(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      // Static survey: grid drawn, one cell isolated, no zoom, captions in flow.
      setReduced(true);
      stage.style.setProperty("--p", "0.64");
      setPhase(2);
      return;
    }

    // QA hook: /parcels?survey=0.64 pins the survey at a progress value so a
    // headless capture can photograph any scroll state from the document top.
    const search = window.location.search;
    if (search.includes("survey=")) {
      const raw = new URLSearchParams(search).get("survey");
      if (raw === "static") {
        // Same layout as prefers-reduced-motion: still image, captions in flow.
        setReduced(true);
        stage.style.setProperty("--p", "0.64");
        setPhase(2);
        return;
      }
      const pinned = Number(raw);
      if (Number.isFinite(pinned)) {
        stage.dataset.pinned = "1";
        const p = Math.min(1, Math.max(0, pinned));
        stage.style.setProperty("--p", p.toFixed(4));
        setPhase(phaseFor(p));
        return;
      }
    }

    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = outer.getBoundingClientRect();
      const travel = outer.offsetHeight - stage.offsetHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      stage.style.setProperty("--p", p.toFixed(4));
      const next = phaseFor(p);
      setPhase((prev) => (prev === next ? prev : next));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [outerRef, stageRef]);

  return { phase, reduced };
}

/* The drone layer only becomes visible once the browser can actually play it,
   so a missing or unsupported file never shows a broken frame. */
function DroneLayer({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const onCanPlay = () => {
      setReady(true);
      v.play().catch(() => {});
    };
    v.addEventListener("canplay", onCanPlay);
    return () => v.removeEventListener("canplay", onCanPlay);
  }, [reduced]);
  if (reduced || !DRONE_VIDEO_SRC) return null;
  return (
    <video
      ref={ref}
      className="survey-video"
      data-ready={ready ? "1" : "0"}
      src={DRONE_VIDEO_SRC}
      poster="/images/kahirofarm.webp"
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

/* Two layers so each can be revealed with a clip-path sweep: horizontals
   draw left→right, verticals top→bottom. (Dash-drawing was ruled out: with
   vector-effect: non-scaling-stroke the dash units become screen pixels.) */
function SurveyGrid() {
  const w = COLS * 10;
  const h = ROWS * 10;
  const svgProps = {
    className: "survey-grid",
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "none",
    "aria-hidden": true as const,
    focusable: false as const,
  };
  return (
    <>
      <div className="grid-layer grid-layer-h">
        <svg {...svgProps}>
          {Array.from({ length: ROWS + 1 }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 10} x2={w} y2={i * 10} />
          ))}
        </svg>
      </div>
      <div className="grid-layer grid-layer-v">
        <svg {...svgProps}>
          {Array.from({ length: COLS + 1 }, (_, j) => (
            <line key={`v${j}`} x1={j * 10} y1={0} x2={j * 10} y2={h} />
          ))}
        </svg>
      </div>
      <div className="grid-layer grid-layer-cell">
        <svg {...svgProps}>
          <rect className="cell-rect" x={CELL_COL * 10} y={CELL_ROW * 10} width={10} height={10} />
        </svg>
      </div>
    </>
  );
}

/* ---------- Authored diagrams for "How it worked" (one stroke, one weight) ---------- */
function DiagramFarm() {
  return (
    <svg viewBox="0 0 160 110" className="how-svg" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="farm-field"><path d="M14 30 L128 18 L150 84 L36 98 Z" /></clipPath>
      </defs>
      <path d="M14 30 L128 18 L150 84 L36 98 Z" />
      <g clipPath="url(#farm-field)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={20 + i * 19} y1={26 - i * 1.6} x2={44 + i * 19} y2={100 - i * 2} />
        ))}
      </g>
    </svg>
  );
}
function DiagramGrid() {
  return (
    <svg viewBox="0 0 160 110" className="how-svg" aria-hidden="true" focusable="false">
      <path d="M14 30 L128 18 L150 84 L36 98 Z" />
      {[1, 2, 3, 4, 5, 6, 7].map((i) => {
        const t = i / 8;
        const x1 = 14 + (128 - 14) * t, y1 = 30 + (18 - 30) * t;
        const x2 = 36 + (150 - 36) * t, y2 = 98 + (84 - 98) * t;
        return <line key={`c${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      {[1, 2, 3, 4].map((i) => {
        const t = i / 5;
        const x1 = 14 + (36 - 14) * t, y1 = 30 + (98 - 30) * t;
        const x2 = 128 + (150 - 128) * t, y2 = 18 + (84 - 18) * t;
        return <line key={`r${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
    </svg>
  );
}
function DiagramCell() {
  return (
    <svg viewBox="0 0 160 110" className="how-svg" aria-hidden="true" focusable="false">
      <path d="M14 30 L128 18 L150 84 L36 98 Z" opacity="0.35" />
      <path className="fill" d="M70 50 L92 47 L97 64 L75 67 Z" />
      <path d="M83 56 L83 22" />
      <circle cx="83" cy="18" r="3.5" />
    </svg>
  );
}

/* ---------- The season as an illustrative sequence ----------
   Relative lengths only: the stages of one harvest cycle, from blossom to
   milled bean. No durations are claimed; every farm and year differs. */
const SEASON: ReadonlyArray<{ label: string; share: number }> = [
  { label: "Blossom", share: 1 },
  { label: "Green cherry", share: 10 },
  { label: "Ripening", share: 4 },
  { label: "Harvest", share: 3 },
  { label: "Drying & milling", share: 2 },
];
const SEASON_TOTAL = SEASON.reduce((n, s) => n + s.share, 0);

export default function ParcelsPage() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const { phase, reduced } = useSurveyProgress(outerRef, stageRef);

  return (
    <main className="parcels" data-reduced={reduced ? "1" : "0"}>
      {/* ============================ THE SURVEY ============================ */}
      <div ref={outerRef} className="survey-outer">
        <div ref={stageRef} className="survey-stage" data-phase={phase}>
          <div className="land">
            <Image
              src="/images/kahirofarm.webp"
              alt="Aerial photograph of Kahiro farm in Kenya: rows of coffee on red soil, trees and buildings around the field"
              fill
              priority
              sizes="250vw"
              className="survey-photo"
            />
            <DroneLayer reduced={reduced} />
            <div className="grid-clip">
              <div className="grid-plane">
                <SurveyGrid />
              </div>
            </div>
          </div>
          <div className="veil" aria-hidden="true" />

          <p className="status">
            <span className="status-dot" aria-hidden="true" />
            <span className="status-long">1m² Parcels ·</span>closed August 2026 · every adoption honoured
          </p>

          <div className="captions" aria-live="polite">
            {CAPTIONS.map((c, i) => (
              <div key={i} className="cap" data-i={i} aria-hidden={i !== phase}>
                <h1 className="cap-title">{c.title}</h1>
                <p className="cap-body">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="cue" aria-hidden="true">
            <span>Scroll to survey</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Reduced-motion readers get the same story in flow */}
      {reduced && (
        <ol className="captions-static">
          {CAPTIONS.map((c, i) => (
            <li key={i}>
              <h2>{c.title}</h2>
              <p>{c.body}</p>
            </li>
          ))}
        </ol>
      )}

      {/* ============================ THE FACTS ============================ */}
      <section id="facts" className="facts" aria-label="Programme facts">
        <dl>
          <div><dt>Farms</dt><dd>Asili farms, Kenya — Kahiro pictured</dd></div>
          <div><dt>Unit</dt><dd>1 m² of ground = one coffee crop</dd></div>
          <div><dt>Adoption, then</dt><dd>from 500 KSH, under US$4</dd></div>
          <div><dt>Paid in</dt><dd>KSH, cards, M-Pesa, crypto</dd></div>
          <div><dt>Ran</dt><dd>2025 – August 2026</dd></div>
          <div><dt>Status</dt><dd>Closed. Adoptions honoured.</dd></div>
        </dl>
      </section>

      {/* ======================== WHAT A SQUARE CARRIED ======================== */}
      <section id="carried" className="carried">
        <h2>What a square metre carried</h2>
        <p className="lede">
          Adopting a plot was never about owning dirt. It attached rights to a square of real ground, and it
          attached a person to the people who farmed it. The programme grouped those two things plainly.
        </p>
        <div className="carried-cols">
          <div>
            <h3>In hand</h3>
            <ul>
              <li>Direct ESG ownership in a 1m² coffee crop plot</li>
              <li>Early access to rare and appreciating coffee plot rights</li>
              <li>The prospect of transferring ESG entitlements in future</li>
              <li>Traceability of your coffee’s life cycle</li>
            </ul>
          </div>
          <div>
            <h3>In heart</h3>
            <ul>
              <li>A personal connection to coffee farmers and their families</li>
              <li>A contribution to health, education and technology initiatives</li>
              <li>Emotional ownership — consumption turning into connection</li>
              <li>Belonging among Bean You® adopters worldwide</li>
            </ul>
          </div>
        </div>
        <p className="foundation">
          Contributions, less costs, went to the Asili Foundation — a not-for-profit ESG organisation registered in
          Kenya, whose Board of Trustees distributes funds to farmers for health, education and technology.
        </p>
      </section>

      {/* ============================ THE SEASON ============================ */}
      <section id="season" className="season">
        <h2>One season, followed from a screen</h2>
        <p className="lede">
          A square metre does not do much on a Tuesday. It does a great deal across a year. Adopters followed
          theirs through livestreams and updates from the farm — from blossom to the cup.
        </p>
        <div className="season-bar" role="img" aria-label="The stages of one coffee season in order: blossom, a long green-cherry period, ripening, harvest, then drying and milling. Illustrative lengths only.">
          {SEASON.map((s) => (
            <div
              key={s.label}
              className="seg"
              style={{ ["--w" as string]: s.share / SEASON_TOTAL } as React.CSSProperties}
            >
              <span className="seg-label">{s.label}</span>
            </div>
          ))}
        </div>
        <p className="season-note">Illustrative — the stages in order, lengths relative. Every farm and year differs.</p>
      </section>

      {/* ============================ HOW IT WORKED ============================ */}
      <section id="how" className="how">
        <h2>How it worked</h2>
        <ol className="how-steps">
          <li>
            <DiagramFarm />
            <h3>Choose a farm</h3>
            <p>Five Asili farms were piloted in 2024 with IoT, 5G and blockchain, alongside CCEG. Each was mapped in full.</p>
          </li>
          <li>
            <DiagramGrid />
            <h3>Zoom to a square metre</h3>
            <p>On the website or in the app, you moved from the whole farm down to a single 1m² cell — one coffee crop — and picked it.</p>
          </li>
          <li>
            <DiagramCell />
            <h3>Hold the rights</h3>
            <p>Payment in KSH, cards, M-Pesa or crypto attached the plot’s ESG rights and privileges to you. Then you followed it.</p>
          </li>
        </ol>

        <dl className="record">
          <div><dt>2024</dt><dd>Asili farm pilots — international tech partners; IoT, 5G and blockchain integrated on five coffee farms.</dd></div>
          <div><dt>2025</dt><dd>The iRWA programme launched, mapping up to 15,000 acres into 1m² plots. Adoptions opened.</dd></div>
          <div><dt>August 2026</dt><dd>The programme closed to new adoptions. Every adoption made before then is honoured.</dd></div>
        </dl>
      </section>

      {/* ============================ THE CLOSE ============================ */}
      <section id="close" className="close">
        <div className="close-figure" aria-hidden="true">
          <DiagramCell />
        </div>
        <h2>The programme closed in August 2026.</h2>
        <p className="lede">
          Every adoption made before then is honoured. If you hold a plot and have a question about it, write to{" "}
          <a href="mailto:info@beanyou.com">info@beanyou.com</a> and a person will answer.
        </p>
        <p className="continues">
          The land is still there, and so are the people. What continues: the Bean You® app and its tribes, the
          café network, and the Asili Foundation’s work with farmers.
        </p>
        <div className="close-actions">
          <SmartGetAppButton label="Get the Bean You® app" />
          <Link href="/connect" className="ghost">Meet your tribe</Link>
        </div>
      </section>

      <style jsx global>{`
        /* ---------- page ground & browser surfaces ---------- */
        .parcels {
          --amber: #f59e0b;
          --amber-50: #fff7ed;
          --deep: #3c2100;
          --orange: #bd570f;
          --hdr: 5rem;
          background: var(--deep);
          color: var(--amber-50);
          overflow-x: clip;
        }
        @media (min-width: 768px) { .parcels { --hdr: 6rem; } }
        .parcels ::selection { background: var(--amber); color: var(--deep); }
        .parcels a:focus-visible,
        .parcels button:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; border-radius: 4px; }
        .parcels a { text-underline-offset: 0.18em; text-decoration-thickness: 1px; }

        /* ---------- the survey (pinned) ---------- */
        .survey-outer { height: 520svh; position: relative; margin-top: calc(-1 * var(--hdr)); }
        .survey-stage {
          --p: 0;
          --draw-h: clamp(0, (var(--p) - 0.12) / 0.22, 1);
          --draw-v: clamp(0, (var(--p) - 0.24) / 0.22, 1);
          --cell:   clamp(0, (var(--p) - 0.56) / 0.12, 1);
          --zoom:   clamp(0, (var(--p) - 0.72) / 0.26, 1);
          position: sticky; top: 0; height: 100svh; overflow: hidden;
          background: var(--deep);
          container-type: size; /* lets the field clip follow the stage's own aspect */
        }
        .land {
          position: absolute; inset: 0;
          /* 2.8x: the only source is a 2000px still, so a deeper zoom only blurs.
             When the drone footage lands, this can go further. */
          transform: scale(calc(1 + 1.8 * var(--zoom)));
          transform-origin: 56.6% 53.3%;
          will-change: transform;
        }
        .survey-photo { object-fit: cover; object-position: 52% 58%; }
        .survey-video {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: 52% 58%;
          opacity: 0; transition: opacity 900ms ease-out;
        }
        .survey-video[data-ready="1"] { opacity: 1; }

        /* The grid is laid on the field's plane, not the screen's. */
        /* The field's outline in stage coordinates: the grid is clipped to it so
           the twin never runs over the neighbours' roofs or the tree line. */
        .grid-clip {
          position: absolute; inset: 0; pointer-events: none;
          clip-path: polygon(7.5% 44.8%, 66% 40%, 87% 52%, 87% 64%, 60% 72%, 23% 56%);
        }
        @container (max-aspect-ratio: 4/5) {
          .grid-clip { clip-path: polygon(0% 44%, 100% 38%, 100% 62%, 55% 70%, 0% 58%); }
        }
        .grid-plane {
          position: absolute; left: 6%; top: 29%; width: 88%; height: 48%;
          transform: perspective(1100px) rotateX(54deg) rotateZ(-11deg);
          transform-origin: 50% 50%;
          pointer-events: none;
        }
        .grid-layer { position: absolute; inset: 0; }
        .grid-layer-h { clip-path: inset(0 calc((1 - var(--draw-h)) * 100%) 0 0); }
        .grid-layer-v { clip-path: inset(0 0 calc((1 - var(--draw-v)) * 100%) 0); }
        .survey-grid {
          width: 100%; height: 100%; overflow: visible; display: block;
          filter: drop-shadow(0 0 1.5px rgba(40, 20, 0, 0.85));
        }
        .survey-grid line {
          stroke: var(--amber); stroke-width: 1.25px; stroke-opacity: 0.92;
          vector-effect: non-scaling-stroke;
        }
        /* As the land zooms, the mesh recedes and the one square owns the frame. */
        .grid-layer-h, .grid-layer-v { opacity: calc(1 - 0.6 * var(--zoom)); }
        .cell-rect {
          fill: rgba(245, 158, 11, 0.7); stroke: #fff; stroke-width: 2px;
          vector-effect: non-scaling-stroke; opacity: var(--cell);
          filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.95)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
        }

        /* A local scrim behind the captions only; the land itself stays unveiled. */
        .veil {
          position: absolute; left: 0; right: 0; bottom: 0; height: 40%; pointer-events: none;
          background: linear-gradient(to top, rgba(60, 33, 0, 0.8) 0%, rgba(60, 33, 0, 0.45) 45%, rgba(60, 33, 0, 0) 100%);
        }

        .status {
          position: absolute; top: calc(var(--hdr) + 0.9rem); right: 1rem; z-index: 3;
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.5rem 0.9rem; border-radius: 999px;
          background: rgba(60, 33, 0, 0.62); backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 247, 237, 0.22);
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.01em; color: var(--amber-50);
          max-width: calc(100% - 2rem);
        }
        .status-dot { width: 0.5rem; height: 0.5rem; border-radius: 999px; background: var(--amber); box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25); flex: none; }
        @media (max-width: 480px) { .status-long { display: none; } }

        .captions {
          position: absolute; left: 1.25rem; right: 1.25rem; bottom: 3.25rem; z-index: 3;
          max-width: 40rem;
        }
        .cap {
          position: absolute; left: 0; bottom: 0; right: 0;
          opacity: 0; transform: translateY(10px);
          transition: opacity 420ms cubic-bezier(0.16, 1, 0.3, 1), transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .survey-stage[data-pinned="1"] .cap,
        .survey-stage[data-pinned="1"] .cue { transition: none; }
        .survey-stage[data-phase="0"] .cap[data-i="0"],
        .survey-stage[data-phase="1"] .cap[data-i="1"],
        .survey-stage[data-phase="2"] .cap[data-i="2"],
        .survey-stage[data-phase="3"] .cap[data-i="3"],
        .survey-stage[data-phase="4"] .cap[data-i="4"] { opacity: 1; transform: none; pointer-events: auto; }
        .cap-title {
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.02; text-wrap: balance;
          font-size: clamp(1.9rem, 5.2vw, 3.6rem); color: #fff;
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
          margin: 0 0 0.6rem;
        }
        .cap-body {
          font-size: clamp(1rem, 1.6vw, 1.2rem); line-height: 1.5; color: var(--amber-50);
          max-width: 34rem; margin: 0; text-shadow: 0 1px 10px rgba(0, 0, 0, 0.35);
        }

        .cue {
          position: absolute; left: 50%; bottom: 0.9rem; transform: translateX(-50%); z-index: 3;
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
          white-space: nowrap; color: rgba(255, 247, 237, 0.85);
          transition: opacity 200ms ease-out;
        }
        .survey-stage:not([data-phase="0"]) .cue { opacity: 0; }
        .cue svg { animation: cue-nudge 1.6s ease-in-out infinite; }
        .survey-stage:not([data-phase="0"]) .cue svg { animation: none; }
        @keyframes cue-nudge { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); } }

        /* reduced motion: the stage is a still, the story reads in flow */
        .parcels[data-reduced="1"] .survey-outer { height: auto; margin-top: 0; }
        .parcels[data-reduced="1"] .survey-stage { position: relative; height: min(100svh, 62.5vw); }
        /* Phones, reduced motion: the still is a short 16:10 band, so the status
           chip moves into flow above it instead of sitting on the surveyed rows. */
        @media (max-width: 640px) {
          .parcels[data-reduced="1"] .survey-outer { padding-top: 3.4rem; }
          .parcels[data-reduced="1"] .survey-stage { height: auto; aspect-ratio: 16 / 10; overflow: visible; }
          .parcels[data-reduced="1"] .status { top: auto; bottom: calc(100% + 0.6rem); right: 1rem; left: auto; }
        }
        .parcels[data-reduced="1"] .captions, .parcels[data-reduced="1"] .cue { display: none; }
        .parcels[data-reduced="1"] .cue svg { animation: none; }
        .captions-static { list-style: none; margin: 0; padding: 2rem max(1.25rem, calc((100% - 62rem) / 2)) 0; }
        .captions-static li { max-width: 44rem; }
        .captions-static li { padding: 1.25rem 0; border-top: 1px solid rgba(255, 247, 237, 0.14); }
        .captions-static h2 { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 0.35rem; color: #fff; }
        .captions-static p { margin: 0; color: var(--amber-50); line-height: 1.55; }

        /* ---------- sections in flow ---------- */
        .parcels section {
          padding-block: clamp(3.5rem, 8vw, 7rem);
          padding-inline: max(1.25rem, calc((100% - 62rem) / 2));
        }
        .parcels h2 {
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.04; text-wrap: balance;
          font-size: clamp(1.9rem, 4.2vw, 3.2rem); color: #fff; margin: 0 0 1.1rem;
        }
        .parcels h3 { font-weight: 700; font-size: 1.1rem; letter-spacing: -0.01em; color: #fff; margin: 0 0 0.6rem; }
        .parcels .lede { font-size: clamp(1.05rem, 1.5vw, 1.25rem); line-height: 1.55; color: var(--amber-50); max-width: 40rem; margin-bottom: 2rem; }
        .parcels .lede a { color: #fff; text-decoration: underline; }
        .parcels .lede a:hover { color: var(--amber); }

        .facts { padding-top: 2.5rem !important; padding-bottom: 2.5rem !important; background: var(--orange); }
        .facts dl {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 1.25rem; row-gap: 0;
          border-top: 1px solid rgba(255, 247, 237, 0.28);
        }
        .facts dl > div { padding: 0.85rem 0; border-bottom: 1px solid rgba(255, 247, 237, 0.28); }
        .facts dt { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #fff; margin-bottom: 0.2rem; }
        .facts dd { margin: 0; font-weight: 600; color: #fff; font-variant-numeric: tabular-nums; }
        @media (min-width: 768px) {
          .facts dl { grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 2.5rem; }
        }

        .carried-cols { display: grid; gap: 2.5rem; }
        @media (min-width: 768px) { .carried-cols { grid-template-columns: 1fr 1fr; gap: 4rem; } }
        .carried ul { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(255, 247, 237, 0.16); }
        .carried li { padding: 0.9rem 0; border-bottom: 1px solid rgba(255, 247, 237, 0.16); line-height: 1.45; color: var(--amber-50); }
        .foundation { margin-top: 2.5rem; font-size: 0.95rem; line-height: 1.55; color: rgba(255, 247, 237, 0.78); max-width: 46rem; }

        /* A bar chart, one row per stage, bar width = weeks / total. */
        .season-bar { max-width: 44rem; margin-top: 0.5rem; border-top: 1px solid rgba(255, 247, 237, 0.12); }
        .seg {
          display: grid; grid-template-columns: 7.5rem 1fr; align-items: center; column-gap: 0.75rem;
          padding: 0.55rem 0; border-bottom: 1px solid rgba(255, 247, 237, 0.12);
        }
        .seg::before {
          content: ""; order: 2; height: 0.95rem; border-radius: 3px;
          width: calc(var(--w) * 100%); min-width: 4px;
          background: var(--amber); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }
        .seg-label { order: 1; font-size: 0.85rem; font-weight: 700; color: #fff; }
        .season-note { margin-top: 0.9rem; font-size: 0.85rem; color: rgba(255, 247, 237, 0.72); }
        @media (max-width: 420px) { .seg { grid-template-columns: 6.25rem 1fr; } }

        .how-steps { list-style: none; margin: 1rem 0 0; padding: 0; display: grid; gap: 2.25rem; counter-reset: step; }
        @media (min-width: 768px) { .how-steps { grid-template-columns: repeat(3, 1fr); gap: 2.5rem; } }
        .how-steps li { border-top: 1px solid rgba(255, 247, 237, 0.16); padding-top: 1.25rem; }
        .how-steps p { margin: 0; line-height: 1.5; color: var(--amber-50); }
        .how-svg { width: 100%; max-width: 15rem; height: auto; display: block; margin-bottom: 1rem; fill: none; stroke: var(--amber); stroke-width: 1.6; stroke-linejoin: round; stroke-linecap: round; }
        .how-svg .fill { fill: rgba(245, 158, 11, 0.4); stroke: #fff; }
        .how-svg circle { fill: #fff; stroke: none; }
        .record { margin-top: 3.5rem; border-top: 1px solid rgba(255, 247, 237, 0.16); }
        .record > div { display: grid; grid-template-columns: 8rem 1fr; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid rgba(255, 247, 237, 0.16); }
        .record dt { font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; }
        .record dd { margin: 0; line-height: 1.5; color: var(--amber-50); }
        @media (max-width: 640px) { .record > div { grid-template-columns: 1fr; gap: 0.25rem; } }

        .close { text-align: center; padding-bottom: clamp(5rem, 12vw, 9rem) !important; }
        .close .lede, .close .continues { margin-left: auto; margin-right: auto; }
        .continues { color: rgba(255, 247, 237, 0.82); line-height: 1.55; max-width: 40rem; margin-bottom: 2.25rem; }
        .close-figure .how-svg { max-width: 11rem; margin: 0 auto 1.25rem; }
        .close-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; align-items: center; }
        .ghost {
          display: inline-flex; align-items: center; padding: 0.7rem 1.25rem; border-radius: 999px;
          border: 1px solid rgba(255, 247, 237, 0.35); color: #fff; font-weight: 600; text-decoration: none;
          transition: background 160ms ease-out, border-color 160ms ease-out;
        }
        .ghost:hover { background: rgba(255, 247, 237, 0.08); border-color: rgba(255, 247, 237, 0.6); }

        @media (prefers-reduced-motion: reduce) {
          .cap, .cell, .survey-video, .cue { transition: none; }
        }
      `}</style>
    </main>
  );
}
