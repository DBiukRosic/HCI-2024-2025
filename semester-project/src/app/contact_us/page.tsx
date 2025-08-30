import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactUs() {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-6xl font-extrabold tracking-tight">Contact Us</h1>
      </main>
    );
  }