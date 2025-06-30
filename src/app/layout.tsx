import type { Metadata } from "next";
import { Karla, Inconsolata } from "next/font/google";
import "./globals.css";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from '@next/third-parties/google'
import { Navbar } from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react"
import { DotPattern } from "@/components/magicui/dot-pattern"
import { getBaseMetadata } from "@/lib/seo";

const karla = Karla({
  subsets: ["latin"],
  variable: '--font-karla',
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: '--font-inconsolata',
});

export const metadata: Metadata = getBaseMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Started")
  return (
    <html lang="en">
      <body className={`bg-gray-900 text-yellow-50 ${inconsolata.variable} ${karla.variable} font-body`}>
        <div className="relative min-h-screen w-full overflow-hidden">
          <DotPattern 
            width={28} 
            height={28} 
            cx={1.5}
            cy={1.5}
            cr={1.2}
            glow={true} 
            className="text-orange-500 absolute inset-0 h-full w-full" 
          />
          <main className="flex min-h-screen flex-col items-center container mx-auto relative z-10">
            <Navbar />
            <div className="w-full mt-16">{children}</div>
            <Analytics />
          </main>
        </div>
      </body>
      <SpeedInsights />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XYZ"} />
    </html>
  );
}
