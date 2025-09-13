"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function createSupabaseServer() {
  const store = await cookies(); // Next 15: async

  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      get(name: string) {
        return store.get(name)?.value;
      },
    },
  });
}

// --- Auth helpers ---
export async function getUserServer() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  return user ?? null;
}

export async function requireUserServer() {
  const user = await getUserServer();
  if (!user) redirect("/user_profile"); // or /login
  return user;
}