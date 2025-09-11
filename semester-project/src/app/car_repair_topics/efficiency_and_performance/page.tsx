import CategoryServices from "../_components/CategoryServices";

export const metadata = {
  title: "Efficiency & Performance • CAR(E)",
  description: "Upgrades and services to improve economy and responsiveness.",
};

export default function Page() {
  return (
    <CategoryServices
      category="efficiency_and_performance"
      title="Efficiency & Performance"
      intro="Targeted services to enhance throttle response, fuel economy, and overall drivability."
    />
  );
}
