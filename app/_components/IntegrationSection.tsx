import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

export default function IntegrationSection() {
  return (
    <section className="integration-section" id="integration">
      <div className="integration-container">
        <div className="integration-text">
          <h2>Shop Integration</h2>
          <p>
            Browse and purchase curated fitness products, supplements, and
            apparel designed to support your specific body type and training
            goals. Everything you need in one place.
          </p>

          <ul className="check-list">
            <li>
              <span className="check-icon"><FaCheckCircle size={16} /></span>
              Curated product selection
            </li>
            <li>
              <span className="check-icon"><FaCheckCircle size={16} /></span>
              Exclusive discounts
            </li>
            <li>
              <span className="check-icon"><FaCheckCircle size={16} /></span>
              Wide variety of collections
            </li>
          </ul>

          <a href="#precision" className="btn-primary">
            Download Now
          </a>
        </div>

        <div className="precision-image animate-float">
          <Image
            src="/images/integration.png"
            alt="KingMorph shop integration interface"
            width={480}
            height={560}
            style={{ objectFit: "contain", borderRadius: "24px" }}
          />
        </div>
      </div>
    </section>
  );
}
