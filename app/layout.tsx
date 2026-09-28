import "@/app/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beanyou.com"),
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
        <Header />
        <div className="h-20 md:h-24" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
