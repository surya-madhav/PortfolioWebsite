import Image from "next/image";
import HeroSection from "./components/HeroSection";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between container mx-auto">
      <div className="container mx-auto py-4 px-4"><HeroSection/></div>
    </main>
  );
}
