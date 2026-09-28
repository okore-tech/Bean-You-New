import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Face of Bean You",
  description: "Meet the ambassadors and spotlight voices representing Bean You and their communities.",
  alternates: { canonical: "/face-of-bean-you/" },
  openGraph: {
    title: "Face of Bean You | Bean You",
    description: "Meet the ambassadors and spotlight voices representing Bean You and their communities.",
    url: "/face-of-bean-you/",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
