import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { Session } from "@supabase/supabase-js";

// shape of the JSON Supabase sends to the webhook
type AuthWebhookBody = {
  event: "SIGNED_IN" | "SIGNED_OUT" | "USER_UPDATED" | string;
  session: Session | null;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AuthWebhookBody;

  // Prepare the response early so we can set cookies on it
  const res = NextResponse.json({ ok: true });

  // Create a Supabase server client bound to this request/response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );

  // Sync the Supabase auth session based on the event
  if (body.event === "SIGNED_IN" && body.session) {
    await supabase.auth.setSession(body.session);
  } else if (body.event === "SIGNED_OUT") {
    await supabase.auth.signOut();
  }

  return res;
}