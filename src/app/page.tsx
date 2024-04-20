import Image from "next/image";
import HeroSection from "./components/HeroSection";
import React from "react";
import { Navbar } from "./components/Navbar";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center container mx-auto">
      <Navbar />
      <div className="container mx-auto py-4 px-4 mt-32">
        <HeroSection /></div>
    </main>
  );
}
