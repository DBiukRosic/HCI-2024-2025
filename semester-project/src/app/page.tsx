import HeroSection from "./sections/HeroSection";
import GuidesSection from "./sections/GuidesSection";
import ServiceSection from "./sections/ServiceSection";
import TestimonialsSection from "./sections/TestimonialSection";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center">
      <HeroSection />
      <GuidesSection />
      <ServiceSection />
      <TestimonialsSection />
    </main>
  );
}