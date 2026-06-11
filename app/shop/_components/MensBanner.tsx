import Image from "next/image";

export default function MensBanner() {
  return (
    <section className="shop-category-banner" id="mens">
      <div className="category-banner-bg">
        <Image
          src="/images/shop-banner/Mens.png"
          alt="Men's Collection Banner"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="category-banner-overlay" />
      <div className="category-banner-content">
        <h2>Men&apos;s Workout Clothes<br />Collections</h2>
        <p>Engineered for strength, flexibility, and ultimate breathability.</p>
      </div>
    </section>
  );
}
