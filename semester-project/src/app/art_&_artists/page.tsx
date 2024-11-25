import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artwork & Artists",
};

export default function Art_Artists() {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-6xl font-extrabold tracking-tight">Artwork and Artists</h1>
      </main>
    );
  }