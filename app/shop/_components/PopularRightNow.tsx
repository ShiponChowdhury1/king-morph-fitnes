"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";
import { allProducts } from "../../data/data";
import { useCart } from "../../context/CartContext";

export default function PopularRightNow() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { toggleWishlist, isInWishlist } = useCart();

  // Filter popular products (IDs 17 to 20)
  const popularProducts = allProducts.filter((p) => p.id >= 17 && p.id <= 20);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth / 2;
      sliderRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="popular-section" id="popular">
      <div className="popular-container">
        <div className="popular-header">
          <div>
            <p className="section-label">Trending Now</p>
            <h2>Popular Right Now</h2>
          </div>
          <div className="slider-controls">
            <button className="slider-btn" onClick={() => scroll("left")} aria-label="Previous">
              <FaChevronLeft />
            </button>
            <button className="slider-btn" onClick={() => scroll("right")} aria-label="Next">
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="popular-slider" ref={sliderRef}>
          {popularProducts.map((product) => (
            <div className="product-card popular-card" key={product.id}>
              <div className="product-image">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </Link>
                <button
                  className="wishlist-btn"
                  onClick={() => toggleWishlist(product)}
                  style={{ color: isInWishlist(product.id) ? "var(--accent)" : "inherit" }}
                  aria-label="Add to wishlist"
                >
                  <FaHeart fill={isInWishlist(product.id) ? "var(--accent)" : "none"} stroke="currentColor" strokeWidth={isInWishlist(product.id) ? "0" : "2"} />
                </button>
              </div>
              <div className="product-info">
                <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
                  <h4>{product.name}</h4>
                </Link>
                <span className="price">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
