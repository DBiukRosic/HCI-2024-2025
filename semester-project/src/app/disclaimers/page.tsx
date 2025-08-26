import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
};

export default function Disclaimer() {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-6xl font-extrabold tracking-tight">Disclaimer</h1>
      </main>
    );
  }