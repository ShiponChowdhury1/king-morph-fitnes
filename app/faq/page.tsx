import { Navbar, Footer } from "../_components";
import { FAQContent } from "./_components";

export const metadata = {
  title: "Frequently Asked Questions | MorphFit",
  description: "Find answers to commonly asked questions about MorphFit's morphology-based training plans, features, pricing, and fitness coaching.",
};

export default function FAQPage() {
  return (
    <div className="no-hero">
      <Navbar />
      <FAQContent />
      <Footer />
    </div>
  );
}
