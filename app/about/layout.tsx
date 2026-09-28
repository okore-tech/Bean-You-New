import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Bean You - connecting coffee lovers, farmers, and communities across the value chain.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About Bean You | Bean You",
    description: "The story behind Bean You - connecting coffee lovers, farmers, and communities across the value chain.",
    url: "/about/",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
