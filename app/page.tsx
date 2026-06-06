import {
  Navbar,
  HeroSection,
  TaglineSection,
  FeaturesSection,
  MattersSection,
  PrecisionSection,
  NutritionSection,
  IntegrationSection,
  ShopSection,
  ContactSection,
  Footer,
} from "./_components";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TaglineSection />
        <FeaturesSection />
        <MattersSection />
        <PrecisionSection />
        <NutritionSection />
        <IntegrationSection />
        <ShopSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
