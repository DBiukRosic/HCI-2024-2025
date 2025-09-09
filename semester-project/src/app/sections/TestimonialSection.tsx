import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

type Testimonial = {
  name: string;
  location: string;
  review: string;
  rating: number; // 1-5
  image: string;  // path in /public
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sophia Reynolds",
    location: "Denver, Colorado",
    review:
      "I've been a customer for two years now, and I can't recommend this service enough! They're prompt, thorough, and always transparent with their pricing. My car runs like a dream after each visit. I trust them completely for all my car maintenance needs.",
    rating: 5,
    image: "/testimonials/sophia.jpg",
  },
  {
    name: "Daniel Nguyen",
    location: "Seattle, Washington",
    review:
      "Great experience every time I visit! The staff is friendly and knowledgeable. I appreciate their attention to detail and the way they explain everything before proceeding with any repairs. Highly recommended!",
    rating: 5,
    image: "/testimonials/daniel.jpg",
  },
  {
    name: "Lisa Johnson",
    location: "Atlanta, Georgia",
    review:
      "As a single parent, finding reliable car service is crucial. This team has never let me down! They're honest, efficient, and have gone above and beyond in fixing my car. The peace of mind they provide is invaluable.",
    rating: 5,
    image: "/testimonials/lisa.jpg",
  },
  {
    name: "Carlos Hernandez",
    location: "Miami, Florida",
    review:
      "Outstanding service! From routine maintenance to unexpected repairs, they handle everything with professionalism and expertise. The convenience and quality of their work keep me coming back. I highly trust their recommendations and skill.",
    rating: 5,
    image: "/testimonials/carlos.jpg",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={i < rating ? "w-5 h-5 text-amber-400" : "w-5 h-5 text-amber-200"}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-brand-orange-200 dark:bg-brand-orange-400">
      <div className="container py-12 lg:py-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold font-urbanist text-brand-blue-500 dark:text-brand-blue-50">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-brand-blue-400">
            We’re grateful for your trust and proud to help keep your cars running smoothly.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.name}
              className="rounded-2xl bg-brand-blue-300/90 border-white/10 p-6 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-black/10">
                  <Image
                    src={t.image}
                    alt={`${t.name} avatar`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="font-semibold text-brand-orange-300">
                    {t.name}
                  </div>
                  <div className="text-xs text-brand-orange-500">
                    {t.location}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-brand-orange-400 leading-relaxed">
                “{t.review}”
              </p>

              <div className="mt-4">
                <Stars rating={t.rating} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}