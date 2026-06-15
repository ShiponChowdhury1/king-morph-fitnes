"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Navbar, Footer } from "../../_components";
import { allProducts, Product } from "../../data/data";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;
  
  // Find product by id
  const product = allProducts.find((p) => p.id === Number(id));

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // State hooks
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specification" | "review">("review");
  const [reviewsLimit, setReviewsLimit] = useState(4);
  
  const wishlistActive = product ? isInWishlist(product.id) : false;

  const thumbnailsTrackRef = useRef<HTMLDivElement>(null);

  // Set default size and color when product loads
  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      setActiveImageIndex(0);
      setQuantity(1);
      setReviewsLimit(4);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="no-hero">
        <Navbar />
        <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, padding: 24 }}>
          <h2 style={{ fontSize: "24px", color: "var(--text-secondary)" }}>Product not found</h2>
          <Link href="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Thumbnails scroll controls
  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbnailsTrackRef.current) {
      const scrollAmount = 150;
      thumbnailsTrackRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleQtyChange = (action: "inc" | "dec") => {
    if (action === "inc") {
      setQuantity((q) => q + 1);
    } else if (action === "dec" && quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  // Filter 4 related products (excluding current product)
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="no-hero">
      <Navbar />
      
      <main className="product-detail-page">
        {/* Breadcrumb */}
        <div className="products-breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link href="/products">Products</Link>
          <span className="breadcrumb-separator">›</span>
          <span>{product.name}</span>
        </div>

        {/* Product Showcase & Info */}
        <div className="product-detail-container">
          
          {/* Left Column: Gallery */}
          <div className="gallery-container">
            <div className="main-image-wrapper">
              <Image
                src={product.images[activeImageIndex] || product.image}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 992px) 100vw, 50vw"
                priority
              />
            </div>
            
            {/* Thumbnails Row */}
            {product.images && product.images.length > 1 && (
              <div className="thumbnails-outer-wrapper">
                <button
                  className="thumb-nav-btn left"
                  onClick={() => scrollThumbnails("left")}
                  aria-label="Scroll gallery left"
                >
                  <ChevronLeft size={14} />
                </button>
                
                <div className="thumbnails-track" ref={thumbnailsTrackRef}>
                  {product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`thumbnail-card ${activeImageIndex === idx ? "active" : ""}`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="90px"
                      />
                    </div>
                  ))}
                </div>

                <button
                  className="thumb-nav-btn right"
                  onClick={() => scrollThumbnails("right")}
                  aria-label="Scroll gallery right"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Info details */}
          <div className="details-info-container">
            <div>
              <h1 className="details-title">{product.name}</h1>
              
              <div className="details-meta" style={{ marginTop: 12 }}>
                <div className="rating-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? "#ffb800" : "none"}
                      stroke={i < Math.floor(product.rating) ? "#ffb800" : "var(--border-light)"}
                    />
                  ))}
                  <span className="rating-text" style={{ marginLeft: 4 }}>
                    {product.rating} ({product.reviewsCount} Reviews)
                  </span>
                </div>
                <span className="meta-divider">|</span>
                <span className="sold-tag">{product.soldCount}</span>
                <span className="meta-divider">|</span>
                <span className="availability-tag">Availability: {product.availability}</span>
              </div>
            </div>

            {/* Price */}
            <div className="details-price-row">
              <span className="details-current-price">US${product.numericPrice}</span>
              {product.originalPrice && (
                <span className="details-original-price">
                  {product.originalPrice.includes("US$") ? product.originalPrice : `US$${product.originalPrice.replace("$", "").trim()}`}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="details-description">{product.description}</p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="selector-section">
                <span className="selector-title">Size: {selectedSize}</span>
                <div className="size-circles-group">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`size-circle-btn ${selectedSize === s ? "active" : ""}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="selector-section">
                <span className="selector-title">Color</span>
                <div className="pills-group">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className={`color-option-btn ${selectedColor === c ? "active" : ""}`}
                      onClick={() => setSelectedColor(c)}
                      aria-label={`Select color ${c}`}
                    >
                      <span className="color-option-inner" style={{ backgroundColor: c }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="qty-and-actions">
              <div className="qty-btn-group">
                <button className="qty-adjust-btn" onClick={() => handleQtyChange("dec")} aria-label="Decrease quantity">-</button>
                <div className="qty-display">{quantity.toString().padStart(2, "0")}</div>
                <button className="qty-adjust-btn" onClick={() => handleQtyChange("inc")} aria-label="Increase quantity">+</button>
              </div>

              <div className="detail-actions">
                <button
                  className="add-to-cart-large-btn"
                  onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                >
                  <ShoppingBag size={16} />
                  Add to cart
                </button>
                <button
                  className="add-to-wishlist-large-btn"
                  onClick={() => toggleWishlist(product)}
                  style={{ color: wishlistActive ? "var(--accent)" : "var(--text-primary)" }}
                >
                  <Heart size={16} fill={wishlistActive ? "var(--accent)" : "none"} stroke={wishlistActive ? "var(--accent)" : "currentColor"} strokeWidth={2} />
                  {wishlistActive ? "Added to wishlist" : "Add to wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab section */}
        <div className="detail-tabs-container">
          <button
            className={`detail-tab-btn ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`detail-tab-btn ${activeTab === "specification" ? "active" : ""}`}
            onClick={() => setActiveTab("specification")}
          >
            Specification
          </button>
          <button
            className={`detail-tab-btn ${activeTab === "review" ? "active" : ""}`}
            onClick={() => setActiveTab("review")}
          >
            Review
          </button>
        </div>

        <div className="detail-tab-content">
          {activeTab === "description" && (
            <div>
              <p className="tab-desc-text">{product.description}</p>
              
              <div className="tab-features-shipping">
                {/* Key Features */}
                <div>
                  <h4 className="tab-section-subtitle">Features</h4>
                  <div>
                    {product.features.map((feat, index) => (
                      <div key={index} className="features-list-item">
                        <div className="features-list-icon">
                          <Check size={10} />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Details */}
                <div>
                  <h4 className="tab-section-subtitle">Shipping Information</h4>
                  <table className="shipping-table">
                    <tbody>
                      <tr>
                        <td className="label">Delivery</td>
                        <td>4-7 days for normal shipping</td>
                      </tr>
                      <tr>
                        <td className="label">Local Shipping</td>
                        <td>Free shipping for orders above $150</td>
                      </tr>
                      <tr>
                        <td className="label">UPS Express</td>
                        <td>2-3 days delivery, $30.00 rate</td>
                      </tr>
                      <tr>
                        <td className="label">Wholesale / Bulk</td>
                        <td>2-4 days courier delivery, $50.00 rate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "specification" && (
            <div>
              <table className="specs-table">
                <tbody>
                  {product.specifications.map((spec, idx) => (
                    <tr key={idx}>
                      <td className="label">{spec.label}</td>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "review" && (
            <div>
              <div className="reviews-list">
                {product.reviews.slice(0, reviewsLimit).map((rev) => (
                  <div className="review-item" key={rev.id}>
                    <div className="review-header">
                      <div className="review-author-info">
                        <div className="review-avatar">
                          {rev.author.split(" ").map(w => w[0]).join("")}
                        </div>
                        <div>
                          <h4 className="review-author-name">{rev.author}</h4>
                          <div className="rating-stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                fill={i < rev.rating ? "#ffb800" : "none"}
                                stroke={i < rev.rating ? "#ffb800" : "var(--border-light)"}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="review-date">{rev.date}</span>
                    </div>
                    <p className="review-text">{rev.text}</p>
                  </div>
                ))}
              </div>

              {reviewsLimit < product.reviews.length && (
                <button
                  className="load-more-btn"
                  onClick={() => setReviewsLimit((limit) => limit + 2)}
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </div>

        {/* You Might Like Section */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h3>You might like</h3>
            <div className="products-grid">
              {relatedProducts.map((p) => (
                <div className="product-card" key={p.id}>
                  <div className="product-image">
                    <Link href={`/products/${p.id}`}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </Link>
                    <button
                      className="wishlist-btn"
                      onClick={() => toggleWishlist(p)}
                      style={{ color: isInWishlist(p.id) ? "var(--accent)" : "inherit" }}
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        size={16}
                        fill={isInWishlist(p.id) ? "var(--accent)" : "none"}
                        stroke={isInWishlist(p.id) ? "var(--accent)" : "currentColor"}
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                  <div className="product-info">
                    <Link href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
                      <h4>{p.name}</h4>
                    </Link>
                    <span className="price">{p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
