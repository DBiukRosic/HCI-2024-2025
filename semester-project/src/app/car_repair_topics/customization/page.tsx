import CategoryServices from "../_components/CategoryServices";

export const metadata = {
  title: "Customization • CAR(E)",
  description: "Personalize your car’s look and feel with tasteful modifications.",
};

export default function Page() {
  return (
    <CategoryServices
      category="customization"
      title="Customization"
      intro="Visual and comfort upgrades tailored to your style—inside and out."
    />
  );
}
