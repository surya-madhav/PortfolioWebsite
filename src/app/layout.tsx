
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ["latin"] });
import { GoogleAnalytics } from '@next/third-parties/google'
import { Navbar } from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react"
import { DotPattern } from "@/components/magicui/dot-pattern"


export const metadata: Metadata = {
  title: "Sai Surya's Portfolio",
  description: "A portfolio website showcasing my projects and skills and experience.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rssmv.in",
    title: "Sai Surya's Portfolio",
    description: "A portfolio website showcasing my projects and skills and experience.",
    countryName: "United States",
    images: "https://www.rssmv.in/_next/image?url=%2Fimages%banner.png&w=640&q=90",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Started")
  return (
    <html lang="en">

      <body className="bg-gray-900 text-yellow-50">
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
