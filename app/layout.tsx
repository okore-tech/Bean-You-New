import "@/app/globals.css";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"]
});

export const metadata = {
  title: "Bean You - Find Your Tribe",
  description: "Explore communities to learn, trade, invest, and connect."
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
