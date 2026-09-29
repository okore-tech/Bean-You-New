---
name: Bean You
description: Warm orange coffee-community world; the /parcels story extends it on deep brown with an amber survey grid.
colors:
  brand-orange: "#BD570F"
  brand-deep: "#3C2100"
  brand-accent: "#C85A17"
  amber: "#F59E0B"
  amber-paper: "#FFF7ED"
  cta-yellow: "#FACC15"
  cta-orange: "#F97316"
  header-orange: "#F97316"
  header-orange-scrolled: "#EA580C"
  white: "#FFFFFF"
  cta-ink: "#000000"
  pill-green: "#0F5132"
  glass-fill: "rgba(255,255,255,0.10)"
  glass-edge: "rgba(255,255,255,0.15)"
  hairline: "rgba(255,247,237,0.16)"
  scrim-deep: "rgba(60,33,0,0.62)"
typography:
  display:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 5.2vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 4.2vw, 3.2rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  hairline-bar: "3px"
  focus: "4px"
  xl: "1rem"
  2xl: "1rem"
  3xl: "1.5rem"
  pill: "999px"
spacing:
  hairline-row: "0.9rem"
  cta-y: "0.625rem"
  cta-x: "1.25rem"
  section-gutter: "1.25rem"
  section-old: "5rem"
  section-block: "clamp(3.5rem, 8vw, 7rem)"
  measure: "62rem"
  measure-old: "72rem"
components:
  button-primary:
    backgroundColor: "linear-gradient(to right, {colors.cta-yellow}, {colors.cta-orange})"
    textColor: "{colors.cta-ink}"
    rounded: "{rounded.pill}"
    padding: "{spacing.cta-y} {spacing.cta-x}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.25rem"
  button-ghost-hover:
    backgroundColor: "rgba(255,247,237,0.08)"
  button-nav-pill:
    backgroundColor: "{colors.white}"
    textColor: "{colors.pill-green}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
  card-glass:
    backgroundColor: "{colors.glass-fill}"
    textColor: "{colors.white}"
    rounded: "{rounded.3xl}"
    padding: "1.75rem"
  chip-status:
    backgroundColor: "{colors.scrim-deep}"
    textColor: "{colors.amber-paper}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.9rem"
  modal:
    backgroundColor: "{colors.brand-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.2xl}"
    padding: "1.25rem"
---

# Design System: Bean You

## Overview

**Creative North Star: "The Farm at Golden Hour"**

Bean You is a warm, saturated orange world: the page ground is brand orange, text is white, and every call to action is a yellow-to-orange gradient pill that presses like a physical button. Cards are frosted glass over that ground; section edges are cut on a diagonal. Poppins carries everything, from 400 body to 800 display. The mood is a sunlit coffee farm, not a fintech dashboard.

The /parcels story page is the current standard for how the world extends. It keeps the same materials (brand orange, deep brown, Poppins 800) but drops the ground to deep brown so the amber survey grid and the one real photograph carry the page. Chrome is reduced to hairlines, a `<dl>` of facts, and authored single-stroke SVG diagrams. Where older pages and /parcels differ, this document records the difference as incumbent versus current standard rather than pretending one rule covers both.

**Key Characteristics:**
- Orange ground, white type, one accent family (yellow, amber, orange) doing all the work
- Gradient pill CTAs with a press/translate on `:active` are the one button
- Glass over ground on older pages; hairlines over ground on /parcels
- Poppins only; 800 for display with tight negative tracking
- Motion is either scroll-driven (the survey) or one-shot reveal (AOS `once: true`); nothing loops except two small cues

## Colors

A single warm hue family, from yellow through amber and orange to deep brown, on which white text sits.

### Primary
- **Brand Orange** (`brand-orange`): the body ground (`app/globals.css`), the Roadmap section, the header's base tone (Tailwind `orange-500`, close relative), and the /parcels facts strip.
- **Deep Brown** (`brand-deep`): section ground on the home page ("Identify Your Interests", "Join the Community"), every modal panel, and the whole /parcels page ground.
- **Brand Accent** (`brand-accent`): declared in `@theme` as `--color-brand-accent`. It is defined but no component currently reads it; kept because it is the declared brand token.

