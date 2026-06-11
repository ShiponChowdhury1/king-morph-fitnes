import { Navbar, ContactSection, Footer } from "../_components";
import {
  ShopHeroBanner,
  WorkoutClothesShoes,
  PopularRightNow,
  WomensBanner,
  WomensCollection,
  MensBanner,
  MensCollection,
  Accessories,
} from "./_components";

export const metadata = {
  title: "Shop MorphFit — Workout Clothes & Apparel Collections",
  description:
    "Explore KingMorph's exclusive collections of fitness apparel, shoes, and training accessories designed to support your specific morphology and goals.",
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="shop-page">
        <ShopHeroBanner />
        <WorkoutClothesShoes />
        <PopularRightNow />
        <WomensBanner />
        <WomensCollection />
        <MensBanner />
        <MensCollection />
        <Accessories />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
