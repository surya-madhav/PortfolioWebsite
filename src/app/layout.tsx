
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ["latin"] });
import { GoogleAnalytics } from '@next/third-parties/google'
import { Navbar } from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react"
import { DotBackground } from "@/components/ui/dot-background"


export const metadata: Metadata = {
  title: "Sai Surya's Portfolio",
  description: "A portfolio website showcasing my projects and skills.",
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
        <DotBackground opacity={0.15} width={28} height={28} cr={1} className="min-h-screen">
          <main className="flex min-h-screen flex-col items-center container mx-auto">
            <Navbar />
            <div className="w-full mt-16">{children}</div>
            <Analytics />
          </main>
        </DotBackground>
      </body>
      <SpeedInsights />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XYZ"} />
    </html>
  );
}
