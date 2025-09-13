import { createSupabaseServer } from "@/lib/supabase";
import { Suspense } from "react";
import ClientTime from "../ClientTime";
import DeleteBookingButton from "./DeleteBookingButton";

type FavLocRow = {
  id: number;
  shop: { name: string } | null;        
};

type FavTutRow = {
  id: number;
  tutorial: { title: string } | null;    
};

export default async function SavedItems() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="rounded-2xl border bg-white/60 dark:bg-white/10 p-6">
        <p className="text-sm">
          Sign in to view your bookings, favorite locations, and tutorials.
        </p>
      </div>
    );
  }

  const [{ data: bookings }, { data: favLocs }, { data: favTuts }] = await Promise.all([
    supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10),

    
    supabase
      .from("favorite_locations")
      .select(`id, shop:shops(name)`)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)
      .returns<FavLocRow[]>(),

    
    supabase
      .from("favorite_tutorials")
      .select(`id, tutorial:tutorials(title)`)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)
      .returns<FavTutRow[]>(),
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Panel title="Your bookings">
        {bookings?.length ? (
          <ul className="space-y-2">
            {bookings!.map((b) => (
              <li key={b.id} className="text-sm rounded border p-3 bg-white/70 dark:bg-white/10">
                <div className="flex items-baseline justify-between">
                  <div className="font-medium">{b.headline}</div>
                  <div className="opacity-70"><ClientTime iso={new Date(b.created_at).toISOString()} /></div>
                  <DeleteBookingButton bookingId={b.id} />
                </div>
                {/* details toggle */}
                {b.details || b.name || b.email || b.phone ? (
                  <details className="mt-2">
                    <summary className="cursor-pointer opacity-80">View details</summary>
                    <div className="mt-2 space-y-1 opacity-90">
                      {b.details && <div><span className="font-medium">Details:</span> {b.details}</div>}
                      {b.name && <div><span className="font-medium">Name:</span> {b.name}</div>}
                      {b.email && <div><span className="font-medium">Email:</span> {b.email}</div>}
                      {b.phone && <div><span className="font-medium">Phone:</span> {b.phone}</div>}
                    </div>
                  </details>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <Empty text="No bookings yet." />
        )}
      </Panel>

      <Panel title="Favorite locations">
        {favLocs?.length ? (
          <ul className="space-y-2">
            {favLocs!.map((f) => (
              <li key={f.id} className="text-md">
                <span className="font-bold">Shop:</span> {f.shop?.name ?? "Unknown shop"}
              </li>
            ))}
          </ul>
        ) : <Empty text="No favorite locations yet." />}
      </Panel>

      <Panel title="Favorite tutorials">
        {favTuts?.length ? (
          <ul className="space-y-2">
            {favTuts!.map((f) => (
              <li key={f.id} className="text-md">
                <span className="font-bold">Tutorial:</span> {f.tutorial?.title ?? "Unknown tutorial"}
              </li>
            ))}
          </ul>
        ) : <Empty text="No favorite tutorials yet." />}
      </Panel>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white/80 dark:bg-white/10 p-6">
      <h3 className="font-semibold mb-3">{title}</h3>
      <Suspense fallback={<p className="text-sm opacity-70">Loading…</p>}>
        {children}
      </Suspense>
    </div>
  );
}
function Empty({ text }: { text: string }) {
  return <p className="text-sm opacity-70">{text}</p>;
}