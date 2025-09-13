"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase_client";
import Button from "@/components/button";

export default function AuthPanel({ initialEmail = "" }: { initialEmail?: string }) {
  const supabase = createSupabaseBrowser();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const isLoggedIn = Boolean(initialEmail);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // sync to server (set cookies)
        await fetch("/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "SIGNED_IN", session: data.session }),
          keepalive: true,
        });

        // Re-render server components
        router.refresh();
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        // If Confirm Email is ON, no session yet — show message and stop
        if (!data.session) {
          alert("Check your email to confirm your account.");
          return;
        }

        // If confirmation is OFF and session exists:
        await fetch("/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "SIGNED_IN", session: data.session }),
          keepalive: true,
        });
        router.refresh();
      }
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);
    await supabase.auth.signOut();

    // clear cookies
    await fetch("/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "SIGNED_OUT", session: null }),
      keepalive: true,
    });

    router.refresh();
    router.push("/"); // go home
  }

  return (
    <div className="space-y-4">
      {isLoggedIn ? (
        <div className="flex items-center justify-between">
          <div className="text-sm">Logged in as <span className="font-semibold">{initialEmail}</span></div>
          <Button blue showIcon={false} onClick={signOut} disabled={loading}>
            Sign out
          </Button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`px-3 py-1 rounded border ${mode === "signin" ? "bg-brand-blue-500" : "bg-brand-orange-100"}`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`px-3 py-1 rounded border ${mode === "signup" ? "bg-brand-blue-500" : "bg-brand-orange-100"}`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid gap-2">
              <label className="text-sm">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border px-3 py-2 bg-white text-black"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border px-3 py-2 bg-white text-black"
              />
            </div>

            {err && <p className="text-sm text-red-600">{err}</p>}

            <Button blue type="submit" showIcon={!loading} className="mt-2" disabled={loading}>
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}