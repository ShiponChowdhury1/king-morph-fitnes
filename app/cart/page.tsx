"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaPlus, FaMinus, FaChevronLeft, FaTimes } from "react-icons/fa";
import { Navbar, Footer } from "../_components";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [shippingOption, setShippingOption] = useState("flat"); // flat, delivery, pickup

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.numericPrice * item.quantity, 0);
  
  let shippingCost = 0;
  if (shippingOption === "flat") shippingCost = 6.95;
  else if (shippingOption === "delivery") shippingCost = 2.00;
  else if (shippingOption === "pickup") shippingCost = 0.00;

  const total = subtotal + shippingCost;

  return (
    <div className="no-hero">
      <Navbar />
      
      <main style={{ minHeight: "80vh", padding: "60px 24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "40px", color: "var(--text-primary)" }}>
          My Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)" }}>
            <span style={{ fontSize: "64px", display: "block", marginBottom: "20px" }}>🛒</span>
            <h2 style={{ fontSize: "22px", marginBottom: "12px", color: "var(--text-primary)" }}>Your cart is currently empty.</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>Before you proceed to checkout, you must add some products to your shopping cart.</p>
            <Link href="/shop" className="btn btn-primary" style={{ display: "inline-block", padding: "14px 28px", borderRadius: "var(--radius-full)", textDecoration: "none", fontWeight: 600 }}>
              Return To Shop
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }} className="cart-content-layout">
            {/* Left Column: Cart items table & coupon */}
            <div style={{ flex: "1" }}>
              <div style={{ overflowX: "auto", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", padding: "20px", marginBottom: "30px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
                      <th style={{ textAlign: "left", padding: "12px 0", color: "var(--text-secondary)", fontSize: "14px", fontWeight: 600 }}>PRODUCT</th>
                      <th style={{ textAlign: "center", padding: "12px 0", color: "var(--text-secondary)", fontSize: "14px", fontWeight: 600 }}>PRICE</th>
                      <th style={{ textAlign: "center", padding: "12px 0", color: "var(--text-secondary)", fontSize: "14px", fontWeight: 600 }}>QUANTITY</th>
                      <th style={{ textAlign: "center", padding: "12px 0", color: "var(--text-secondary)", fontSize: "14px", fontWeight: 600 }}>SUBTOTAL</th>
                      <th style={{ textAlign: "right", padding: "12px 0" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={`${item.product.id}-${item.size}-${item.color}-${index}`} style={{ borderBottom: index === cartItems.length - 1 ? "none" : "1px solid var(--border-color)" }}>
                        {/* Product info */}
                        <td style={{ padding: "20px 0", display: "flex", alignItems: "center", gap: "16px" }}>
                          <div style={{ position: "relative", width: "80px", height: "80px", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "var(--product-bg)", flexShrink: 0 }}>
                            <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: "cover" }} sizes="80px" />
                          </div>
                          <div>
                            <h4 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 4px 0" }}>{item.product.name}</h4>
                            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Size: {item.size} | Color: {item.color}</span>
                          </div>
                        </td>
                        {/* Price */}
                        <td style={{ padding: "20px 0", textAlign: "center", fontWeight: 500, color: "var(--text-primary)" }}>
                          {item.product.price}
                        </td>
                        {/* Quantity controls */}
                        <td style={{ padding: "20px 0", textAlign: "center" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                              style={{ border: "none", background: "none", color: "var(--text-primary)", cursor: "pointer", padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <FaMinus size={10} />
                            </button>
                            <span style={{ padding: "0 12px", minWidth: "32px", fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", textAlign: "center" }}>
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                              style={{ border: "none", background: "none", color: "var(--text-primary)", cursor: "pointer", padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <FaPlus size={10} />
                            </button>
                          </div>
                        </td>
                        {/* Subtotal */}
                        <td style={{ padding: "20px 0", textAlign: "center", fontWeight: 600, color: "var(--accent)" }}>
                          ${(item.product.numericPrice * item.quantity).toLocaleString()}
                        </td>
                        {/* Remove button */}
                        <td style={{ padding: "20px 0", textAlign: "right" }}>
                          <button 
                            onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                            style={{ border: "none", background: "none", color: "var(--text-secondary)", cursor: "pointer", padding: "4px" }}
                            aria-label="Remove item"
                          >
                            <FaTimes size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "20px", alignItems: "center" }}>
                <Link href="/shop" style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-primary)", textDecoration: "none", fontWeight: 600, fontSize: "14px" }}>
                  <FaChevronLeft size={12} />
                  Return to shop
                </Link>

                {/* Coupon Code section */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>Coupon Code</h4>
                  <input 
                    type="text" 
                    placeholder="Enter code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{
                      padding: "12px 18px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      backgroundColor: "var(--bg-card)",
                      color: "var(--text-primary)",
                      minWidth: "150px",
                    }}
                  />
                  <button 
                    onClick={() => alert("Coupon applied successfully!")}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      border: "none",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="cart-summary-sidebar" style={{ width: "100%", maxWidth: "380px", flexShrink: 0 }}>
              <div style={{ backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", padding: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, borderBottom: "1px solid var(--border-color)", paddingBottom: "16px", marginBottom: "20px", color: "var(--text-primary)" }}>
                  Order Summary
                </h3>

                {/* Tiny product thumbnails list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  {cartItems.map((item, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ position: "relative", width: "40px", height: "40px", borderRadius: "var(--radius-sm)", overflow: "hidden", backgroundColor: "var(--product-bg)" }}>
                          <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: "cover" }} sizes="40px" />
                        </div>
                        <span style={{ fontSize: "13px", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}>
                          {item.product.name} x{item.quantity}
                        </span>
                      </div>
                      <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
                        ${(item.product.numericPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Subtotal:</span>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>${subtotal.toLocaleString()}</span>
                </div>

                {/* Shipping Selector */}
                <div style={{ marginBottom: "20px" }}>
                  <span style={{ display: "block", color: "var(--text-secondary)", fontSize: "14px", marginBottom: "12px" }}>Shipping:</span>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", cursor: "pointer" }}>
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={shippingOption === "flat"} 
                        onChange={() => setShippingOption("flat")}
                        style={{ accentColor: "var(--accent)" }}
                      />
                      Flat Rate: $6.95
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", cursor: "pointer" }}>
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={shippingOption === "delivery"} 
                        onChange={() => setShippingOption("delivery")}
                        style={{ accentColor: "var(--accent)" }}
                      />
                      Local Delivery: $2.00
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", cursor: "pointer" }}>
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={shippingOption === "pickup"} 
                        onChange={() => setShippingOption("pickup")}
                        style={{ accentColor: "var(--accent)" }}
                      />
                      Local Pickup
                    </label>
                  </div>

                  <a href="#" style={{ display: "inline-block", fontSize: "12px", color: "var(--text-secondary)", textDecoration: "underline", marginTop: "12px" }}>
                    Change Address
                  </a>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "16px", marginBottom: "24px" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Total: <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 400 }}>(Including tax)</span></span>
                  <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)" }}>${total.toLocaleString()}</span>
                </div>

                <Link
                  href="/checkout"
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    padding: "16px",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Proceed to checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Embedded Responsive styling styles */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .cart-content-layout {
            flex-direction: row !important;
          }
        }
        @media (max-width: 1023px) {
          .cart-content-layout {
            flex-direction: column !important;
          }
          .cart-summary-sidebar {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
