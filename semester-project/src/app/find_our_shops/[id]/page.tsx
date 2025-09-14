import { createSupabaseServer } from "@/lib/supabase";
import { notFound } from "next/navigation";
import FavButton from "@/components/account/FavButton";
import Button from "@/components/button";

type Params = { id: string };

export const metadata = { title: "Shop • CAR(E)" };

export default async function ShopDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("shops")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error || !data) notFound();

  return (
    <main className="min-h-screen container py-20 text-brand-orange-50">
      <div className="text-lg text-brand-orange-100 opacity-70">{data.city}</div>
      <h1 className="text-5xl font-urbanist-bold">{data.name}</h1>
      <p className="mt-3">{data.address}</p>
      {data.phone && <p className="mt-2">{data.phone}</p>}

      <a
        className="inline-block mt-5 text-blue-500 underline"
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${data.name} ${data.address}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in Google Maps
      </a>
       <div className="flex mt-4">
         <FavButton 
            kind ="location" 
            targetId={data.id} 
            className="w-16 h-16 text-9xl" />
       </div>
       <div className="mt-10">
        <Button
          orange
          href="/find_our_shops"
          showIcon
        >
          Back to Shops
        </Button>
      </div>
    </main>
  );
}





