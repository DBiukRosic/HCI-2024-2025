import Image from "next/image";
import Button from "@/components/button";

export default function GuidesSection() {
  return (
    <section className="w-full bg-brand-orange-200 dark:bg-brand-orange-300/70">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12 lg:py-20">
        {/* Left: image */}
        <div className="relative w-80 h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg mx-auto">
          <Image
            src="/hero_guides_tips/car_guide.jpg"
            alt="Car maintenance illustration"
            fill
            className="object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
            priority
          />
        </div>

        {/* Right: text + button */}
        <div className="flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
          <h2 className="text-2xl lg:text-3xl font-bold font-urbanist text-brand-blue-500 dark:text-brand-blue-50">
            You can do it yourself!
          </h2>
          <p className="text-base lg:text-lg text-brand-blue-400 dark:text-brand-blue-300/80">
            Discover essential car care tips and expert guides for maintaining your vehicle. 
            From quick fixes to in-depth advice, explore our comprehensive resources 
            to keep your car running smoothly and reliably. Empower yourself with 
            the knowledge you need for optimal vehicle performance.
          </p>
          <div className="pt-2">
            <Button blue showIcon href="/tutorials">
              Explore our tutorials
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}