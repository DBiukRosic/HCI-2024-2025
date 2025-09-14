import { createSupabaseServer } from "@/lib/supabase";
import Link from "next/link";
import clsx from "clsx";
import FavButton from "@/components/account/FavButton";

type Shop = {
  id: number;
  city: "Zagreb" | "Split" | "Osijek" | "Rijeka" | "Zadar";
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
  phone: string | null;
};

type Query = {
  q?: string;
  city?: string;
  _page?: string;
  _limit?: string;
  onlyFav?: "1" | "0" | string;
};

function toNum(v: string | undefined, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const metadata = {
  title: "Find Our Shops • CAR(E)",
  description: "Locate CAR(E) shops near you for reliable car maintenance and repair services.",
};

export default async function FindOurShopsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const all = await searchParams;
  const q: Query = Object.fromEntries(
    Object.entries(all).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
  ) as Query;

  const pageSize = toNum(q._limit, 12);
  const page = toNum(q._page, 1);
  const city =
    q.city && ["Zagreb", "Split", "Osijek", "Rijeka", "Zadar"].includes(q.city)
      ? q.city
      : undefined;
  const search = (q.q ?? "").trim();

  const supabase = await createSupabaseServer();

// read checkbox (sent only when checked)
const onlyFav = q.onlyFav === "1" || q.onlyFav === "on"; //

// current user + their favourite shop IDs
const { data: { user } } = await supabase.auth.getUser();
let favIds: number[] = [];
if (user) {
  const { data: favLocs = [] } = await supabase
    .from("favorite_locations")
    .select("shop_id")
    .eq("user_id", user.id);
  favIds = (favLocs ?? []).map((r) => r.shop_id);
}

  let qb = supabase.from("shops").select("*", { count: "exact" });

  if (city) qb = qb.eq("city", city);
  if (search) qb = qb.or(`name.ilike.%${search}%,address.ilike.%${search}%`);
  if (onlyFav) qb = qb.in("id", favIds);


  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data: shops, count, error } = await qb
    .order("city", { ascending: true })
    .order("name", { ascending: true })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-4xl font-urbanist font-bold pb-6 text-brand-orange-100">Locations of our shops</h1>

      {/* Search & filter */}
      <form method="GET" className="w-full grid grid-cols-1 md:grid-cols-4 gap-3 pb-6">
        <input
          type="search"
          name="q"
          defaultValue={search}
          placeholder="Search by name or address"
          className="w-full rounded border px-3 py-2 bg-brand-orange-50 text-black"
        />
        <select
          name="city"
          defaultValue={city ?? ""}
          className="w-full rounded border px-3 py-2 bg-brand-orange-50 text-black"
        >
          <option value="">All cities</option>
          <option value="Zagreb">Zagreb</option>
          <option value="Split">Split</option>
          <option value="Osijek">Osijek</option>
          <option value="Rijeka">Rijeka</option>
          <option value="Zadar">Zadar</option>
        </select>
         <label className="flex items-center gap-2 px-1 text-brand-orange-50">
          <input
            type="checkbox"
            name="onlyFav"
            value="1"
            defaultChecked={onlyFav}
          />
          Only favourites
        </label>
        <button
          type="submit"
          className="rounded border bg-brand-orange-100 hover:bg-brand-orange-300 px-3 py-2 text-brand-blue-500 font-urbanist"
        >
          Search
        </button>
      </form>

      {/* Pagination */}
      <div className="flex items-baseline gap-8 pb-6 w-full text-brand-orange-50">
        <div>
          Page {page} of {totalPages} {total ? `• ${total} results` : ""}
        </div>
        <div className="flex gap-4 ml-auto">
          <Link
            href={{ pathname: "/find_our_shops", query: { ...q, _page: 1, _limit: pageSize } }}
            className="rounded border bg-brand-orange-100 hover:bg-brand-orange-300 px-3 py-1 text-brand-blue-500 font-urbanist"
          >
            First
          </Link>
          <Link
            href={{
              pathname: "/find_our_shops",
              query: { ...q, _page: Math.max(1, page - 1), _limit: pageSize },
            }}
            className={clsx(
              "rounded border bg-brand-orange-75 hover:bg-brand-orange-200 px-3 py-1 text-brand-blue-500 font-urbanist",
              page === 1 && "pointer-events-none opacity-50"
            )}
          >
            Previous
          </Link>
          <Link
            href={{
              pathname: "/find_our_shops",
              query: { ...q, _page: Math.min(totalPages, page + 1), _limit: pageSize },
            }}
            className={clsx(
              "rounded border bg-brand-orange-75 hover:bg-brand-orange-200 px-3 py-1 text-brand-blue-500 font-urbanist",
              page === totalPages && "pointer-events-none opacity-50"
            )}
          >
            Next
          </Link>
          <Link
            href={{
              pathname: "/find_our_shops",
              query: { ...q, _page: totalPages, _limit: pageSize },
            }}
            className="rounded border bg-brand-orange-100 hover:bg-brand-orange-300 px-3 py-1 text-brand-blue-500 font-urbanist"
          >
            Last
          </Link>
        </div>
      </div>

      {/* Results */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {(shops as Shop[] | null)?.map((s) => (
          <li key={s.id} className="relative rounded border p-4 bg-brand-blue-200 text-brand-orange-50">
            <div className="text-sm opacity-70">{s.city}</div>
            <h3 className="text-xl font-semibold">{s.name}</h3>
            <div className="opacity-80">{s.address}</div>
            {s.phone && <div className="opacity-80">{s.phone}</div>}
            <div className="pt-2">
              <Link href={`/find_our_shops/${s.id}`} className="text-blue-500 underline">
                View details
              </Link>
              <FavButton 
                kind ="location" 
                targetId={s.id}
                initialIsFav={favIds.includes(s.id)} 
                className="absolute right-3 bottom-3" />
            </div>
          </li>
        ))}
      </ul>

      {(!shops || shops.length === 0) && (
        <p className="pt-10 opacity-70">No shops found.</p>
      )}
      {onlyFav && (!user || favIds.length === 0) && (
        <p className="pt-20 text-lg text-center w-full">Add some favourite shops.</p>
      )}
    </main>
  );
}
