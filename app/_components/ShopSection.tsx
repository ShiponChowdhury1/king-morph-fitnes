"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { allProducts } from "../data/data";
import { useCart } from "../context/CartContext";

export default function ShopSection() {
  const { toggleWishlist, isInWishlist } = useCart();
  
  // Show first 8 products on the homepage
  const homepageProducts = allProducts.slice(0, 8);

  return (
    <section className="shop-section" id="shop">
      <div className="shop-header">
        <div className="shop-header-left">
          <h2>Shop MorphFit</h2>
          <p>Premium performance products</p>
        </div>
        <Link href="/products" className="view-all-btn">
          VIEW ALL
        </Link>
      </div>

      <div className="shop-grid">
        {homepageProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={80}
                />
              </Link>
              <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(product)}
                style={{ color: isInWishlist(product.id) ? "var(--accent)" : "inherit" }}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={16}
                  fill={isInWishlist(product.id) ? "var(--accent)" : "none"}
                  stroke={isInWishlist(product.id) ? "var(--accent)" : "currentColor"}
                  strokeWidth={2}
                />
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

      <div className="shop-footer">
        <Link href="/products" className="btn-secondary">
          Browse All Products
        </Link>
      </div>
    </section>
  );
}

