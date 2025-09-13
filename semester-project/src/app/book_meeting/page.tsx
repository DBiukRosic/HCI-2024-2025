import { requireUserServer } from "@/lib/supabase";
import BookMeetingForm from "./ui/BookMeetingForm";

export const metadata = {
  title: "Book Your Meeting • CAR(E)",
};

export default async function BookMeetingPage() {
  const user = await requireUserServer(); // redirects if not logged in
  return (
    <main className="container py-10 lg:py-14">
      <h1 className="text-3xl font-urbanist font-bold mb-4">Book Your Meeting</h1>
      <p className="max-w-2xl mb-8 text-brand-blue-300 dark:text-brand-blue-100/80">
        Fill out the form below and we’ll notify you via email as soon as possible. 
        You’ll see your booking under “Saved items” on your profile. Click the card to view full details.
      </p>
      <BookMeetingForm userId={user.id} userEmail={user.email ?? ""} />
    </main>
  );
}