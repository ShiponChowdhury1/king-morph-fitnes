import Image from "next/image";

export default function WomensBanner() {
  return (
    <section className="shop-category-banner" id="womens">
      <div className="category-banner-bg">
        <Image
          src="/images/shop-banner/Womens.png"
          alt="Women's Collection Banner"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="category-banner-overlay" />
      <div className="category-banner-content">
        <h2>Women&apos;s Workout Clothes<br />Collections</h2>
        <p>Engineered for fit, comfort, and ultimate performance.</p>
      </div>
    </section>
  );
}
