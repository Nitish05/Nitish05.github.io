import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ChapterIndex from "@/components/ChapterIndex";
import Cursor from "@/components/Cursor";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  display: "swap",
});

const geistDisplay = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-display",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nitish Ravisankar Raveendran — Robotics R&D / Software",
  description:
    "Robotics software engineer. ROS 2, MoveIt, CAN bus, embedded perception, RL. Building motion systems and the firmware that runs them.",
  metadataBase: new URL("https://rrnitish.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nitish Ravisankar Raveendran",
    description: "Robotics R&D / Software — portfolio.",
    url: "https://rrnitish.com",
    siteName: "rrnitish",
    images: [
      {
        url: "/hero-poster.jpg",
        width: 1200,
        height: 630,
        alt: "Nitish Ravisankar Raveendran robotics portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitish Ravisankar Raveendran",
    description: "Robotics R&D / Software — portfolio.",
    images: ["/hero-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistDisplay.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-bone text-ink font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[200] bg-amber px-4 py-3 font-mono text-xs uppercase tracking-wider2 text-ink focus:not-sr-only"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Cursor />
          <TopNav />
          <ChapterIndex />
          {children}
          <Footer />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
