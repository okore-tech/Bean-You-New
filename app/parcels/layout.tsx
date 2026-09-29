import type { Metadata } from "next";
import type { ReactNode } from "react";

const description =
  "How Bean You made a digital twin of real Kenyan coffee farms and divided the land into one-square-metre plots — and what adopters held. The programme closed in August 2026; every adoption is honoured.";

export const metadata: Metadata = {
  title: "The 1m² Parcels",
  description,
  alternates: { canonical: "/parcels" },
  openGraph: {
    title: "The 1m² Parcels | Bean You",
    description,
    url: "/parcels",
    images: [{ url: "/images/kahirofarm.webp", width: 2000, height: 1125, alt: "Aerial photograph of Kahiro farm, Kenya" }],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
