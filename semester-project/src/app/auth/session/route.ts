import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { event?: "SIGNED_IN" | "SIGNED_OUT"; session?: any }
    | null;

  const res = NextResponse.json({ ok: true });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  if (body?.event === "SIGNED_IN" && body.session) {
    await supabase.auth.setSession(body.session);
  } else if (body?.event === "SIGNED_OUT") {
    await supabase.auth.signOut();
  }

  return res;
}