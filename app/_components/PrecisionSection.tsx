import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function PrecisionSection() {
  return (
    <section className="precision-section" id="precision">
      <div className="precision-container">
        <div className="precision-text">
          <p className="label">Performance Meets Precision</p>
          <h2>
            King Morph combines AI-driven coaching, personalized
            morphology-based training, and premium performance apparel into one
            ecosystem.
          </h2>
          <div className="app-store-buttons">
            <a href="#" className="store-btn">
              <FaApple size={24} />
              <div className="store-btn-text">
                <small>Download on the</small>
                <span>App Store</span>
              </div>
            </a>
            <a href="#" className="store-btn">
              <FaGooglePlay size={22} />
              <div className="store-btn-text">
                <small>GET IT ON</small>
                <span>Google Play</span>
              </div>
            </a>
          </div>
        </div>

        <div className="precision-image animate-float">
          <Image
            src="/images/preclsion.png"
            alt="KingMorph app interface showing morphology-based training"
            width={480}
            height={560}
            style={{ objectFit: "contain", borderRadius: "24px" }}
          />
        </div>
      </div>
    </section>
  );
}