### Secondary
- **Amber** (`amber`): the /parcels line colour. Survey grid strokes, the isolated 1m² cell fill, the `.how-svg` diagram stroke, the season bar, the status dot, the selection highlight, and the focus ring. On older pages the same hue appears as Tailwind `amber-300` in the header pill's gradient rim and `amber-200` step labels.
- **CTA Yellow → CTA Orange** (`cta-yellow` → `cta-orange`): the primary button gradient (`from-yellow-400 to-orange-500`; a lighter `from-yellow-300 to-orange-400` sibling is used in `SmartGetAppButton` and the value section). Text on it is black.

### Neutral
- **White** (`white`): all headings, body text on the orange ground, the header pill face, the isolated cell's stroke, and diagram accent points.
- **Amber Paper** (`amber-paper`): the /parcels body text colour and the tint for every hairline and ghost border on that page (`rgba(255,247,237, α)`).
- **Glass Fill / Glass Edge** (`glass-fill`, `glass-edge`): `bg-white/10` and `border-white/15` on cards, modals' rings, and drawer panels.
- **Hairline** (`hairline`): the /parcels list and record rule, `rgba(255,247,237,0.16)`; the facts strip uses 0.28 on orange, the season chart 0.12.
- **Scrim Deep** (`scrim-deep`): deep brown at 0.62 behind the status chip; the caption veil is the same brown graded 0.8 → 0.

### Incumbent-only colours (not carried forward)
Older pages introduce colours the current standard does not: `text-yellow-300` headings on the home page, a dark `#2a150e → #793A17 → #F3B019` gradient ground on Explore and the value section, white cards with `#C25500` text and a red `from-red-700 to-red-500` band on Connect, and `#F4A261`/`#E76F51` carousel arrows. Treat them as page-local, not system.

### Named Rules
**The One Hue Rule.** Every colour on a surface belongs to the yellow–amber–orange–brown family or is white. New surfaces add tints of these, never a second hue.

**The Amber Line Rule.** On /parcels, amber is a line colour: strokes, hairlines, the cell, the bar. It fills nothing larger than a 1m² cell or a 0.95rem bar.

## Typography

**Display Font:** Poppins (loaded via `next/font/google`, weights 400/600/700/800, applied on `<body>`)
**Body Font:** Poppins
**Label/Mono Font:** none distinct; labels are Poppins 700 uppercase with tracking

**Character:** One geometric face at four weights. Display and headline are 800 with tight negative tracking; body is 400 with generous leading. Numbers in the facts and record use `tabular-nums`.

### Hierarchy
- **Display** (800, `clamp(1.9rem, 5.2vw, 3.6rem)`, 1.02, -0.03em): the survey captions (`.cap-title`) on /parcels. Home H1 is the incumbent equivalent at `text-5xl/[1.05] md:text-7xl/[1.02] font-extrabold tracking-tight`, filled with a vertical amber-200 → white → amber-200 gradient via `bg-clip-text`; /parcels uses flat white instead.
- **Headline** (800, `clamp(1.9rem, 4.2vw, 3.2rem)`, 1.04, -0.03em): /parcels section `h2`. Older pages use `text-3xl md:text-4xl font-bold` or `font-extrabold` with default tracking.
- **Title** (700, 1.1rem, -0.01em): `h3` within /parcels steps and columns. Older cards use `text-[18px]–[22px] font-extrabold`.
- **Lede** (400, `clamp(1.05rem, 1.5vw, 1.25rem)`, 1.55): first paragraph under a headline, max-width 40rem, amber-paper.
- **Body** (400, 1rem, 1.5): list rows and step copy; `text-orange-100 text-lg` on older sections.
- **Label** (700, 0.72rem, 0.08em, uppercase): `dt` in the facts strip. The scroll cue is a sibling at 600 / 0.75rem / 0.06em; the status chip is 600 / 0.78rem / 0.01em, sentence case.

### Named Rules
**The Eight-Hundred Rule.** Anything that reads as a headline is Poppins 800 with negative tracking (-0.03em). 700 is for titles and labels, never for headlines.

