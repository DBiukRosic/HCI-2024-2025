import { createSupabaseServer } from "@/lib/supabase";
import TutorialsList from "@/components/TutorialList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutorials • CAR(E)",
  description: "Learn car repair and maintenance with our step-by-step tutorials.",
};

type Tutorial = {
  id: number;
  title: string;
  description: string | null;
  youtube_url: string;
};

export default async function TutorialsPage() {
  
  const supabase = await createSupabaseServer();

  const { data: tutorials = [] } = await supabase
    .from("tutorials")
    .select("id, title, description, youtube_url")
    .order("title");
    ;

  const { data: { user } } = await supabase.auth.getUser();
  let favIds: number[] = [];
  if (user) {
    const { data: favs = [] } = await supabase
      .from("favorite_tutorials")
      .select("tutorial_id")
      .eq("user_id", user.id);
    favIds = (favs ?? []).map(r => r.tutorial_id);
  }

  return (
    <main className="container py-12 space-y-8">
      <h1 className="text-4xl font-bold font-urbanist text-brand-orange-100">
        Car Repair Tutorials
      </h1>

      <TutorialsList 
      initialTutorials={(tutorials ?? []) as Tutorial[]} 
      initialFavIds={favIds ?? []} />
    </main>
  );
}
