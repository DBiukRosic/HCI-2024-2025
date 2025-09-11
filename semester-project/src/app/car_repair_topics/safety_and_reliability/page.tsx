import CategoryServices from "../_components/CategoryServices";

export const metadata = {
  title: "Safety & Reliability • CAR(E)",
  description: "Inspections and repairs to keep you safe and prevent failures.",
};

export default function Page() {
  return (
    <CategoryServices
      category="safety_and_reliability"
      title="Safety & Reliability"
      intro="Critical system checks and repairs to ensure safe operation and dependable travel."
    />
  );
}