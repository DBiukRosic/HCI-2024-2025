import { createSupabaseServer } from "@/lib/supabase";
import TutorialsList from "@/components/TutorialList";

type Tutorial = {
  id: number;
  title: string;
  description: string | null;
  youtube_url: string;
};

export const metadata = {
  title: "Tutorials • CAR(E)",
  description: "Car repair tutorials with step-by-step videos.",
};

export const revalidate = 600; // optional cache

export default async function TutorialsPage() {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("tutorials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (
    <main className="container py-12 space-y-8">
      <h1 className="text-3xl font-bold font-urbanist text-brand-blue-500 dark:text-brand-orange-50">
        Car Repair Tutorials
      </h1>

      <TutorialsList initialTutorials={(data ?? []) as Tutorial[]} />
    </main>
  );
}
