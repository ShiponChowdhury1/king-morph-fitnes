import Image from "next/image";

export default function WorkoutClothesShoes() {
  return (
    <section className="workout-clothes-section">
      <div className="workout-clothes-container">
        <div className="workout-clothes-text">
          <p className="section-label">Collections</p>
          <h2>Workout Clothes &amp; Shoes</h2>
          <p className="section-desc">
            Browse and purchase curated fitness products, supplements, and apparel
            designed to support your specific body type and training goals.
            Everything you need in one place.
          </p>
          <a href="#popular" className="btn-primary">Shop Now</a>
        </div>
        <div className="workout-clothes-images">
          <div className="wc-image-card">
            <Image
              src="/images/workout-Clothe-Shoes.png"
              alt="Workout clothes and shoes"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
          <div className="wc-image-card">
            <Image
              src="/images/workout-Clothe-Shoes2.png"
              alt="Premium workout apparel"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
