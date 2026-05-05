import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ChapterIndex from "@/components/ChapterIndex";
import Cursor from "@/components/Cursor";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nitish Ravisankar Raveendran — Robotics R&D / Software",
  description:
    "Robotics software engineer. ROS 2, MoveIt, CAN bus, embedded perception, RL. Building motion systems and the firmware that runs them.",
  metadataBase: new URL("https://rrnitish.com"),
  openGraph: {
    title: "Nitish Ravisankar Raveendran",
    description: "Robotics R&D / Software — portfolio.",
    url: "https://rrnitish.com",
    siteName: "rrnitish",
    locale: "en_US",
    type: "website",
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
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-bone text-ink font-sans antialiased">
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
