"use client";

import Image from "next/image";
import Link from "next/link";
import { FaShoppingBag, FaHeart } from "react-icons/fa";
import { allProducts } from "../../data/data";
import { useCart } from "../../context/CartContext";

export default function Accessories() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  // Filter accessories (IDs 21 to 24)
  const accessoriesProducts = allProducts.filter((p) => p.category === "accessories");

  return (
    <section className="accessories-section" id="accessories">
      <div className="accessories-container">
        <div className="accessories-header">
          <p className="section-label">Essential Gear</p>
          <h2>Accessories</h2>
          <p className="section-desc">Complete your training toolkit with premium fitness essentials.</p>
        </div>

        <div className="accessories-grid">
          {accessoriesProducts.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="product-image">
                <Link href={`/products/${item.id}`}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </Link>
                <button
                  className="wishlist-btn"
                  onClick={() => toggleWishlist(item)}
                  style={{ color: isInWishlist(item.id) ? "var(--accent)" : "inherit" }}
                  aria-label="Add to wishlist"
                >
                  <FaHeart
                    fill={isInWishlist(item.id) ? "var(--accent)" : "none"}
                    stroke="currentColor"
                    strokeWidth={isInWishlist(item.id) ? "0" : "2"}
                  />
                </button>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item, 1)}
                  aria-label="Add to cart"
                >
                  <FaShoppingBag />
                </button>
              </div>
              <div className="product-info">
                <Link href={`/products/${item.id}`} style={{ textDecoration: "none" }}>
                  <h4>{item.name}</h4>
                </Link>
                <span className="price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
