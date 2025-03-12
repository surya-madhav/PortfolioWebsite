import HeroSection from "./components/HeroSection";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

export default function Home() {
  return (
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
  );
}
