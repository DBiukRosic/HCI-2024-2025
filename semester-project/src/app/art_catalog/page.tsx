import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art Catalog",
};

export default function Art_Catalog() {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-6xl font-extrabold tracking-tight">Art Catalog</h1>
      </main>
    );
  }