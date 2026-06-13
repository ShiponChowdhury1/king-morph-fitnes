import { Navbar, Footer } from "../_components";
import { ContactContent } from "./_components";

export const metadata = {
  title: "Contact Us | MorphFit",
  description: "Have questions or need assistance? Reach out to the MorphFit team today to support your fitness and training goals.",
};

export default function ContactPage() {
  return (
    <div className="no-hero">
      <Navbar />
      <ContactContent />
      <Footer />
    </div>
  );
}
