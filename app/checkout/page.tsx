"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, Wallet, Lock } from "lucide-react";
import { Navbar, Footer } from "../_components";
import { useCart, Order } from "../context/CartContext";

export default function CheckoutPage() {
  const { cartItems, clearCart, addOrder, user, setUser } = useCart();
  
  // Checkout flow state: "billing" | "processing" | "success" | "failure"
  const [step, setStep] = useState<"billing" | "processing" | "success" | "failure">("billing");
  
  // Keep copy of cart items for the order success summary modal
  const [orderSummaryItems, setOrderSummaryItems] = useState<typeof cartItems>([]);

  // Form input states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("United States (US)");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("Ohio");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [couponOpen, setCouponOpen] = useState(true); 
  const [couponCode, setCouponCode] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState("");

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

    // Construct new order
    const orderId = "#" + Math.floor(10000 + Math.random() * 90000);
    setCreatedOrderId(orderId);

    const orderDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    
    const newOrder: Order = {
      id: orderId,
      date: orderDate,
      products: cartItems.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        image: item.product.image,
        quantity: item.quantity,
        price: item.product.numericPrice,
        size: `Size: ${item.size}`,
        color: `Color: ${item.color}`
      })),
      subtotal: subtotal,
      shippingCost: shippingCost,
      tax: 0.00,
      total: total,
      status: "Processing",
      shippingAddress: {
        name: `${firstName || "John"} ${lastName || "Smith"}`,
        street: address1 || "123 Main St",
        city: city || "San Francisco",
        state: stateName || "CA",
        zip: zip || "94102",
        country: country || "United States",
        phone: phone || "+1 (555) 123-4567"
      },
      billingAddress: {
        name: `${firstName || "John"} ${lastName || "Smith"}`,
        street: address1 || "123 Main St",
        city: city || "San Francisco",
        state: stateName || "CA",
        zip: zip || "94102",
        country: country || "United States"
      },
      paymentMethod: paymentMethod === "card" ? `Visa ending in ${cardNumber.slice(-4) || "4242"}` : "PayPal",
      trackingId: "FDX" + Math.floor(1000000000 + Math.random() * 9000000000),
      trackingCourier: "FedEx",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    };

    // Go to loading/processing screen
    setStep("processing");

    setTimeout(() => {
      // Failure trigger: card number contains "4000" or ends with "0000"
      if (paymentMethod === "card" && (cardNumber.includes("4000") || cardNumber.endsWith("0000"))) {
        setStep("failure");
      } else {
        addOrder(newOrder);
        setStep("success");
        clearCart();
      }
    }, 2000);
  };

  return (
    <div className="no-hero" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      
      <main style={{ minHeight: "80vh", padding: "60px 24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        {/* Centered Page Title */}
        <h1 style={{ 
          fontSize: "36px", 
          fontWeight: 700, 
          textAlign: "center", 
          marginTop: "16px", 
          marginBottom: "48px", 
          color: "#000000",
          fontFamily: "var(--font-inter)" 
        }}>
          Billing Information
        </h1>

        <form onSubmit={handlePlaceOrder} style={{ display: "flex", gap: "40px" }} className="checkout-content-layout">
          {/* Left Column: Form Details */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "30px" }}>
            
            {/* Returning Customer Banner */}
            <div style={{
              backgroundColor: "#eaeaea",
              borderRadius: "8px",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #e0e0e0"
            }}>
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#000000", fontFamily: "var(--font-inter)" }}>
                Returning Customer? Login to checkout
              </span>
              <button 
                type="button"
                onClick={() => setUser({ ...user, isLoggedIn: true })}
                style={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  padding: "10px 30px",
                  borderRadius: "30px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontFamily: "var(--font-inter)"
                }}
              >
                Login
              </button>
            </div>

            {/* Coupon Code section */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <p style={{ fontSize: "15px", color: "#000000", fontWeight: 700, margin: 0, fontFamily: "var(--font-inter)" }}>
                Have an cupon? Enter your cupon code below
              </p>
              
              <div style={{
                backgroundColor: "#eaeaea",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                padding: "24px",
                display: "flex",
                gap: "16px",
                alignItems: "center"
              }}>
                <span style={{ fontSize: "16px", fontWeight: 700, color: "#000000", fontFamily: "var(--font-inter)", whiteSpace: "nowrap" }}>
                  Coupon Code
                </span>
                <input 
                  type="text" 
                  placeholder="Enter code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    flexGrow: 1,
                    padding: "12px 20px",
                    borderRadius: "30px",
                    border: "1px solid #cccccc",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
                <button 
                  type="button"
                  onClick={() => alert("Coupon applied successfully!")}
                  style={{
                    padding: "12px 30px",
                    borderRadius: "30px",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "14px",
                    fontFamily: "var(--font-inter)",
                    whiteSpace: "nowrap"
                  }}
                >
                  Apply Coupon
                </button>
              </div>
            </div>

            {/* Billing Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#000000", margin: "10px 0 0 0", fontFamily: "var(--font-inter)" }}>
                Billing Information
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="grid-2-col">
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px", fontFamily: "var(--font-inter)" }}>First name</label>
                  <input 
                    type="text" 
                    placeholder="Your first name"
                    required 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ width: "100%", padding: "12px 18px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px", fontFamily: "var(--font-inter)" }}>Last name</label>
                  <input 
                    type="text" 
                    placeholder="Your last name"
                    required 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ width: "100%", padding: "12px 18px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="grid-2-col">
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px", fontFamily: "var(--font-inter)" }}>Email *</label>
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", padding: "12px 18px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px", fontFamily: "var(--font-inter)" }}>Phone *</label>
                  <input 
                    type="tel" 
                    placeholder="Phone number"
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: "100%", padding: "12px 18px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="grid-2-col">
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px", fontFamily: "var(--font-inter)" }}>Country / Region</label>
                  <select 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{ width: "100%", padding: "12px 18px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none", appearance: "none", backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", backgroundSize: "14px" }}
                  >
                    <option>United States (US)</option>
                    <option>United Kingdom (UK)</option>
                    <option>Canada (CA)</option>
                    <option>Australia (AU)</option>
                    <option>Bangladesh (BD)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px", fontFamily: "var(--font-inter)" }}>States</label>
                  <select 
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    style={{ width: "100%", padding: "12px 18px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none", appearance: "none", backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", backgroundSize: "14px" }}
                  >
                    <option>Ohio</option>
                    <option>California</option>
                    <option>Oregon</option>
                    <option>Washington</option>
                    <option>New York</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px", fontFamily: "var(--font-inter)" }}>ZIP *</label>
                <input 
                  type="text" 
                  placeholder="ZIP code"
                  required 
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  style={{ width: "100%", padding: "12px 18px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                />
              </div>

              <div style={{ marginTop: "8px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px", fontFamily: "var(--font-inter)" }}>Street Address *</label>
                <input 
                  type="text" 
                  placeholder="House number and street name" 
                  required 
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  style={{ width: "100%", padding: "12px 18px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none", marginBottom: "12px" }}
                />
                <input 
                  type="text" 
                  placeholder="Apartment, suite, unit, etc. (optional)" 
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  style={{ width: "100%", padding: "12px 18px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px", fontFamily: "var(--font-inter)" }}>Town / City *</label>
                <input 
                  type="text" 
                  placeholder="Town or City"
                  required 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{ width: "100%", padding: "12px 18px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px", fontFamily: "var(--font-inter)" }}>Order Notes (Optional)</label>
                <textarea 
                  placeholder="Notes about your order, e.g. special notes for delivery." 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ width: "100%", padding: "12px 18px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none", minHeight: "100px", fontFamily: "inherit" }}
                />
              </div>
            </div>

            {/* Payment Section */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e0e0e0", padding: "32px", marginTop: "20px", color: "#000000" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px", color: "#000000", display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-inter)" }}>
                <Lock size={16} color="#000000" /> Payment Details
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                <label style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  backgroundColor: paymentMethod === "card" ? "#f9fafb" : "transparent",
                  cursor: "pointer"
                }}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    style={{ marginTop: "4px", accentColor: "#000000" }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#000000" }}>Pay with Credit Card</span>
                      <CreditCard size={18} color="#666666" />
                    </div>
                    <p style={{ fontSize: "13px", color: "#666666", margin: 0 }}>Safe money transfer using your bank account. We support Mastercard, Visa, and Discover.</p>

                    {paymentMethod === "card" && (
                      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", color: "#666666", marginBottom: "4px", fontWeight: 600 }}>Card Number</label>
                          <input 
                            type="text" 
                            placeholder="Card Number" 
                            required={paymentMethod === "card"}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            style={{ width: "100%", padding: "10px 14px", borderRadius: "4px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px" }}
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "#666666", marginBottom: "4px", fontWeight: 600 }}>Expiry Date</label>
                            <input 
                              type="text" 
                              placeholder="MM/YY" 
                              required={paymentMethod === "card"}
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                              style={{ width: "100%", padding: "10px 14px", borderRadius: "4px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "#666666", marginBottom: "4px", fontWeight: 600 }}>CVC / CVV</label>
                            <input 
                              type="text" 
                              placeholder="CVC" 
                              required={paymentMethod === "card"}
                              value={cvc}
                              onChange={(e) => setCvc(e.target.value)}
                              style={{ width: "100%", padding: "10px 14px", borderRadius: "4px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                <label style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  backgroundColor: paymentMethod === "paypal" ? "#f9fafb" : "transparent",
                  cursor: "pointer"
                }}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    style={{ marginTop: "4px", accentColor: "#000000" }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#000000" }}>PayPal</span>
                      <Wallet size={18} color="#003087" />
                    </div>
                    <p style={{ fontSize: "13px", color: "#666666", margin: 0 }}>You will be redirected to the PayPal website to complete your purchase securely.</p>
                  </div>
                </label>
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#666666", cursor: "pointer", userSelect: "none" }}>
                <input 
                  type="checkbox" 
                  required 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  style={{ marginTop: "3px", accentColor: "#000000" }}
                />
                <span>I have read and agree to the website <a href="#" style={{ color: "#000000", textDecoration: "underline", fontWeight: 600 }}>terms and conditions</a> *</span>
              </label>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="checkout-summary-sidebar" style={{ width: "100%", maxWidth: "420px", flexShrink: 0 }}>
            <div style={{ 
              backgroundColor: "#ffffff", 
              borderRadius: "16px", 
              border: "1px solid #e0e0e0", 
              padding: "32px", 
              position: "sticky", 
              top: "100px",
              color: "#000000",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)"
            }}>
              <h3 style={{ 
                fontSize: "22px", 
                fontWeight: 700, 
                borderBottom: "1px solid #eaeaea", 
                paddingBottom: "20px", 
                marginBottom: "24px", 
                color: "#000000",
                fontFamily: "var(--font-inter)" 
              }}>
                Order Summary
              </h3>

              {/* Items List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "24px", maxHeight: "300px", overflowY: "auto" }}>
                {cartItems.map((item, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ position: "relative", width: "60px", height: "60px", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f8f9fa", flexShrink: 0, border: "1px solid #eef0f2" }}>
                        <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: "cover" }} sizes="60px" />
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#000000", margin: "0 0 4px 0", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.product.name}
                        </h4>
                        <span style={{ fontSize: "12px", color: "#666666", display: "block" }}>
                          Qty: {item.quantity} | Size: {item.size}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#000000" }}>
                      ${(item.product.numericPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                marginBottom: "20px", 
                fontSize: "15px", 
                borderTop: "1px solid #eaeaea", 
                paddingTop: "20px",
                color: "#000000",
                fontFamily: "var(--font-inter)"
              }}>
                <span style={{ color: "#666666" }}>Subtotal:</span>
                <span style={{ fontWeight: 700 }}>${subtotal.toLocaleString()}</span>
              </div>

              {/* Shipping Section */}
              <div style={{ marginBottom: "24px", borderTop: "1px solid #eaeaea", paddingTop: "20px", textAlign: "left" }}>
                <span style={{ display: "block", color: "#666666", fontSize: "15px", marginBottom: "12px", fontFamily: "var(--font-inter)" }}>Shipping:</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#000000", cursor: "pointer", fontWeight: 600 }}>
                    <input 
                      type="radio" 
                      name="shipping_checkout" 
                      checked={shippingOption === "flat"} 
                      onChange={() => setShippingOption("flat")}
                      style={{ accentColor: "#000000", width: "18px", height: "18px" }}
                    />
                    Flat Rate: $6.95
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#000000", cursor: "pointer", fontWeight: 600 }}>
                    <input 
                      type="radio" 
                      name="shipping_checkout" 
                      checked={shippingOption === "delivery"} 
                      onChange={() => setShippingOption("delivery")}
                      style={{ accentColor: "#000000", width: "18px", height: "18px" }}
                    />
                    Local Delivery: $2.00
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#000000", cursor: "pointer", fontWeight: 600 }}>
                    <input 
                      type="radio" 
                      name="shipping_checkout" 
                      checked={shippingOption === "pickup"} 
                      onChange={() => setShippingOption("pickup")}
                      style={{ accentColor: "#000000", width: "18px", height: "18px" }}
                    />
                    Local Pickup Shipping to OH
                  </label>
                </div>
                
                {/* Change Address Link */}
                <div style={{ marginTop: "16px" }}>
                  <a href="#" style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "6px", 
                    color: "#6366f1", 
                    textDecoration: "underline", 
                    fontSize: "13px",
                    fontWeight: 600
                  }}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>
                    Change Address
                  </a>
                </div>
              </div>

              {/* Total */}
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                borderTop: "1px solid #eaeaea", 
                paddingTop: "20px", 
                marginBottom: "32px",
                color: "#000000"
              }}>
                <div style={{ textAlign: "left" }}>
                  <span style={{ fontWeight: 700, fontSize: "16px", display: "block" }}>Total:</span>
                  <span style={{ fontSize: "13px", color: "#666666" }}>(Including tax)</span>
                </div>
                <span style={{ fontSize: "24px", fontWeight: 800, color: "#000000" }}>${total.toLocaleString()}</span>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "#484848",
                  color: "#ffffff",
                  padding: "18px",
                  borderRadius: "30px",
                  fontWeight: 700,
                  fontSize: "16px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#000000")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#484848")}
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
                  borderTop: "5px solid #000000",
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
                    <span style={{ fontWeight: 700, color: "#000000" }}>{createdOrderId}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
                    <span>Email:</span>
                    <span style={{ fontWeight: 700, color: "#000000" }}>{email || "example@email.com"}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setStep("billing");
                    window.location.href = "/profile?tab=orders";
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
                  View My Orders
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
