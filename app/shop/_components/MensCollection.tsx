"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { allProducts } from "../../data/data";
import { useCart } from "../../context/CartContext";

export default function MensCollection() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  // Filter only men's clothes (IDs 9 to 16)
  const mensProducts = allProducts.filter((p) => p.category === "men" && p.id >= 9 && p.id <= 16);

  return (
    <section className="collection-section">
      <div className="collection-container">
        <div className="collection-header">
          <h3>Men&apos;s New Arrivals</h3>
          <p>Designed to support your specific body type and goals</p>
        </div>

        <div className="collection-grid">
          {mensProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 50vw, 25vw"
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
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product, 1)}
                  aria-label="Add to cart"
                >
                  <ShoppingBag size={16} />
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
