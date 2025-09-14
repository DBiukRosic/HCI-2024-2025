import Image from "next/image";
import { getServiceItems } from "@/lib/contentful";
import Button from "@/components/button";

function formatEuro(n: number) {
  try {
    return new Intl.NumberFormat("hr-HR", { style: "currency", currency: "EUR" }).format(n);
  } catch {
    return `${n.toFixed(2)} €`;
  }
}
function formatDuration(mins: number) {
  if (!mins || mins <= 0) return "N/A";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

export default async function CategoryServices({
  category,
  title,
  intro,
}: {
  category: "maintenance" | "efficiency_and_performance" | "safety_and_reliability" | "customization";
  title: string;
  intro?: string;
}) {
  const items = await getServiceItems(category);

  return (
    <main className="container max-w-7xl lg:max-w-[90rem] py-10 lg:py-16">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-urbanist font-bold text-brand-orange-100">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-brand-orange-50 ">
            {intro}
          </p>
        )}
      </header>

      {items.length === 0 ? (
        <p className="opacity-70">No services found for this category yet.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-8 lg:gap-12 mx-auto">
          {items.map((s) => (
            <li key={s.title} className="rounded-xl border p-8 bg-white/80 dark:bg-white/10">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="relative w-full md:w-72 h-60 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={s.imageUrl}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="(min-width:768px) 15rem, 100vw"
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold text-3xl text-brand-blue-500 dark:text-brand-orange-50">
                    {s.title}
                  </h3>
                  <p className="text-md opacity-80 mt-2">{s.description}</p>
                  <div className="mt-4 text-lg">
                    <span className="mr-10">⏱ {formatDuration(s.timeMinutes)}</span>
                    <span>💶 {formatEuro(s.costEuro)}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-10">
        <Button href="/car_repair_topics" orange showIcon>
          Back to Services
        </Button>
      </div>
    </main>
  );
}