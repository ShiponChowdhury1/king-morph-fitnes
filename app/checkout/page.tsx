"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaCreditCard, FaPaypal, FaLock, FaChevronLeft, FaTag } from "react-icons/fa";
import { Navbar, Footer } from "../_components";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  
  // Checkout flow state: "billing" | "processing" | "success" | "failure"
  const [step, setStep] = useState<"billing" | "processing" | "success" | "failure">("billing");
  
  // Keep copy of cart items for the order success summary modal
  const [orderSummaryItems, setOrderSummaryItems] = useState<typeof cartItems>([]);

  // Form input states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("United States");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  // Shipping
  const [shippingOption, setShippingOption] = useState("flat");
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.numericPrice * item.quantity, 0);
  
  let shippingCost = 0;
  if (shippingOption === "flat") shippingCost = 6.95;
  else if (shippingOption === "delivery") shippingCost = 2.00;
  else if (shippingOption === "pickup") shippingCost = 0.00;

  const total = subtotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to place your order.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Save cart items in local state so we can render them in order summary box
    setOrderSummaryItems([...cartItems]);

    // Go to loading/processing screen
    setStep("processing");

    setTimeout(() => {
      // Failure trigger: card number contains "4000" or ends with "0000"
      if (paymentMethod === "card" && (cardNumber.includes("4000") || cardNumber.endsWith("0000"))) {
        setStep("failure");
      } else {
        setStep("success");
        clearCart();
      }
    }, 2000);
  };

  return (
    <div className="no-hero">
      <Navbar />
      
      <main style={{ minHeight: "80vh", padding: "60px 24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <div style={{ marginBottom: "32px" }}>
          <Link href="/cart" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
            <FaChevronLeft size={12} />
            Back to Cart
          </Link>
          <h1 style={{ fontSize: "32px", fontWeight: 800, marginTop: "16px", marginBottom: "8px", color: "var(--text-primary)" }}>
            Checkout
          </h1>
        </div>

        {/* Promo Bar */}
        <div style={{
          backgroundColor: "var(--bg-card)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-color)",
          padding: "16px 20px",
          marginBottom: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-primary)" }}>
            <FaTag color="var(--accent)" />
            <span style={{ fontSize: "14px", fontWeight: 500 }}>Have a coupon?</span>
          </div>
          <button 
            onClick={() => setCouponOpen(!couponOpen)}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent)",
              fontWeight: 600,
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            {couponOpen ? "Close panel" : "Click here to enter your code"}
          </button>
        </div>

        {couponOpen && (
          <div style={{
            backgroundColor: "var(--bg-card)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-color)",
            padding: "20px",
            marginBottom: "30px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            maxWidth: "500px"
          }}>
            <input 
              type="text" 
              placeholder="Coupon Code" 
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              style={{
                flexGrow: 1,
                padding: "12px 16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
            <button 
              onClick={() => {
                alert("Coupon applied!");
                setCouponOpen(false);
              }}
              style={{
                padding: "12px 20px",
                borderRadius: "var(--radius-md)",
                backgroundColor: "#000000",
                color: "#ffffff",
                border: "none",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Apply
            </button>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "40px" }} className="checkout-content-layout">
          {/* Left Column: Billing Details */}
          <div style={{ flex: 1 }}>
            <div style={{ backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", padding: "32px", marginBottom: "30px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px", color: "var(--text-primary)" }}>
                Billing Information
              </h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="grid-2-col">
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>First Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>Last Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="grid-2-col">
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>Country / Region *</label>
                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Bangladesh</option>
                </select>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>Street Address *</label>
                <input 
                  type="text" 
                  placeholder="House number and street name" 
                  required 
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", marginBottom: "12px" }}
                />
                <input 
                  type="text" 
                  placeholder="Apartment, suite, unit, etc. (optional)" 
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "20px" }} className="grid-3-col">
                <div style={{ gridColumn: "span 1" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>Town / City *</label>
                  <input 
                    type="text" 
                    required 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>
                <div style={{ gridColumn: "span 1" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>State *</label>
                  <input 
                    type="text" 
                    required 
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>
                <div style={{ gridColumn: "span 1" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>ZIP Code *</label>
                  <input 
                    type="text" 
                    required 
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "20px", marginTop: "24px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>Order Notes (Optional)</label>
                <textarea 
                  placeholder="Notes about your order, e.g. special notes for delivery." 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100px", fontFamily: "inherit" }}
                />
              </div>
            </div>

            {/* Payment Method section */}
            <div style={{ backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", padding: "32px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "10px" }}>
                <FaLock size={16} color="var(--accent)" /> Payment Details
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                {/* Credit card option */}
                <label style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "16px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  backgroundColor: paymentMethod === "card" ? "rgba(var(--accent-rgb), 0.05)" : "transparent",
                  cursor: "pointer"
                }}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    style={{ marginTop: "4px", accentColor: "var(--accent)" }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>Pay with Credit Card</span>
                      <FaCreditCard size={18} color="var(--text-secondary)" />
                    </div>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>Safe money transfer using your bank account. We support Mastercard, Visa, and Discover.</p>

                    {paymentMethod === "card" && (
                      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Card Number</label>
                          <input 
                            type="text" 
                            placeholder="Card Number" 
                            required={paymentMethod === "card"}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            style={{ width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "14px" }}
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Expiry Date</label>
                            <input 
                              type="text" 
                              placeholder="MM/YY" 
                              required={paymentMethod === "card"}
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                              style={{ width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "14px" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>CVC / CVV</label>
                            <input 
                              type="text" 
                              placeholder="CVC" 
                              required={paymentMethod === "card"}
                              value={cvc}
                              onChange={(e) => setCvc(e.target.value)}
                              style={{ width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "14px" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* PayPal option */}
                <label style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "16px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  backgroundColor: paymentMethod === "paypal" ? "rgba(var(--accent-rgb), 0.05)" : "transparent",
                  cursor: "pointer"
                }}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    style={{ marginTop: "4px", accentColor: "var(--accent)" }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>PayPal</span>
                      <FaPaypal size={18} color="#003087" />
                    </div>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>You will be redirected to the PayPal website to complete your purchase securely.</p>
                  </div>
                </label>
              </div>

              {/* Terms checkbox */}
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "var(--text-secondary)", cursor: "pointer", userSelect: "none" }}>
                <input 
                  type="checkbox" 
                  required 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  style={{ marginTop: "3px", accentColor: "var(--accent)" }}
                />
                <span>I have read and agree to the website <a href="#" style={{ color: "var(--accent)", textDecoration: "underline" }}>terms and conditions</a> *</span>
              </label>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="checkout-summary-sidebar" style={{ width: "100%", maxWidth: "380px", flexShrink: 0 }}>
            <div style={{ backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", padding: "24px", position: "sticky", top: "100px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, borderBottom: "1px solid var(--border-color)", paddingBottom: "16px", marginBottom: "20px", color: "var(--text-primary)" }}>
                Your Order
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px", maxHeight: "280px", overflowY: "auto" }}>
                {cartItems.map((item, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ position: "relative", width: "50px", height: "50px", borderRadius: "var(--radius-sm)", overflow: "hidden", backgroundColor: "var(--product-bg)", flexShrink: 0 }}>
                        <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: "cover" }} sizes="50px" />
                      </div>
                      <div>
                        <h4 style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 2px 0", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.product.name}
                        </h4>
                        <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                          Qty: {item.quantity} | Size: {item.size}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                      ${(item.product.numericPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px", borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
                <span style={{ color: "var(--text-secondary)" }}>Subtotal</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>${subtotal.toLocaleString()}</span>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <span style={{ display: "block", color: "var(--text-secondary)", fontSize: "14px", marginBottom: "10px" }}>Shipping Options:</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-primary)", cursor: "pointer" }}>
                    <input 
                      type="radio" 
                      name="shipping_checkout" 
                      checked={shippingOption === "flat"} 
                      onChange={() => setShippingOption("flat")}
                      style={{ accentColor: "var(--accent)" }}
                    />
                    Flat Rate: $6.95
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-primary)", cursor: "pointer" }}>
                    <input 
                      type="radio" 
                      name="shipping_checkout" 
                      checked={shippingOption === "delivery"} 
                      onChange={() => setShippingOption("delivery")}
                      style={{ accentColor: "var(--accent)" }}
                    />
                    Local Delivery: $2.00
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-primary)", cursor: "pointer" }}>
                    <input 
                      type="radio" 
                      name="shipping_checkout" 
                      checked={shippingOption === "pickup"} 
                      onChange={() => setShippingOption("pickup")}
                      style={{ accentColor: "var(--accent)" }}
                    />
                    Local Pickup
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "16px", marginBottom: "24px" }}>
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>Total</span>
                <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--accent)" }}>${total.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  padding: "16px",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Place Order
              </button>
            </div>
          </div>
        </form>

        {/* Overlay Modals for Payment Flow */}
        {(step === "processing" || step === "success" || step === "failure") && (
          <div style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 100000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}>
            {/* 1. Payment In Progress Modal */}
            {step === "processing" && (
              <div style={{
                maxWidth: "420px",
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "48px 32px",
                textAlign: "center",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)"
              }}>
                <div className="spinner-loader" style={{
                  width: "60px",
                  height: "60px",
                  border: "5px solid #eae6f5",
                  borderTop: "5px solid #4a154b",
                  borderRadius: "50%",
                  margin: "0 auto 24px"
                }} />
                <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#000000", marginBottom: "12px", fontFamily: "var(--font-inter)" }}>
                  Payment is in progress
                </h2>
                <p style={{ fontSize: "16px", color: "#666666", margin: 0 }}>
                  Please, wait a few moments
                </p>
              </div>
            )}

            {/* 2. Success Modal */}
            {step === "success" && (
              <div style={{
                maxWidth: "480px",
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "32px",
                boxShadow: "0 15px 50px rgba(0, 0, 0, 0.2)",
                textAlign: "center"
              }}>
                {/* Check Circle Icon */}
                <div style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  backgroundColor: "#e8f8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px"
                }}>
                  <div style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    backgroundColor: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: "24px",
                    fontWeight: "bold"
                  }}>
                    ✓
                  </div>
                </div>

                <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1e293b", marginBottom: "12px", fontFamily: "var(--font-inter)" }}>
                  Payment Successful
                </h2>
                
                <p style={{ fontSize: "14px", color: "#6366f1", lineHeight: "1.5", marginBottom: "24px", fontWeight: 500, padding: "0 10px" }}>
                  Your Order Successfully Placed, We Sent You An Email To Confirm The Order.
                </p>

                {/* Order Summary box */}
                <div style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "24px",
                  backgroundColor: "#ffffff",
                  textAlign: "left"
                }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#000000", marginBottom: "16px" }}>
                    Order Summary
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "150px", overflowY: "auto", marginBottom: "16px" }}>
                    {orderSummaryItems.map((item, index) => (
                      <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ position: "relative", width: "40px", height: "40px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#f8fafc", flexShrink: 0 }}>
                            <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: "cover" }} sizes="40px" />
                          </div>
                          <div>
                            <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", display: "block", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {item.product.name}
                            </span>
                            <span style={{ fontSize: "11px", color: "#64748b" }}>
                              Size: {item.size} | Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>
                          ${(item.product.numericPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                    <span>Order ID:</span>
                    <span style={{ fontWeight: 700, color: "#000000" }}>#01001</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
                    <span>Email:</span>
                    <span style={{ fontWeight: 700, color: "#000000" }}>{email || "example@email.com"}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setStep("billing");
                    window.location.href = "/shop";
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    padding: "16px",
                    borderRadius: "30px",
                    fontWeight: 700,
                    textAlign: "center",
                    cursor: "pointer",
                    border: "none",
                    fontSize: "15px",
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Continue Shopping
                </button>
              </div>
            )}

            {/* 3. Failure Modal */}
            {step === "failure" && (
              <div style={{
                maxWidth: "420px",
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "40px 32px",
                boxShadow: "0 15px 50px rgba(0, 0, 0, 0.2)",
                textAlign: "center"
              }}>
                {/* Failure Close Icon */}
                <div style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  backgroundColor: "#fde8e8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px"
                }}>
                  <div style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    backgroundColor: "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: "22px",
                    fontWeight: "bold"
                  }}>
                    ✕
                  </div>
                </div>

                <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#1e293b", marginBottom: "12px", fontFamily: "var(--font-inter)", lineHeight: "1.2" }}>
                  We couldn&apos;t proceed your payment
                </h2>
                
                <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "32px", fontWeight: 500 }}>
                  we couldn&apos;t proceed with your payment
                </p>

                <button
                  onClick={() => setStep("billing")}
                  style={{
                    display: "block",
                    width: "100%",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    padding: "16px",
                    borderRadius: "30px",
                    fontWeight: 700,
                    textAlign: "center",
                    cursor: "pointer",
                    border: "none",
                    fontSize: "15px",
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Back to payment
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />

      {/* Embedded Responsive styling styles */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner-loader {
          animation: spin 1.2s linear infinite;
        }
        @media (min-width: 1024px) {
          .checkout-content-layout {
            flex-direction: row !important;
          }
          .grid-2-col {
            grid-template-columns: 1fr 1fr !important;
          }
          .grid-3-col {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
        @media (max-width: 1023px) {
          .checkout-content-layout {
            flex-direction: column !important;
          }
          .checkout-summary-sidebar {
            max-width: 100% !important;
          }
          .grid-2-col {
            grid-template-columns: 1fr !important;
          }
          .grid-3-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
