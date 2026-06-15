"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon, Menu, X, Search, Heart, ShoppingBag, User, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { allProducts } from "../data/data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const {
    cartItems,
    wishlistItems,
    cartOpen,
    setCartOpen,
    wishlistOpen,
    setWishlistOpen,
    removeFromCart,
    toggleWishlist,
    user,
    setUser,
  } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Search Overlay states
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("kingmorph-theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    } else {
      document.documentElement.classList.remove("light");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation & body scroll lock for search overlay & drawers
  useEffect(() => {
    if (searchOpen || cartOpen || wishlistOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSearchOpen(false);
          setCartOpen(false);
          setWishlistOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [searchOpen, cartOpen, wishlistOpen, setCartOpen, setWishlistOpen]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("kingmorph-theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  const handleLinkClick = () => setMobileOpen(false);

  // Search Logic
  const popularSuggestions = ["V-Neck", "Short Sleeve", "Compression Tights", "Seamless Sports Bra", "Gym Bag"];
  
  const currentSuggestions = searchQuery.trim() === ""
    ? popularSuggestions
    : popularSuggestions.filter(term => term.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredSearchProducts = searchQuery.trim() === ""
    ? allProducts.slice(0, 4) // Show some recommendations if search is empty
    : allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="navbar-container">
          <Link href="/" className="navbar-logo" style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={!mounted ? "/images/logoLight.png" : (theme === "light" ? "/images/logoDark.png" : "/images/logoLight.png")}
              alt="KingMorph Logo"
              width={160}
              height={32}
              priority
              style={{ height: "32px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            {/* Search Icon Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="navbar-icon-btn"
              aria-label="Search products"
              style={{ background: "none", outline: "none", cursor: "pointer" }}
            >
              <Search size={18} />
            </button>

            <button
              onClick={() => setWishlistOpen(true)}
              className="navbar-icon-btn"
              aria-label="Wishlist"
              style={{ background: "none", border: "none", outline: "none", cursor: "pointer", position: "relative" }}
            >
              <Heart size={18} />
              {wishlistItems.length > 0 && (
                <span className="cart-badge" style={{ backgroundColor: "var(--accent)" }}>{wishlistItems.length}</span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="navbar-icon-btn"
              aria-label="Shopping bag"
              style={{ background: "none", border: "none", outline: "none", cursor: "pointer", position: "relative" }}
            >
              <ShoppingBag size={18} />
              {cartItems.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
                <span className="cart-badge">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="navbar-icon-btn"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user.isLoggedIn ? (
              <div className="navbar-profile-container" style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                    borderRadius: "50%",
                    overflow: "hidden"
                  }}
                  aria-label="User profile"
                >
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid var(--accent)",
                    position: "relative"
                  }}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </button>

                {profileOpen && (
                  <>
                    <div 
                      onClick={() => setProfileOpen(false)}
                      style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 998,
                        background: "transparent"
                      }}
                    />
                    
                    <div
                      className="profile-dropdown"
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "calc(100% + 16px)",
                        width: "280px",
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
                        padding: "24px",
                        zIndex: 999,
                        border: "1px solid #eaeaea",
                        color: "#000000"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                          <img src={user.avatar} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ overflow: "hidden", textAlign: "left" }}>
                          <h4 style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 2px 0", color: "#000000", fontFamily: "var(--font-inter)" }}>
                            {user.name}
                          </h4>
                          <p style={{ fontSize: "12px", color: "#666666", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div style={{ height: "1px", backgroundColor: "#eaeaea", margin: "14px 0" }} />

                      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                        <Link 
                          href="/profile?tab=profile" 
                          onClick={() => setProfileOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            color: "#000000",
                            textDecoration: "none",
                            fontSize: "13px",
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            fontFamily: "var(--font-inter)"
                          }}
                        >
                          <User size={14} style={{ color: "#000000" }} />
                          PROFILE
                        </Link>

                        <button 
                          onClick={() => {
                            setProfileOpen(false);
                            setCartOpen(true);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            margin: 0,
                            cursor: "pointer",
                            width: "100%",
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            color: "#000000",
                            fontSize: "13px",
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            fontFamily: "var(--font-inter)"
                          }}
                        >
                          <ShoppingBag size={14} style={{ color: "#000000" }} />
                          CART ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                        </button>

                        <Link 
                          href="/profile?tab=saved" 
                          onClick={() => setProfileOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            color: "#000000",
                            textDecoration: "none",
                            fontSize: "13px",
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            fontFamily: "var(--font-inter)"
                          }}
                        >
                          <Heart size={14} style={{ color: "#000000" }} />
                          SAVED ITEMS
                        </Link>
                      </div>

                      <div style={{ height: "1px", backgroundColor: "#eaeaea", margin: "14px 0" }} />

                      <button
                        onClick={() => {
                          setUser({ ...user, isLoggedIn: false });
                          setProfileOpen(false);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          margin: 0,
                          cursor: "pointer",
                          width: "100%",
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          color: "#000000",
                          fontSize: "13px",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          fontFamily: "var(--font-inter)"
                        }}
                      >
                        <LogOut size={14} style={{ color: "#000000" }} />
                        SIGN OUT
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/signin"
                className="navbar-signin"
              >
                Sign In
              </Link>
            )}

            <button
              className="navbar-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu"
          style={{ position: "absolute", top: 24, right: 24 }}
        >
          <X size={24} />
        </button>
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} onClick={handleLinkClick}>
            {link.label}
          </Link>
        ))}
        
        <div className="navbar-mobile-icons">
          <button
            onClick={() => {
              handleLinkClick();
              setSearchOpen(true);
            }}
            className="navbar-icon-btn"
            aria-label="Search"
            style={{ background: "none", outline: "none", cursor: "pointer" }}
          >
            <Search size={18} />
          </button>
          <button
            onClick={() => {
              handleLinkClick();
              setWishlistOpen(true);
            }}
            className="navbar-icon-btn"
            aria-label="Wishlist"
            style={{ background: "none", border: "none", outline: "none", cursor: "pointer", position: "relative" }}
          >
            <Heart size={18} />
            {wishlistItems.length > 0 && (
              <span className="cart-badge" style={{ backgroundColor: "var(--accent)" }}>{wishlistItems.length}</span>
            )}
          </button>
          <button
            onClick={() => {
              handleLinkClick();
              setCartOpen(true);
            }}
            className="navbar-icon-btn"
            aria-label="Cart"
            style={{ background: "none", border: "none", outline: "none", cursor: "pointer", position: "relative" }}
          >
            <ShoppingBag size={18} />
            {cartItems.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
              <span className="cart-badge">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 16 }}>
          <button
            onClick={() => {
              toggleTheme();
              handleLinkClick();
            }}
            className="theme-toggle"
            style={{ marginRight: 0, padding: "12px 24px", border: "1px solid var(--border-light)", width: "100%", borderRadius: "var(--radius-full)" }}
          >
            {theme === "dark" ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Sun size={16} /> Light Mode</span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Moon size={16} /> Dark Mode</span>
            )}
          </button>
          
          <Link
            href="/signin"
            className="navbar-signin"
            style={{ 
              display: "block", 
              textAlign: "center", 
              width: 140, 
              textDecoration: "none",
              color: theme === "light" ? "#ffffff" : "#000000",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "normal"
            }}
            onClick={handleLinkClick}
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* ============ SEARCH OVERLAY ============ */}
      <div
        className={`search-overlay ${searchOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.98)" : "rgba(10, 10, 10, 0.98)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          zIndex: 99999,
          display: searchOpen ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          padding: "80px 24px 40px",
          overflowY: "auto",
        }}
      >
        <div
          className="search-container"
          style={{
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          {/* Top input bar */}
          <div
            className="search-input-wrapper"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-full)",
              padding: "14px 28px",
              gap: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <Search size={20} style={{ color: "var(--text-secondary)" }} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={searchOpen}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text-primary)",
                fontSize: "18px",
                width: "100%",
              }}
            />
            <button
              className="search-close-btn"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              aria-label="Close search"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px",
                transition: "transform 0.2s",
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Suggestions */}
          {currentSuggestions.length > 0 && (
            <div
              className="search-suggestions-section"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                className="search-suggestions-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  Suggestions
                </h3>
                <Link
                  href={`/products?search=${encodeURIComponent(searchQuery)}`}
                  className="see-all-link"
                  onClick={() => setSearchOpen(false)}
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  See All
                </Link>
              </div>
              <div
                className="search-suggestions-list"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "8px",
                }}
              >
                {currentSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="search-suggestion-item"
                    onClick={() => {
                      setSearchQuery(suggestion);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "var(--text-secondary)",
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "var(--radius-full)",
                      padding: "8px 18px",
                      fontSize: "14px",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      width: "auto",
                      textAlign: "left",
                    }}
                  >
                    <Search size={12} style={{ color: "var(--text-muted)" }} />
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recommended / Search Results */}
          <div
            className="search-products-section"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <div
              className="search-products-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                {searchQuery ? "Search Results" : "Recommended Products"}
              </h3>
              <Link
                href="/products"
                className="see-all-link"
                onClick={() => setSearchOpen(false)}
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                See All
              </Link>
            </div>
            {filteredSearchProducts.length > 0 ? (
              <div
                className="search-products-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                  gap: "20px",
                  marginTop: "8px",
                }}
              >
                {filteredSearchProducts.map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="product-card"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "var(--bg-card)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      border: "1px solid var(--border-color)",
                      textDecoration: "none",
                      height: "100%",
                    }}
                  >
                    <div
                      className="product-image"
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "1",
                        backgroundColor: "var(--product-bg)",
                      }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="170px"
                      />
                    </div>
                    <div
                      className="product-info"
                      style={{
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        flexGrow: 1,
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          margin: 0,
                          lineHeight: "1.4",
                        }}
                      >
                        {product.name}
                      </h4>
                      <span
                        className="price"
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "var(--accent)",
                          marginTop: "auto",
                        }}
                      >
                        {product.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: "center", color: "var(--text-secondary)", marginTop: 20 }}>
                No products found matching &quot;{searchQuery}&quot;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ==================== CART DRAWER ==================== */}
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 99998,
          opacity: cartOpen ? 1 : 0,
          visibility: cartOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
        }}
      />
      {/* Drawer Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "var(--bg-primary)",
          borderLeft: "1px solid var(--border-color)",
          boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.25)",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          transform: cartOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          visibility: cartOpen ? "visible" : "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
            Shopping Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </h3>
          <button
            onClick={() => setCartOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart items list */}
        <div style={{ flexGrow: 1, overflowY: "auto", padding: "24px" }}>
          {cartItems.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "16px" }}>
              <span style={{ fontSize: "48px" }}>🛒</span>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px", margin: 0 }}>Your cart is empty</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  window.location.href = "/shop";
                }}
                className="btn btn-primary"
                style={{ padding: "12px 24px", borderRadius: "var(--radius-full)" }}
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {cartItems.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}-${index}`}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                    borderBottom: "1px solid var(--border-color)",
                    paddingBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "80px",
                      height: "80px",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      backgroundColor: "var(--product-bg)",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="80px"
                    />
                  </div>
                  <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                    <h4
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        margin: 0,
                        color: "var(--text-primary)",
                        lineHeight: "1.3",
                      }}
                    >
                      {item.product.name}
                    </h4>
                    <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                      Size: {item.size} | Color: {item.color}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent)" }}>
                      {item.quantity} x {item.product.price}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      padding: "4px",
                    }}
                    aria-label="Remove item"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: "24px",
              borderTop: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-card)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "15px", color: "var(--text-secondary)", fontWeight: 500 }}>
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Products
              </span>
              <span style={{ fontSize: "20px", color: "var(--text-primary)", fontWeight: 700 }}>
                ${cartItems.reduce((acc, item) => acc + item.product.numericPrice * item.quantity, 0).toLocaleString()}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Checkout
            </Link>

            <Link
              href="/cart"
              onClick={() => setCartOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--border-color)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-primary)")}
            >
              Go To Cart
            </Link>
          </div>
        )}
      </div>

      {/* ==================== WISHLIST DRAWER ==================== */}
      {/* Backdrop */}
      <div
        onClick={() => setWishlistOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 99998,
          opacity: wishlistOpen ? 1 : 0,
          visibility: wishlistOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
        }}
      />
      {/* Drawer Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "var(--bg-primary)",
          borderLeft: "1px solid var(--border-color)",
          boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.25)",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          transform: wishlistOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          visibility: wishlistOpen ? "visible" : "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
            Wishlist ({wishlistItems.length})
          </h3>
          <button
            onClick={() => setWishlistOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Wishlist items list */}
        <div style={{ flexGrow: 1, overflowY: "auto", padding: "24px" }}>
          {wishlistItems.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "16px" }}>
              <span style={{ fontSize: "48px" }}>❤️</span>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px", margin: 0 }}>Your wishlist is empty</p>
              <button
                onClick={() => {
                  setWishlistOpen(false);
                  window.location.href = "/shop";
                }}
                className="btn btn-primary"
                style={{ padding: "12px 24px", borderRadius: "var(--radius-full)" }}
              >
                Find Products
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {wishlistItems.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                    borderBottom: "1px solid var(--border-color)",
                    paddingBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "80px",
                      height: "80px",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      backgroundColor: "var(--product-bg)",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="80px"
                    />
                  </div>
                  <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                    <h4
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        margin: 0,
                        color: "var(--text-primary)",
                        lineHeight: "1.3",
                      }}
                    >
                      {product.name}
                    </h4>
                    <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                      Category: {product.category}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent)" }}>
                      {product.price}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleWishlist(product)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      padding: "4px",
                    }}
                    aria-label="Remove item"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div
            style={{
              padding: "24px",
              borderTop: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-card)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <button
              onClick={() => {
                setWishlistOpen(false);
                window.location.href = "/products";
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View Full Wishlist
            </button>

            <button
              onClick={() => {
                setWishlistOpen(false);
                setCartOpen(true);
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--border-color)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-primary)")}
            >
              Go To Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
