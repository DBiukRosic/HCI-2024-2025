import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services • CAR(E)",
  description: "Explore a wide range of car repair services from CAR(E).",
};

export default function CarRepairTopics() {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-6xl font-extrabold tracking-tight">Our services</h1>
      </main>
    );
  }