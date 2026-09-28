import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Explore Communities",
  description: "Discover Bean You communities to learn, trade, invest, and connect around coffee and culture.",
  alternates: { canonical: "/explore/" },
  openGraph: {
    title: "Explore Communities | Bean You",
    description: "Discover Bean You communities to learn, trade, invest, and connect around coffee and culture.",
    url: "/explore/",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
