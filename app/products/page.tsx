"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaHeart, FaFilter, FaTh, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { Navbar, Footer } from "../_components";
import { allProducts, Product } from "../data/data";
import { useCart } from "../context/CartContext";

const ITEMS_PER_PAGE = 8;

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const { toggleWishlist, isInWishlist } = useCart();

  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Applied filter states
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [collection, setCollection] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  // Temporary drawer states
  const [tempPriceRanges, setTempPriceRanges] = useState<string[]>([]);
  const [tempCollection, setTempCollection] = useState<string | null>(null);
  const [tempSize, setTempSize] = useState<string | null>(null);
  const [tempCategory, setTempCategory] = useState<string | null>(null);

  const openDrawer = () => {
    setTempPriceRanges(priceRanges);
    setTempCollection(collection);
    setTempSize(size);
    setTempCategory(category);
    setIsDrawerOpen(true);
  };

  const applyFilters = () => {
    setPriceRanges(tempPriceRanges);
    setCollection(tempCollection);
    setSize(tempSize);
    setCategory(tempCategory);
    setIsDrawerOpen(false);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setTempPriceRanges([]);
    setTempCollection(null);
    setTempSize(null);
    setTempCategory(null);
    setPriceRanges([]);
    setCollection(null);
    setSize(null);
    setCategory(null);
    setIsDrawerOpen(false);
    setCurrentPage(1);
  };

  const handlePriceCheckboxChange = (range: string) => {
    if (tempPriceRanges.includes(range)) {
      setTempPriceRanges(tempPriceRanges.filter((r) => r !== range));
    } else {
      setTempPriceRanges([...tempPriceRanges, range]);
    }
  };

  // Filter products logic
  const filteredProducts = allProducts.filter((product) => {
    if (searchParam) {
      const query = searchParam.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    if (priceRanges.length > 0) {
      const matchesPrice = priceRanges.some((range) => {
        if (range === "< $25") return product.numericPrice < 25;
        if (range === "$25-50") return product.numericPrice >= 25 && product.numericPrice <= 50;
        if (range === "$50-75") return product.numericPrice >= 50 && product.numericPrice <= 75;
        if (range === "$75-100") return product.numericPrice >= 75 && product.numericPrice <= 100;
        if (range === "$1000+") return product.numericPrice >= 1000;
        return true;
      });
      if (!matchesPrice) return false;
    }

    if (collection) {
      if (product.collection !== collection) return false;
    }

    if (size) {
      if (!product.sizes.includes(size)) return false;
    }

    if (category) {
      if (category === "accessories" && product.category !== "accessories") return false;
      if (category === "best_seller" && product.rating < 4.8) return false;
      if (category === "men" && product.category !== "men") return false;
      if (category === "women" && product.category !== "women") return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="no-hero">
      <Navbar />
      <main className="products-page">
        {/* Breadcrumb */}
        <div className="products-breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <span>Products</span>
          {searchParam && (
            <>
              <span className="breadcrumb-separator">›</span>
              <span>Search: &quot;{searchParam}&quot;</span>
            </>
          )}
        </div>

        {/* Filter Bar */}
        <div className="products-filter-bar">
          <div className="filter-tabs">
            <button className="filter-tab active" onClick={openDrawer}>
              <FaFilter size={12} />
              Filters
            </button>
            {(priceRanges.length > 0 || collection || size || category) && (
              <button className="filter-tab" onClick={clearAllFilters} style={{ color: "var(--accent)" }}>
                Clear Filters
              </button>
            )}
          </div>
          <div className="filter-meta">
            <span className="product-count">{filteredProducts.length} Results</span>
            <button className="grid-toggle" aria-label="Grid view">
              <FaTh size={16} />
            </button>
          </div>
        </div>

        {searchParam && (
          <h2 style={{ fontSize: "16px", marginBottom: "20px", color: "var(--text-secondary)" }}>
            Showing results for &quot;{searchParam}&quot;
            <Link href="/products" style={{ marginLeft: "10px", color: "var(--accent)", textDecoration: "underline", fontSize: "14px" }}>
              Clear Search
            </Link>
          </h2>
        )}

        <h1 className="products-title">Browse Our Collections</h1>

        {/* Product Grid */}
        {currentProducts.length > 0 ? (
          <div className="products-grid">
            {currentProducts.map((product) => (
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
                    <FaHeart
                      size={14}
                      fill={isInWishlist(product.id) ? "var(--accent)" : "none"}
                      stroke="currentColor"
                      strokeWidth={isInWishlist(product.id) ? "0" : "2"}
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
        ) : (
          <div style={{ textAlign: "center", padding: "80px 24px", color: "var(--text-secondary)" }}>
            <p style={{ fontSize: "18px", marginBottom: "16px" }}>No products matches your filters.</p>
            <button className="btn-secondary" onClick={clearAllFilters}>Reset Filters</button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <FaChevronLeft size={12} />
              Previous
            </button>

            <div className="pagination-pages">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-page ${currentPage === page ? "active" : ""}`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="pagination-btn"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </main>
      <Footer />

      {/* ============ FILTER SIDEBAR DRAWER ============ */}
      <div
        className={`filter-backdrop ${isDrawerOpen ? "open" : ""}`}
        onClick={() => setIsDrawerOpen(false)}
      />
      <div className={`filter-drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="filter-drawer-header">
          <h2>Filter</h2>
          <button className="filter-drawer-close" onClick={() => setIsDrawerOpen(false)} aria-label="Close Filter">
            <FaTimes />
          </button>
        </div>

        <div className="filter-drawer-body">
          {/* Price Range */}
          <div className="filter-section">
            <h3 className="filter-section-title">Price</h3>
            <div className="price-checkbox-group">
              {["< $25", "$25-50", "$50-75", "$75-100", "$1000+"].map((range) => (
                <label key={range} className="price-checkbox-label">
                  <input
                    type="checkbox"
                    checked={tempPriceRanges.includes(range)}
                    onChange={() => handlePriceCheckboxChange(range)}
                  />
                  <span>{range}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div className="filter-section">
            <h3 className="filter-section-title">Collection</h3>
            <div className="pills-group">
              {[
                { label: "SESSION", value: "session" },
                { label: "Gym", value: "gym" },
                { label: "Men's", value: "men" },
                { label: "Women's", value: "women" },
              ].map((c) => (
                <button
                  key={c.value}
                  className={`pill-btn ${tempCollection === c.value ? "active" : ""}`}
                  onClick={() => setTempCollection(tempCollection === c.value ? null : c.value)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="filter-section">
            <h3 className="filter-section-title">Size</h3>
            <div className="size-circles-group">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  className={`size-circle-btn ${tempSize === s ? "active" : ""}`}
                  onClick={() => setTempSize(tempSize === s ? null : s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="filter-section">
            <h3 className="filter-section-title">Category</h3>
            <div className="pills-group">
              {[
                { label: "ACCESSORIES", value: "accessories" },
                { label: "Best Seller", value: "best_seller" },
                { label: "Men's Cloth", value: "men" },
                { label: "Women's Cloth", value: "women" },
              ].map((cat) => (
                <button
                  key={cat.value}
                  className={`pill-btn ${tempCategory === cat.value ? "active" : ""}`}
                  onClick={() => setTempCategory(tempCategory === cat.value ? null : cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-drawer-footer">
          <button className="results-btn" onClick={applyFilters}>
            Results
          </button>
          <button className="clear-all-link" onClick={clearAllFilters}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="no-hero">
        <Navbar />
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "18px" }}>Loading products page...</p>
        </div>
        <Footer />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
