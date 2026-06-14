import { Navbar, Footer } from "../_components";
import { FeaturesContent } from "./_components";

export const metadata = {
  title: "Powerful Features | MorphFit",
  description: "Explore the cutting-edge features of the MorphFit ecosystem, including morphology quizzes, customized training programs, and AI coaching.",
};

export default function FeaturesPage() {
  return (
    <div className="no-hero">
      <Navbar />
      <FeaturesContent />
      <Footer />
    </div>
  );
}
