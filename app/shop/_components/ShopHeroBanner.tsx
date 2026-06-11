import Image from "next/image";

export default function ShopHeroBanner() {
  return (
    <section className="shop-hero-banner">
      <div className="shop-hero-bg">
        <Image
          src="/images/shop-banner/Mens-womens.png"
          alt="KingMorph workout clothes collection"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="shop-hero-overlay" />
      <div className="shop-hero-content">
        <p className="shop-hero-label">KingMorph Collections</p>
        <h1>Workout Clothes<br />Collections</h1>
        <a href="#womens" className="btn-primary">Explore Now</a>
      </div>
    </section>
  );
}