**The Flat White Headline Rule (current standard).** Headlines on /parcels are flat `#fff`. The gradient-filled H1 on the home page is incumbent; do not extend it to new surfaces.

## Layout

Single column, centred. /parcels sets `padding-inline: max(1.25rem, calc((100% - 62rem) / 2))` so the measure is 62rem with a 1.25rem phone gutter; sections are `clamp(3.5rem, 8vw, 7rem)` tall in block. Older pages use `max-w-6xl` (72rem) or `max-w-7xl` (80rem) with `px-4` and `py-20`.

Grids are two-up at 768px and above (`.carried-cols`, `.facts dl` moves 2 → 3 columns), and the three "How it worked" steps go to `repeat(3, 1fr)` at 768px. The record `<dl>` is `8rem 1fr` and collapses to one column under 640px. The season chart is a `7.5rem 1fr` label/bar grid, `6.25rem` under 420px.

The survey stage is `position: sticky; top: 0; height: 100svh` inside a `520svh` outer track; the header is 5rem (6rem at ≥768px) and the stage pulls up under it with a negative margin. Every visual in the survey derives from one CSS custom property `--p` (0..1) set from scroll progress; sub-progress values (`--draw-h`, `--draw-v`, `--cell`, `--zoom`) are `clamp()`ed windows of `--p`.

Breakpoints observed: 420, 480, 640, 768 (Tailwind `md`), plus a container query `(max-aspect-ratio: 4/5)` on the stage for portrait phones.

**The One Track Rule.** The page has one scroll. Pinned storytelling happens in a single sticky stage; nothing else on the site pins.

## Elevation & Depth

Hybrid. Older pages lift glass cards and buttons with soft black shadows and backdrop blur; /parcels is flat and conveys depth with the photograph, one scrim gradient and a `drop-shadow` glow on the survey grid so amber lines stay legible over foliage.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 15px 50px rgba(0,0,0,0.35)`): glass cards in the value section; `0 14px 44px` / `0 18px 54px` siblings on Explore carousels.
- **Glass card (global class)** (`box-shadow: 0 4px 20px rgba(0,0,0,0.3)`, hover `0 8px 30px rgba(0,0,0,0.4)` with `translateY(-4px)`): `.glass-card` in `globals.css`.
- **Button rest / pressed** (`0 8px 20px rgba(0,0,0,0.25)` → `0 4px 12px rgba(0,0,0,0.28)` with `translateY(2px)`): the Press3D pill.
- **Header pill face** (`0 8px 18px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.8)`): with a `::before` shadow plate offset 3px below.
- **Scrolled header** (`0 8px 24px rgba(0,0,0,0.18)` + `backdrop-filter: saturate(1.05) blur(6px)`).
- **Grid legibility** (`filter: drop-shadow(0 0 1.5px rgba(40,20,0,0.85))`): on the survey SVG; the cell adds `drop-shadow(0 0 10px rgba(245,158,11,0.95))`.
- **Text over photograph** (`text-shadow: 0 2px 18px rgba(0,0,0,0.35)` on titles, `0 1px 10px` on body).

### Named Rules
**The Shadow-Is-Soft Rule.** Every shadow is black at ≤0.45 alpha with a blur at least 2.5× its offset. No hard offset shadows anywhere.

**The Flat Story Rule (current standard).** Content sections on /parcels carry no box-shadow. Depth comes from hairlines, tint steps of amber paper, and the photograph.

## Shapes

Pills and soft rectangles. Every button and chip is fully round (`999px`). Cards are `1rem` (`rounded-xl` and `rounded-2xl` both resolve to 1rem because `@theme` sets `--radius-xl: 1rem`), `1.5rem` (`rounded-3xl`), or `26px` on roadmap cards. Focus rings on /parcels get `4px`; the season bar `3px`.

Diagonal cuts are a house device: `.clip-diagonal` (`polygon(0 0, 100% 0, 100% 94%, 0% 100%)`, 98% on mobile), `.card-mask` and `.hero-img-mask` in `globals.css`, and the Explore backdrop's `[clip-path:polygon(0_0,100%_8%,100%_100%,0_92%)]`. On /parcels the only clip is functional: the grid is clipped to the field's outline so it never runs over roofs or trees.

Borders are hairlines only: `1px` white or amber-paper at 0.12–0.35 alpha. No 2px borders except the isolated cell's white stroke and the dashed placeholder frames on Connect (incumbent).

Authored SVG diagrams (`.how-svg`) are one stroke, one weight: `stroke-width: 1.6`, round joins and caps, `fill: none`, amber stroke, white for the single accent circle, amber at 0.4 alpha for the one filled cell.

## Components

### Buttons
Tactile pills that press.
- **Shape:** fully round (`999px`)
- **Primary (Press3D):** `from-yellow-400 to-orange-500` gradient, black 600 text, `px-5 py-2.5`, `shadow-[0_8px_20px_rgba(0,0,0,0.25)]`, `ring-1 ring-black/5`. Home and Connect use `px-6 py-3` with the same gradient. `SmartGetAppButton` uses the lighter `yellow-300 → orange-400` pair and a slightly deeper shadow.
- **Hover / Active:** `hover:scale-[1.02]` (up to 1.05 on older pages), `active:translate-y-[2px]` with the shadow shortening to `0 4px 12px`; `transition-transform 150ms ease-out`.
- **Ghost (/parcels):** transparent, `1px rgba(255,247,237,0.35)` border, white 600 text, `0.7rem 1.25rem`; hover fills `rgba(255,247,237,0.08)` and lifts the border to 0.6 alpha over 160ms.
- **Ghost (older):** `bg-white/10 text-yellow-200 border-white/20`, hover `bg-white/15`.
- **Header pill:** a 2px gradient rim (`amber-300 → orange-400 → #BD570F`) around a white face with green (`#0F5132`) text, a `::before` shadow plate 3px below, an amber colour sweep across the face on hover (`0.45s cubic-bezier(.2,.8,.2,1)`), and a two-line label swap (default rises out, hover copy rises in, `0.25s`).

