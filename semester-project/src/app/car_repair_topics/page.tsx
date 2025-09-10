import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/button";

export const metadata: Metadata = {
  title: "Our Services • CAR(E)",
  description: "Explore a wide range of car repair services from CAR(E).",
};

type Topic = {
  slug: string;     // folder name     
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

const TOPICS: Topic[] = [
  {
    slug: "maintenance",
    title: "Maintenance",
    description:
      "Keep your car healthy with routine service and preventative care.",
    bullets: [
      "Oil & filter changes",
      "Tire rotation & alignment",
      "Battery & fluids check",
      "Scheduled inspections",
    ],
    image: "/services/maintenance.jpg",
    imageAlt: "Mechanic performing routine maintenance",
  },
  {
    slug: "efficiency_and_performance",
    title: "Efficiency & Performance",
    description:
      "Improve fuel economy and throttle response with targeted upgrades.",
    bullets: [
      "Air intake & filters",
      "ECU diagnostics",
      "Exhaust & emissions",
      "Spark plugs & ignition",
    ],
    image: "/services/efficiency.jpg",
    imageAlt: "Engine bay showing performance components",
  },
  {
    slug: "safety_and_reliability",
    title: "Safety & Reliability",
    description:
      "Fix critical systems to stay safe and avoid unexpected breakdowns.",
    bullets: [
      "Brake pads & rotors",
      "Steering & suspension",
      "Cooling system service",
      "Check-engine diagnostics",
    ],
    image: "/services/safety.png",
    imageAlt: "Brake discs and safety components",
  },
  {
    slug: "customization",
    title: "Customization",
    description:
      "Personalize your car’s look and feel with tasteful modifications.",
    bullets: [
      "Wheels & tires",
      "Lighting upgrades",
      "Interior refinements",
      "Exterior styling",
    ],
    image: "/services/customization.jpeg",
    imageAlt: "Customized car exterior styling",
  },
];

export default function CarRepairTopicsPage() {
  return (
    <main className="min-h-screen">
      <section className="container py-10 lg:py-14">
        <h1 className="text-3xl lg:text-4xl font-urbanist font-bold text-brand-blue-500 dark:text-brand-orange-50">
          Services We Offer
        </h1>
        <p className="mt-3 max-w-2xl text-brand-blue-300 dark:text-brand-blue-100/80">
          Choose a category to dive into detailed guides, tips, and services we offer.
        </p>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
          {TOPICS.map((t) => (
            <article
              key={t.slug}
              className="rounded-2xl overflow-hidden border border-brand-orange-100 dark:bg-brand-orange-100/80 backdrop-blur flex flex-col"
            >
              {/* Image */}
              <div className="relative h-72 w-full">
                <Image
                  src={t.image}
                  alt={t.imageAlt}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                  sizes="(min-width:1280px) 25vw, (min-width:768px) 50vw, 100vw"
                  priority={false}
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 grow">
                <h2 className="text-xl font-semibold text-brand-blue-500">
                  {t.title}
                </h2>
                <p className="text-sm text-brand-blue-300">
                  {t.description}
                </p>
                <ul className="mt-1 list-disc list-inside space-y-1 text-sm text-brand-blue-300">
                  {t.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>

                <div className="pt-3 mt-auto">
                  {/* Use your Button component; blue variant fits here nicely */}
                  <Button href={`/car_repair_topics/${t.slug}`} blue showIcon>
                    Explore {t.title}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Optional: also provide text links for accessibility/SEO */}
        <nav aria-label="Topic shortcuts" className="sr-only">
          <ul>
            {TOPICS.map((t) => (
              <li key={t.slug}>
                <Link href={`/car_repair_topics/${t.slug}`}>{t.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </main>
  );
}