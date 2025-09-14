"use client";

import { useMemo, useState } from "react";
import FavButton from "@/components/account/FavButton";

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
  initialFavIds = [],                   // 👈 new, optional
}: {
  initialTutorials: Tutorial[];
  initialFavIds?: number[];
}) {
  const [q, setQ] = useState("");
  const [onlyFav, setOnlyFav] = useState(false);  // 👈 new
  const [favIds, setFavIds] = useState<Set<number>>(
    () => new Set(initialFavIds)
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = initialTutorials;
    if (term) {
      list = list.filter((t) =>
        `${t.title} ${t.description ?? ""}`.toLowerCase().includes(term)
      );
    }
    if (onlyFav) {
      list = list.filter((t) => favIds.has(t.id));
    }
    return list;
  }, [q, onlyFav, initialTutorials, favIds]);

  function handleToggle(id: number, nowFav: boolean) {
    setFavIds((prev) => {
      const next = new Set(prev);
      if (nowFav) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <section className="space-y-6">
      {/* Controls row */}
      <div className="flex items-center gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tutorials (title or description)…"
          className="w-full rounded border px-3 py-2 bg-brand-orange-50 text-black"
          aria-label="Search tutorials"
        />
        <label className="flex items-center gap-2 text-sm text-brand-orange-50">
          <input
            type="checkbox"
            className="bg-brand-orange-50"
            checked={onlyFav}
            onChange={(e) => setOnlyFav(e.target.checked)}
          />
          Only favourites
        </label>
        <button
          type="button"
          onClick={() => setQ("")}
          className="rounded border bg-brand-orange-75 hover:bg-brand-orange-300 px-3 py-2 text-gray-800 font-urbanist"
        >
          Reset
        </button>
      </div>

      <div className="text-sm opacity-70 text-brand-orange-50">
        Showing {filtered.length} of {initialTutorials.length}
      </div>

      {/* Cards */}
      <div className="grid gap-8">
        {filtered.map((t) => (
          <article
            key={t.id}
            className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-white/80 dark:bg-brand-orange-100/80 rounded-xl p-6 border"
          >
            <FavButton
              kind="tutorial"
              targetId={t.id}
              initialIsFav={favIds.has(t.id)}       
              onToggle={(next) => handleToggle(t.id, next)} 
              className="absolute top-3 right-3 lg:bottom-3 lg:left-3 lg:top-auto lg:right-auto"
            />
            <div>
              <h2 className="text-xl font-semibold text-brand-blue-500">{t.title}</h2>
              {t.description && (
                <p className="mt-2 text-brand-blue-300">{t.description}</p>
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

