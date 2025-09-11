import CategoryServices from "../_components/CategoryServices";

export const metadata = {
  title: "Maintenance • CAR(E)",
  description: "Essential maintenance services to keep your car reliable.",
};

export default function Page() {
  return (
    <CategoryServices
      category="maintenance"
      title="Maintenance Services"
      intro="Routine maintenance to protect components, avoid breakdowns, and extend your vehicle’s lifespan."
    />
  );
}
