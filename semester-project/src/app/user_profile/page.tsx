import type { Metadata } from "next";
import { createSupabaseServer } from "@/lib/supabase";
import AuthPanel from "@/components/auth/AuthPanel";
import SavedItems from "@/components/account/SavedItems";
import Button from "@/components/button";
import AuthGate from "@/components/auth/AuthGate";


export const metadata: Metadata = {
  title: "User Profile • CAR(E)",
  description: "Manage your user profile and account settings on CAR(E).",
};

export const dynamic = "force-dynamic";

export default async function UserProfilePage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="container py-10 lg:py-14 space-y-10">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
          <h1 className="text-4xl lg:text-4xl font-urbanist font-bold text-brand-orange-100">
            Create your CAR(E) account
          </h1>
          <p className="text-brand-orange-50 max-w-xl">
            Save your favorite tutorials, bookmark shop locations, track bookings,
            and pick up exactly where you left off on any device. Members get
            faster checkouts, personalized recommendations, and priority support.
          </p>
          <ul className="list-disc list-inside text-brand-orange-50/80 max-w-xl space-y-1">
            <li>Save &amp; sync favorites (locations, tutorials)</li>
            <li>View &amp; manage your bookings</li>
            <li>Personalized suggestions based on your car</li>
            <li>Priority support</li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-white/80 dark:bg-white/10 p-6">
          <AuthPanel initialEmail={user?.email ?? ""} />
        </div>
      </section>
      <AuthGate>
      {user && (
  <div className="mt-4">
      <Button orange showIcon href="/book_meeting">BOOK YOUR MEETING</Button>
        </div>
      )}
      </AuthGate>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand-blue-500 dark:text-brand-orange-50">
          Your saved items
        </h2>
        <SavedItems />
      </section>
    </main>
  );
}