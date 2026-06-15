import Image from "next/image";

export default function NutritionSection() {
  return (
    <section className="nutrition-section" id="nutrition">
      <div className="nutrition-container">
        <div className="precision-image animate-float">
          <Image
            src="/images/nutrition.png"
            alt="KingMorph nutrition tracking app interface"
            width={480}
            height={560}
            style={{ objectFit: "contain", borderRadius: "24px" }}
            sizes="(max-width: 768px) 100vw, 480px"
            quality={80}
          />
        </div>

        <div className="nutrition-text">
          <h2>Track Workouts &amp; Nutrition</h2>
          <p>
            Log your progress and stay accountable every day. Everyone is unique.
            Our programs are designed for your specific morphology.
          </p>
          <a href="#precision" className="btn-primary">
            Download Now
          </a>
        </div>
      </div>
    </section>
  );
}
