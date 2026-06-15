import Image from "next/image";

const morphTypes = [
  {
    type: "ECTOMORPH",
    image: "/images/matters/matter-1 (1).jpg",
    description:
      "Lean build, fast metabolism. Training focused on strength and muscle building.",
  },
  {
    type: "MESOMORPH",
    image: "/images/matters/matter-1 (2).jpg",
    description:
      "Athletic build, balanced metabolism. Training optimized for performance and aesthetics.",
  },
  {
    type: "ENDOMORPH",
    image: "/images/matters/matter-1 (3).jpg",
    description:
      "Strong build, slower metabolism. Training designed for fat loss and muscle definition.",
  },
];

export default function MattersSection() {
  return (
    <section className="matters-section" id="morphology">
      <div className="section-container">
        <div className="matters-header">
          <p className="label">Your Morphology Matters</p>
          <h2>Personalized training based on your unique body type.</h2>
        </div>

        <div className="matters-grid">
          {morphTypes.map((morph) => (
            <div className="morph-card" key={morph.type}>
              <div className="morph-card-image">
                <Image
                  src={morph.image}
                  alt={`${morph.type} body type`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={80}
                />
              </div>
              <div className="morph-card-overlay" />
              <div className="morph-card-content">
                <h3>{morph.type}</h3>
                <p>{morph.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
