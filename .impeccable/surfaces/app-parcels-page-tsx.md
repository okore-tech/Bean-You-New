---
version: 1
slug: "app-parcels-page-tsx"
primary_target: "app/parcels/page.tsx"
related_targets: ["components/Header.tsx","app/page.tsx","components/Footer.tsx"]
---

Scope: /parcels — the 1m² Parcels legacy story. Visitor mode: Experience (reading comprehension kept intact).

Audience: adopters checking what they hold; visitors who find the site after the programme closed; partners and the curious.
Job: understand what the digital twin and the 1m² plots were, how adoption worked, and that the programme closed in August 2026 with every adoption honoured.
Action: none required. Exits: the Bean You app (SmartGetAppButton), /connect. Adopters with questions: info@beanyou.com.
Proof / content: public/images/kahirofarm.webp (real aerial of the land that was gridded); Footer FAQ facts; roadmap dates (2024 pilots, 2025 launch). Drone footage slot DRONE_VIDEO_SRC awaits the user's file.
Constraints: no live-offer copy anywhere; prices and payments in past tense; no fabricated platform UI or plot data; the reduced-motion path must tell the same story in flow.

Direction: Survey Overlay (seed 6f9d3677, dealt index 1). One pinned full-bleed aerial; the survey grid is drawn onto the field by scroll (clip-path sweeps, horizontals then verticals, on a perspective plane); one cell is isolated; the land zooms into it. Five caption phases keyed off --p.
Memorable moment: the grid being drawn onto real ground, then one square lighting up.
QA hook: /parcels?survey=<0..1> pins the survey at a progress value for headless captures.

Unresolved: drone footage; whether the app's in-app "Claim Your Plot" symbolic-plot feature is affected by the closure (left untouched); @beanyou.com mailboxes vs the new domain.
