//import Link from "next/link";
import HeroSection from "./sections/HeroSection";
import GuidesSection from "./sections/GuidesSection";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center">
      <HeroSection />
      <GuidesSection />
    </main>
  );
}