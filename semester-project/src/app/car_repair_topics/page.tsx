import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Repair Topics • CAR(E)",
  description: "Explore a wide range of car repair topics with expert guides and tips from CAR(E).",
};

export default function CarRepairTopics() {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-6xl font-extrabold tracking-tight">Car Repair Topics</h1>
      </main>
    );
  }