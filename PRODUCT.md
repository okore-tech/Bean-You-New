# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Community members ("the tribe")** — coffee lovers who use the Bean You® app to join value-aligned communities, earn tokens, and connect with the farm behind their coffee.
- **ESG-minded adopters** — people who adopted symbolic 1m² coffee plots on the parcels platform (2025–Aug 2026). Their adoptions are honoured; they may return to the site to understand what they hold.
- **Partners and the curious** — cafés, brands, and visitors who find the site now and want to understand what the digital-twin farm programme was and how it worked.
- **Beneficiaries** — coffee farmers in Kenya (Asili farms, Kahiro farm) supported through the Asili Foundation.

## Product Purpose

Bean You® connects coffee consumers worldwide to coffee farmers in Kenya through an app, a café network, and community "tribes" organised by shared values. Success is a visitor who feels they belong to something real behind their cup, and who can act on it (download the app, join a tribe, support a farm).

## Positioning

Bean You® built a **digital twin of real Kenyan coffee farms** and divided the land into **1m² plots — each equivalent to one coffee crop**. Adopters connected to a specific square metre of real ground, with ESG rights and privileges attached, and could watch that crop's life cycle through livestreams. The programme called this **iRWA — intangible Real World Assets**. The mechanism a neighbour could not truthfully copy: a named, mapped square metre of a working farm, tied to a person.

## Operating Context

- Marketing site (this codebase): Next.js 15 on Vercel, domain `irwapilot.digital` (formerly `beanyou.com`).
- Bean You® mobile app (iOS / Android) — tokens, tribes, rewards, courses.
- Café network; partner brands; CCEG (cceg.org.uk) as tech/ESG partner; Asili Foundation (not-for-profit ESG organisation registered in Kenya, Board of Trustees) distributing funds to farmers for health, education and technology.
- The parcels platform lived at `parcels.beanyou.com` (a separate web app). It is **closed** and must no longer be linked from this site.

## Capabilities and Constraints

- **Parcels / 1m² programme status (confirmed):** closed in **August 2026**. No new adoptions. **Existing adoptions are honoured.** Public copy must state this plainly; wording is the user's, not invented.
- All external links to `parcels.beanyou.com` are removed. The header "ESG Invest" action and the footer "BUY ESG" FAQ (which instruct visitors to purchase) are retired from their buy-intent roles; the story page replaces them as the destination.
- Historic programme facts (may be stated as past tense, not as current offers): adoption from ~500 KSH (under US$4); payment via KSH, cards, M-Pesa, crypto; selection by farm → zoom to plot → purchase ESG rights; livestreams of the crop.
- Brand name is **unchanged**: "Bean You®". Only the web domain changed.
- **Undecided:** whether `@beanyou.com` mailboxes migrate to the new domain (no MX on `irwapilot.digital` yet). Contact addresses stay as-is until decided.

## Brand Commitments

- Name and mark: **Bean You®**, logo at `public/images/logo.png`.
- Established visual world in code (binding for extensions): brand orange `#BD570F`, deep brown `#3C2100`, accent `#C85A17`; warm amber→orange gradient pill CTAs; glass cards; Poppins (400/600/700/800) via `next/font/google`; body ground is the brand orange; diagonal section cuts.
- Voice: warm, direct, first-person plural ("we connect…"), slogan "Find your Tribe", "It's not just coffee, it's an expression of yourself."
- Asili Coffee is a real brand asset (`public/images/asili.png`).

## Evidence on Hand

- `public/images/kahirofarm.webp` — real aerial drone photograph of Kahiro farm showing coffee crop rows (the land that was gridded into 1m² plots). Primary visual truth for the story.
- `public/images/token.png`, `token2.png`, `globe.png`, `blockchain2.png` — existing brand illustrations used in the roadmap.
- Footer FAQ copy (components/Footer.tsx) — the programme's own explanation of iRWA, benefits, process, price, and payment. Source of truth for how it worked.
- Roadmap (components/BeanYou_RoadmapAndValue.tsx): 2024 Asili farm pilots (IoT, 5G, blockchain on 5 farms); 2025 iRWA launch "up to 15,000 acres".
- **To be supplied by the user:** drone / on-farm video (opening sequence). Not yet in the repo — build a labelled slot; never fabricate footage.
- **Absent:** no screenshots of the parcels platform UI. Do not fabricate app screens; the story is told on the real land photograph.

## Product Principles

1. **Tell the truth about status first.** The programme closed; adopters are honoured. No page may read as a live offer.
2. **Real ground over abstraction.** The story is anchored on the actual farm photograph and real footage, not stock or invented UI.
3. **Honour the people who adopted.** The legacy page is a record, warm and complete, not an apology or a pitch.
4. **One brand, one world.** New surfaces extend the established orange world; they do not restyle it.
5. **Motion explains, then delights.** Animation on the story page must make the farm→twin→plot relationship legible before it decorates.
