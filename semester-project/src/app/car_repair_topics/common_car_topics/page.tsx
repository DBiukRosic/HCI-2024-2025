import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Common Car Topics",
};

export default function CommonCarTopics() {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-6xl font-extrabold tracking-tight">Common Car Topics</h1>
      </main>
    );
  }