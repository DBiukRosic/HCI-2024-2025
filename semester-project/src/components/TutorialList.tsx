"use client";

import { useMemo, useState } from "react";

type Tutorial = {
  id: number;
  title: string;
  description: string | null;
  youtube_url: string;
};

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "embed" || p === "shorts");
      if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
    }
    return null;
  } catch {
    return null;
  }
}

function toEmbedUrl(youtubeUrl: string): string {
  const id = extractYouTubeId(youtubeUrl);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : "about:blank";
}

export default function TutorialsList({
  initialTutorials,
}: {
  initialTutorials: Tutorial[];
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return initialTutorials;
    return initialTutorials.filter((t) => {
      const hay = `${t.title} ${t.description ?? ""}`.toLowerCase();
      return hay.includes(term);
    });
  }, [q, initialTutorials]);

  return (
    <section className="space-y-6">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tutorials (title or description)…"
          className="w-full rounded border px-3 py-2 bg-white text-black"
          aria-label="Search tutorials"
        />
        <button
          type="button"
          onClick={() => setQ("")}
          className="rounded border bg-gray-100 px-3 py-2 text-gray-800 font-urbanist"
        >
          Reset
        </button>
      </div>

      <div className="text-sm opacity-70">
        Showing {filtered.length} of {initialTutorials.length}
      </div>

      {/* Cards */}
      <div className="grid gap-8">
        {filtered.map((t) => (
          <article
            key={t.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-white/80 dark:bg-brand-orange-100/80 rounded-xl p-6 border"
          >
            <div>
              <h2 className="text-xl font-semibold text-brand-blue-500">
                {t.title}
              </h2>
              {t.description && (
                <p className="mt-2 text-brand-blue-300">
                  {t.description}
                </p>
              )}
            </div>

            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow">
              <iframe
                src={toEmbedUrl(t.youtube_url)}
                title={t.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="opacity-70">No tutorials match your search.</p>
      )}
    </section>
  );
}
