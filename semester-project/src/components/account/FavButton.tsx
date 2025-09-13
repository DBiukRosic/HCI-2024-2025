"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase_client";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type FavKind = "tutorial" | "location";

export default function FavButton({
  kind,
  targetId,            // tutorial_id/shop_id
  className,
  initialIsFav,
  onToggle,
}: {
  kind: FavKind;
  targetId: number;
  className?: string;
  initialIsFav?: boolean;
  onToggle?: (nextIsFav: boolean) => void;
}) {
  const supabase = createSupabaseBrowser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState<boolean>(initialIsFav ?? false);

  const table = kind === "tutorial" ? "favorite_tutorials" : "favorite_locations";
  const idCol = kind === "tutorial" ? "tutorial_id" : "shop_id";

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (initialIsFav !== undefined) { setLoading(false); return; }
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted || !user) { setLoading(false); return; }
      const { data } = await supabase
        .from(table)
        .select("id")
        .eq(idCol, targetId)
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();
      if (mounted) {
        setIsFav(Boolean(data));
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [supabase, table, idCol, targetId, initialIsFav]);

  async function toggle() {
  setLoading(true);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    router.push("/user_profile");
    setLoading(false);
    return;
  }

  const next = !isFav;
  // optimistic
  setIsFav(next);
  onToggle?.(next);

  // pick table/columns
  const table = kind === "tutorial" ? "favorite_tutorials" : "favorite_locations";
  const idCol = kind === "tutorial" ? "tutorial_id" : "shop_id";
  const onConflictCols = kind === "tutorial" ? "user_id,tutorial_id" : "user_id,shop_id";

  try {
    if (next) {
      const { error } = await supabase
        .from(table)
        .upsert(
          { [idCol]: targetId, user_id: user.id } as any,
          { onConflict: onConflictCols }
        );
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq(idCol, targetId)
        .eq("user_id", user.id);
      if (error) throw error;
    }
  } catch (e: any) {
    console.error("[FavButton] toggle failed:", e?.message ?? e);
    setIsFav(!next);
    onToggle?.(!next);
    alert(e?.message ?? "Could not update favourite. Check RLS/constraints.");
  } finally {
    setLoading(false);
  }
}

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      aria-pressed={isFav}
      className={cn(
        "inline-flex items-center justify-center rounded-full p-2 transition",
        isFav ? "bg-brand-orange-500" : "bg-brand-blue-50/70",
        className
      )}
      title={isFav ? "Remove from favorites" : "Save to favorites"}
    >
      <HeartIcon className={cn("w-5 h-5",
        isFav ? "text-brand-blue-500" : "text-brand-orange-100")} />
    </button>
  );
}