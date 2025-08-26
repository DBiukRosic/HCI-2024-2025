import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
};

export default function Accessibility() {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-6xl font-extrabold tracking-tight">Accessibility</h1>
      </main>
    );
  }