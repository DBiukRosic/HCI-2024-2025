import Image from "next/image";
import Button from "@/components/button";

export default function ServicesSection() {
  return (
    <section className="w-full bg-brand-blue-200 dark:bg-brand-blue-400">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12 lg:py-20">
        {/* Left: text */}
        <div className="flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
          <h2 className="text-2xl lg:text-3xl font-bold font-urbanist text-brand-orange-400 dark:text-brand-orange-50">
            Our Services
          </h2>
          <p className="text-base lg:text-lg text-brand-blue-500 dark:text-brand-orange-50/80 max-w-xl">
            From routine maintenance like oil changes and tire rotations to 
            advanced diagnostics and repairs, we offer a complete range of 
            automotive services. Our expert team ensures your car is safe, 
            reliable, and performing at its best.
          </p>
          <div className="pt-2">
            <Button orange showIcon href="/car_repair_topics">
              Explore our services
            </Button>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg mx-auto order-first lg:order-last">
          <Image
            src="/hero/auto-repair-shop.jpg"
            alt="Car services illustration"
            fill
            className="object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
            priority
          />
        </div>
      </div>
    </section>
  );
}