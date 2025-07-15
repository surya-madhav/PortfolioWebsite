import { Metadata } from "next";
import dynamic from 'next/dynamic';
import HeroSection from "./components/HeroSection";
import Projects from "./components/Projects";
import { generatePersonSchema, generateWebsiteSchema } from "@/lib/seo";

const Skills = dynamic(() => import('./components/Skills'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-900/50 rounded-lg animate-pulse" />
  ),
});

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://rssmv.in',
  },
};

export default function Home() {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <div>
        <section id="about" className="container mx-auto py-4 px-4 pt-24">
          <HeroSection />
        </section>
        
        <section id="projects" className="container mx-auto py-4 px-4 pt-20">
          <Projects />
        </section>
        
        <section id="skills" className="container mx-auto py-4 px-4 pt-20 pb-20">
          <Skills />
        </section>
      </div>
    </>
  );
}
