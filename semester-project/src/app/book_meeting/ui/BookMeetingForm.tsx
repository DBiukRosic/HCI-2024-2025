"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase_client";
import Button from "@/components/button";

export default function BookMeetingForm({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) {
  const supabase = createSupabaseBrowser();
  const router = useRouter();

  const [headline, setHeadline] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setOk(false);

    const { error } = await supabase.from("bookings").insert({
      user_id: userId,
      headline,
      details,
      name,
      email,
      phone,
    });

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setOk(true);
    setHeadline("");
    setDetails("");
    setPhone("");

    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-4 max-w-xl text-brand-orange-50">
      <div className="grid gap-1">
        <label className="text-lg font-urbanist">Headline*</label>
        <input
          required
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="rounded border bg-white text-black px-3 py-2"
          placeholder="Short title for your booking"
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm">Details</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="rounded border bg-white text-black px-3 py-2 min-h-32"
          placeholder="Describe your car issue or request"
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm">Your name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border bg-white text-black px-3 py-2"
          placeholder="Name and surname"
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border bg-white text-black px-3 py-2"
          placeholder="your@email.com"
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm">Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded border bg-white text-black px-3 py-2"
          placeholder="+385 ..."
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {ok && <p className="text-sm text-green-600">Saved! We’ll email you shortly.</p>}

      <Button orange showIcon={!saving} type="submit" className="mt-2">
        {saving ? "Saving..." : "Save booking"}
      </Button>
    </form>
  );
}