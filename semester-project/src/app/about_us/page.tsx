import Image from "next/image";
import Button from "@/components/button";
import type { Metadata } from "next";
import { getTeamMembers, getStats } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "About Us • CAR(E)",
  description:
    "We make car maintenance accessible, reliable, and stress-free with expert guides and trusted service.",
};

//export const revalidate = 3600;

export default async function AboutUsPage() {
  const [team, stats] = await Promise.all([getTeamMembers(), getStats()]);

  return (
    <main className="min-h-screen bg-brand-blue-75 dark:bg-brand-blue-500">
      {/* Hero */}
      <section className="w-full bg-brand-blue-200 dark:bg-brand-blue-400">
        <div className="container py-14 lg:py-20">
          <h1 className="font-urbanist text-4xl lg:text-5xl font-bold text-brand-blue-500 dark:text-brand-orange-50">
            About CAR(E)
          </h1>
          <p className="mt-4 max-w-2xl text-brand-blue-400 dark:text-brand-blue-50/80">
            Our mission is simple: help drivers maintain their cars with confidence—through expert
            guidance, honest service, and tools that put you in control.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <h2 className="text-2xl lg:text-3xl font-urbanist font-semibold text-brand-blue-400 dark:text-brand-orange-50">
              Our Story
            </h2>
            <p className="mt-4 text-brand-blue-300 dark:text-brand-blue-50/80">
              We started as a small garage with one goal—make car care transparent. Today, CAR(E)
              combines hands-on expertise with clear resources so you know what&apos;s happening
              under the hood and what it really takes to keep your car healthy.
            </p>
            <p className="mt-3 text-brand-blue-300 dark:text-brand-blue-50/80">
              From preventative maintenance to complex diagnostics, we believe knowledge saves money,
              time, and stress. That&apos;s why we&apos;re building tutorials, tools, and services
              that are easy to understand and easy to use.
            </p>
          </div>
          <div className="rounded-2xl bg-brand-blue-100/30 p-6 border border-brand-orange-100">
            <h3 className="font-semibold text-brand-blue-400 dark:text-brand-orange-50">
              What We Offer
            </h3>
            <ul className="mt-4 space-y-2 text-brand-blue-300 dark:text-brand-blue-50/80 list-disc list-inside">
              <li>Step-by-step repair topics you can trust</li>
              <li>Expert resources curated for every skill level</li>
              <li>Find our shops and book service you can rely on</li>
              <li>Create an account to save &amp; like your favorite guides</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-brand-blue-300/40 dark:bg-brand-blue-400/30">
        <div className="container py-12 lg:py-16">
          <h2 className="text-2xl lg:text-3xl font-urbanist font-semibold text-brand-blue-400 dark:text-brand-orange-50">
            Our Values
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard title="Transparency" desc="Clear pricing, clear steps, no surprises." />
            <ValueCard title="Safety" desc="Best practices and quality parts come first." />
            <ValueCard title="Reliability" desc="We stand behind our work—and our guides." />
          </div>
        </div>
      </section>

      {/* Team (from Contentful) */}
      <section className="container py-12 lg:py-16">
        <h2 className="text-2xl lg:text-3xl font-urbanist font-semibold text-brand-blue-400 dark:text-brand-orange-50">
          Meet the Team
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.length === 0 ? (
            <p className="text-sm opacity-70">Team coming soon.</p>
          ) : (
            team.map((m) => (
              <article
                key={m.name}
                className="rounded-2xl border border-brand-orange-100 bg-white/70 dark:bg-brand-blue-100/20 backdrop-blur p-5"
              >
                <div className="h-16 w-16 rounded-full overflow-hidden bg-brand-blue-100 dark:bg-brand-blue-300/40">
                  {!!m.avatarUrl && (
                    <Image
                      src={m.avatarUrl}
                      alt={`${m.name} avatar`}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-cover"
                    />
                  )}
                </div>
                <h3 className="mt-4 font-semibold text-brand-blue-400 dark:text-brand-orange-50">
                  {m.name}
                </h3>
                {/* In your Contentful skeleton the field is `position` */}
                <p className="text-sm text-brand-blue-300 dark:text-brand-blue-50/80">
                  {m.position}
                </p>
                {m.bio && (
                  <p className="mt-3 text-sm text-brand-blue-300 dark:text-brand-blue-50/70">
                    {m.bio}
                  </p>
                )}
              </article>
            ))
          )}
        </div>
      </section>

      {/* Stats (from Contentful) */}
      <section className="w-full">
        <div className="container py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.length === 0 ? (
            <p className="col-span-full text-sm opacity-70">Stats coming soon.</p>
          ) : (
            stats.map((s) => (
              <Stat
                key={s.id}
                n={`${s.value}${s.suffix ?? ""}`}
                label={s.label}
              />
            ))
          )}
          <Stat n="24/7" label="Resources available" />
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-brand-blue-200 dark:bg-brand-blue-400">
        <div className="container py-12 lg:py-16 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl lg:text-2xl font-urbanist font-semibold text-brand-blue-500 dark:text-brand-orange-50">
              Ready to get more from your car?
            </h3>
            <p className="text-brand-blue-400 dark:text-brand-blue-50/80">
              Create an account to save guides, like resources, and book service.
            </p>
          </div>
          <div className="flex gap-3">
            <Button href="/user_profile" blue showIcon>
              Sign In / Create Account
            </Button>
            <Button href="/find_our_shops" blue showIcon>
              Find Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- small presentational helpers ---------- */

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-brand-orange-100 p-5 bg-white/70 dark:bg-brand-blue-100/20 backdrop-blur">
      <h3 className="font-semibold text-brand-blue-400 dark:text-brand-orange-50">{title}</h3>
      <p className="mt-2 text-sm text-brand-blue-300 dark:text-brand-blue-50/80">{desc}</p>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-xl bg-brand-blue-100/20 border border-brand-orange-100 p-6">
      <div className="text-2xl font-bold text-brand-blue-400 dark:text-brand-orange-50">{n}</div>
      <div className="text-sm text-brand-blue-300 dark:text-brand-blue-50/80">{label}</div>
    </div>
  );
}