import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Connect",
  description: "Join your tribe, support farmers directly, and earn rewards for doing good with Bean You.",
  alternates: { canonical: "/connect" },
  openGraph: {
    title: "Connect | Bean You",
    description: "Join your tribe, support farmers directly, and earn rewards for doing good with Bean You.",
    url: "/connect",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
