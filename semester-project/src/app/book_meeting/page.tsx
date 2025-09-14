import { requireUserServer } from "@/lib/supabase";
import BookMeetingForm from "./ui/BookMeetingForm";
import Button from "@/components/button";

export const metadata = {
  title: "Book Your Meeting • CAR(E)",
};

export default async function BookMeetingPage() {
  const user = await requireUserServer(); // redirects if not logged in
  return (
    <main className="container py-10 lg:py-14">
      <h1 className="text-3xl font-urbanist font-bold mb-4 text-brand-orange-100">Book Your Meeting</h1>
      <p className="max-w-2xl mb-8 text-brand-orange-50">
        Fill out the form below and we’ll notify you via email as soon as possible. 
        You’ll see your booking under “Saved items” on your profile. Click the card to view full details.
      </p>
      <BookMeetingForm userId={user.id} userEmail={user.email ?? ""} />
      <p className="mt-6 text-md text-brand-orange-50 max-w-2xl">
        If you wish to cancel or reschedule your meeting, please contact us.
        And if you go back to your profile without submitting the form, your entered data will be lost.
      </p>
      <p className="mt-10">
        <Button href="/user_profile" orange showIcon>
          Back to Profile
        </Button>
      </p>
    </main>
  );
}