Note: `Press3DButton` is defined three times (`components/RoadmapSection.tsx`, `components/BeanYou_RoadmapAndValue.tsx`, `components/SmartGetAppButton.tsx`) with near-identical classes. The values above are the shared ones.

### Chips
- **Status chip (/parcels):** deep-brown scrim at 0.62 with `backdrop-filter: blur(6px)`, `1px rgba(255,247,237,0.22)` border, pill, `0.5rem 0.9rem`, 600 / 0.78rem, with a 0.5rem amber dot ringed at 0.25 alpha. Under 480px the leading words are hidden and only the status remains.
- **Year pill (Roadmap):** 800 / 2xl–4xl white on a pill with `ring-2 ring-white/20` and a `0 10px 30px` shadow.

### Cards / Containers
- **Corner Style:** `1.5rem` (value cards, Explore carousels), `26px` (roadmap cards), `1rem` (modals, image frames)
- **Background:** `bg-white/10` with `backdrop-blur-xl` (roadmap), `bg-white/5` (Explore), or the `.glass-card` class (`rgba(255,255,255,0.08)` + `blur(10px)`)
- **Shadow Strategy:** card lift; hover lifts 4px (see Elevation)
- **Border:** `1px white/15` (or `white/18` on roadmap)
- **Internal Padding:** `p-5 sm:p-6 md:p-7` (1.25–1.75rem)
- **Current standard (/parcels):** no cards. Content sits directly on the deep-brown ground in hairline-ruled lists.

### Hairline Lists and the Facts `<dl>` (/parcels)
- **Lists:** `list-style: none`, a `1px rgba(255,247,237,0.16)` top rule, each row `0.9rem 0` with the same rule below, amber-paper text at 1.45 leading.
- **Facts strip:** on brand orange, a `<dl>` grid (2 → 3 columns) with 0.28-alpha hairlines; `dt` is the label style, `dd` is 600 white with `tabular-nums`.
- **Record:** `dt` 800 white in an `8rem` column, `dd` amber-paper.
- **Season bar:** one row per stage, label in a `7.5rem` column, an amber bar `0.95rem` tall with `3px` radius whose width is `calc(var(--w) * 100%)`.

