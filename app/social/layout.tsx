import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Social",
  description: "Bean You on social - stories, spotlights, and the people building the community.",
  alternates: { canonical: "/social/" },
  openGraph: {
    title: "Social | Bean You",
    description: "Bean You on social - stories, spotlights, and the people building the community.",
    url: "/social/",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
