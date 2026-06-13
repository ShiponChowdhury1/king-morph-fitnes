import { Navbar, Footer } from "../_components";
import { HowItWorksContent } from "./_components";

export const metadata = {
  title: "How It Works | MorphFit",
  description: "Learn how the MorphFit ecosystem works, including morphology quizzes, customized training programs, and results tracking.",
};

export default function HowItWorksPage() {
  return (
    <div className="no-hero">
      <Navbar />
      <HowItWorksContent />
      <Footer />
    </div>
  );
}
