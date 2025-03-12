`use client`
import HeroSection from "./components/HeroSection";
import React from "react";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <div>
      <section id="about" className="container mx-auto py-4 px-4 pt-24 rounded-xl">
        <div className="backdrop-blur-sm bg-gray-900/40 rounded-xl p-6">
          <HeroSection />
        </div>
      </section>
      
      <section id="projects" className="container mx-auto py-4 px-4 pt-20">
        <div className="backdrop-blur-sm bg-gray-900/40 rounded-xl p-6">
          <Projects />
        </div>
      </section>
      
      <section id="skills" className="container mx-auto py-4 px-4 pt-20 pb-20">
        <div className="backdrop-blur-sm bg-gray-900/40 rounded-xl p-6">
          <Skills />
        </div>
      </section>
    </div>
  );
}
