import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Where Bean You is heading - product milestones, community growth, and what ships next.",
  alternates: { canonical: "/roadmap/" },
  openGraph: {
    title: "Roadmap | Bean You",
    description: "Where Bean You is heading - product milestones, community growth, and what ships next.",
    url: "/roadmap/",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
