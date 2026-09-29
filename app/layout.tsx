import "@/app/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StyledJsxRegistry from "@/app/styled-jsx-registry";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://irwapilot.digital"),
  title: {
    default: "Bean You - Find Your Tribe",
    template: "%s | Bean You",
  },
  description: "Explore communities to learn, trade, invest, and connect.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Bean You",
    type: "website",
    url: "/",
    title: "Bean You - Find Your Tribe",
    description: "Explore communities to learn, trade, invest, and connect.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bean You - Find Your Tribe",
    description: "Explore communities to learn, trade, invest, and connect.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <span hidden dangerouslySetInnerHTML={{ __html: `<!-- IMPECCABLE DIRECTION CONTRACT /parcels seed 6f9d3677
THESIS: A closed programme told on the land it was drawn on; refuses the hero-plus-timeline-cards archive scroller. One aerial photograph the scroll surveys.
OWN-WORLD: Bean You's established world: brand orange #BD570F, deep brown #3C2100, amber #F59E0B, Poppins 800 display. Two materials: the Kahiro aerial photograph and one strict 1m2 cell grid in amber. No gradients on the land.
STORY: real ground; it becomes a twin; one square metre isolated; what it carried; the close: closed August 2026, adoptions honoured; leave to the app or the tribe.
FIRST VIEWPORT: full-bleed aerial (drone video when supplied, photo now), ungridded; caption low-left "This is Kahiro farm, Kenya."; status line top-right; scroll cue; no grid yet.
FORM: Survey Overlay, #1 on the ranked list, dealt index 1, seed 6f9d3677. Code-led.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
-->` }} />
        <StyledJsxRegistry>
        <Header />
        <div className="h-20 md:h-24" />
        {children}
        <Footer />
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
