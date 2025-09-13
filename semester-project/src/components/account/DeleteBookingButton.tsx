"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase_client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function DeleteBookingButton({
  bookingId,
  className,
  confirm = true,
}: {
  bookingId: number;
  className?: string;
  confirm?: boolean;
}) {
  const supabase = createSupabaseBrowser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (loading) return;
    if (confirm && !window.confirm("Delete this booking?")) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId); // RLS ensures only owner can delete
      if (error) throw error;
      router.refresh();
    } catch (e) {
      console.error("Delete booking failed:", e);
      alert("Could not delete booking.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      title="Delete booking"
      aria-label="Delete booking"
      className={cn(
        "group inline-flex items-center justify-center rounded-full p-2",
        "transition-colors duration-200",
        "text-gray-100 hover:text-red-600",
        "hover:bg-red-100 dark:hover:bg-red-900/20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      <TrashIcon className="w-5 h-5 transition-colors duration-200 group-hover:text-red-600" />
    </button>
  );
}