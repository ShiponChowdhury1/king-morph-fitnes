import { Dna, Dumbbell, Apple, Utensils, LineChart, ShoppingBag } from "lucide-react";

const features = [
  {
    icon: <Dna size={24} />,
    title: "Morphology Identification",
    description:
      "Discover your unique body type through our advanced quiz system.",
  },
  {
    icon: <Dumbbell size={24} />,
    title: "Personalized Training",
    description:
      "Custom workout plans designed specifically for your body type and goals.",
  },
  {
    icon: <Apple size={24} />,
    title: "Nutrition Tracking",
    description:
      "Track macros and calories with guidance tailored to your morphology.",
  },
  {
    icon: <Utensils size={24} />,
    title: "Custom Recipes",
    description:
      "Access hundreds of recipes optimized for your nutritional needs.",
  },
  {
    icon: <LineChart size={24} />,
    title: "Progress Monitoring",
    description:
      "Visualize your transformation with detailed analytics and insights.",
  },
  {
    icon: <ShoppingBag size={24} />,
    title: "Fitness Shop",
    description:
      "Shop curated supplements, apparel, and equipment for your journey.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="features-section" id="features">
      <div className="section-container">
        <div className="section-header">
          <h2>Everything You Need to Transform</h2>
          <p>
            Comprehensive tools designed to help you achieve your fitness goals
            faster.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
