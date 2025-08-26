"use client";

import { Fragment, useEffect, useState } from "react";
import HeroImageGrid, { HeroImageObject } from "./HeroImageGrid";
import Button from "@/components/button";

/**
 * Expecting the API to return an array like:
 * [{ url, width, height, title, borderRadius }]
 * We'll map it into HeroImageObject (image: string, borderRadius: string).
 */

const HeroSection = () => {
  const [images, setImages] = useState<HeroImageObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/hero", { cache: "no-store" });
        const data = await res.json();
        // API may return { ok, images } or just an array; support both:
        const list = Array.isArray(data) ? data : data.images ?? [];
        if (!alive) return;

        const mapped: HeroImageObject[] = list.map((img: any) => ({
          image: img.url,                 // string URL from Contentful
          borderRadius: img.borderRadius, // already coming from API
        }));

        setImages(mapped);
      } catch (e) {
        console.error("Failed to fetch hero images:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <Fragment>
    <section className="container flex justify-between items-center gap-10 w-screen mb-8">
      <div className="flex flex-col justify-start gap-4 max-w-xl m-auto lg:m-0">
        <h1 className="font-urbanist text-4xl font-bold lg:text-left xl:text-5xl whitespace-break-spaces text-brand-blue-50">
          We care about your car!
        </h1>

        <p className="text-base font-urbanist text-center lg:text-left xl:test-lg whitespace-break-spaces">
          Our car service is dedicated to ensuring your vehicle&apos;s peak performance and your complete
          satisfaction. With a team of highly skilled technicians and state-of-the-art equipment, we offer
          a comprehensive range of services to keep your vehicle running smoothly. From routine maintenance
          like oil changes and tire rotations to complex engine diagnostics and repairs, we handle it all.
          We take pride in our commitment to quality and safety, using only genuine parts and adhering to
          industry-best practices. Whether you&apos;re in need of a quick tune-up or a major overhaul,
          you can trust us to provide efficient, reliable, and cost-effective solutions for your car.
          At our car service, your vehicle is in capable hands, and your peace of mind is our top priority.
        </p>

        <div className="flex justify-center lg:justify-center">
          <Button orange>BOOK A MEETING NOW</Button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="mt-6 lg:mt-0 flex-shrink-0">
          <HeroImageGrid images={images} />
        </div>
      )}
      {images.length > 0 && (
            <div className="mt-6 block lg:hidden">
              <HeroImageGrid images={images} />
            </div>
          )}
    </section>
    <div className="container mt-6 block lg:hidden">
        {images.length > 0 && <HeroImageGrid images={images} />}
      </div>
  </Fragment>
);
}
export default HeroSection;