### Inputs / Fields
None on the sampled surfaces. Focus treatment for interactive elements: `outline: 2px solid amber; outline-offset: 3px` on /parcels; `focus-visible:ring-2 ring-amber-300` or `ring-white/60` on older pages.

### Navigation
- **Header:** fixed, `bg-orange-500` (Tailwind), white 600 / `text-sm` links with `hover:underline underline-offset-4`, active route underlined. Scrolled state switches to `orange-600` with a soft shadow and blur. The 1m² Parcels action is the header pill described above.
- **Mobile:** burger at `md` and below; a `rounded-2xl` glass drawer (`from-white/15 to-white/5`, `backdrop-blur-2xl`, `ring-1 ring-white/20`) slides in from the top over 200ms behind a `bg-black/45` blurred backdrop.
- **Footer:** layered radial/linear gradients of orange-700, red-700 and rose-900 at ≤0.55 alpha, `backdrop-blur-2xl`, white text at 0.8–0.9 alpha, orange-200 hover links, and a centre-fading hairline divider.

### The Survey Stage (signature, /parcels)
One `100svh` sticky stage over a `520svh` track. Layers, bottom to top: the Kahiro aerial (`object-position: 52% 58%`), an optional drone `<video>` that fades in over 900ms only after `canplay`, the survey grid on a perspective plane (`rotateX(54deg) rotateZ(-11deg)`) clipped to the field polygon, a bottom veil, the status chip, the caption stack, and the scroll cue. The grid is 48 × 28 cells drawn in amber at `1.25px` non-scaling stroke; horizontals draw left-to-right over `--p` 0.12–0.34, verticals top-to-bottom over 0.24–0.46, the cell appears over 0.56–0.68, and the land zooms to 2.8× (transform-origin `56.6% 53.3%`) over 0.72–0.98 while the mesh fades to 40%. Five captions swap by phase with a 420ms `cubic-bezier(0.16, 1, 0.3, 1)` rise. `?survey=<0..1>` pins the stage for capture; `?survey=static` renders the reduced-motion layout.

### Modals
- `bg-[#3C2100]`, `rounded-2xl`, `shadow-2xl ring-1 ring-white/10`, over a `bg-black/60 backdrop-blur-sm` scrim; QR panels are white `rounded-xl` inside.

## Do's and Don'ts

### Do:
- **Do** keep the ground orange (`brand-orange`) or deep brown (`brand-deep`) and the type white; a new surface picks one of the two.
- **Do** use the gradient pill for every primary action, with `active:translate-y-[2px]` and the shortened shadow.
- **Do** set headlines in Poppins 800 with -0.03em tracking and flat white.
- **Do** honour `prefers-reduced-motion`: /parcels renders a still survey at `--p: 0.64` with captions in document flow; older pages disable their loops and AOS transitions under the same media query.
- **Do** use the Kahiro aerial (`public/images/kahirofarm.webp`) as the only real land asset, and leave the drone slot (`DRONE_VIDEO_SRC`, `public/videos/kahiro-drone.mp4`, 720p H.264 faststart) null until footage exists.
- **Do** draw icons and diagrams as authored SVG at one stroke and weight (`1.6`, round joins) on new surfaces.
- **Do** keep hairlines at 1px in amber paper at 0.12–0.35 alpha on brown, 0.28 on orange.

### Don't:
- **Don't** put gradients on the photograph or the survey grid; the only gradient over the land is the bottom veil behind captions.
- **Don't** add cards, box-shadows or glass to /parcels-style story sections; the current standard is hairlines on ground.
- **Don't** introduce a second hue. Red, green and blue appear nowhere in the current standard (the header pill's green text and Connect's red band are incumbent).
- **Don't** use emoji as icons on new surfaces. Connect, Face of Bean You and the value section use them (incumbent); /parcels uses authored SVG.
- **Don't** hard-offset a shadow; every shadow is soft and black.
- **Don't** pin more than one stage per page or nest a second scroll track inside the survey.
