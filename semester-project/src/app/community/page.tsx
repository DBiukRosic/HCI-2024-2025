import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
};

export default function Community() {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-6xl font-extrabold tracking-tight">Community</h1>
      </main>
    );
  }