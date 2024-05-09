`use client`
import HeroSection from "./components/HeroSection";
import React from "react";
import Projects from "./components/Projects";
export default function Home() {
  return (
    
      
      <div>
        <div className="container mx-auto py-4 px-4">
          <HeroSection />
        </div>
        <div className="container mx-auto py-4 px-4">
          <Projects /></div>
      </div>
  );
}
