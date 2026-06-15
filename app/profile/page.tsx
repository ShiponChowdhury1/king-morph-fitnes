"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  History, 
  MapPin, 
  Settings, 
  Camera, 
  Mail, 
  PackageOpen, 
  X, 
  Truck, 
  Plus, 
  Pencil, 
  Trash2, 
  Check, 
  Lock,
  ChevronRight,
  Receipt
} from "lucide-react";
import { Navbar, Footer } from "../_components";
import { useCart, Order } from "../context/CartContext";

interface SavedAddress {
  id: string;
  type: "Shipping" | "Billing";
  isDefault: boolean;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

function ProfileContent() {
  const { wishlistItems, addToCart, toggleWishlist, user, setUser, orders, cancelOrder } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Set tab based on URL param or default to "profile"
  // Supported tabs: profile | orders | saved | history | addresses | settings
  const initialTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Sync activeTab with search param when it changes
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    router.push(`/profile?tab=${tabName}`);
  };

  // 1. Profile form states
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [country, setCountry] = useState("United States");
  const [isSavedMessage, setIsSavedMessage] = useState(false);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      name: name,
      email: email
    });
    setIsSavedMessage(true);
    setTimeout(() => setIsSavedMessage(false), 3000);
  };

  // 2. Active Orders and Purchase History separation
  // Active orders: Processing, Confirmed, Shipped
  const activeOrders = orders.filter(o => o.status === "Processing" || o.status === "Confirmed" || o.status === "Shipped");
  // Purchase history: Delivered, Cancelled
  const pastOrders = orders.filter(o => o.status === "Delivered" || o.status === "Cancelled");

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [cancellingOrder, setCancellingOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const handleConfirmCancel = () => {
    if (!cancellingOrder) return;
    cancelOrder(cancellingOrder.id, cancelReason || "Customer request");
    setCancellingOrder(null);
    setCancelReason("");
    alert(`Order ${cancellingOrder.id} has been cancelled successfully.`);
  };

  // 3. Addresses Section States
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([
    {
      id: "addr-1",
      type: "Shipping",
      isDefault: true,
      name: "Angelina Cherry",
      street: "123 Main St, Apt 4B",
      city: "Columbus",
      state: "Ohio",
      zip: "43215",
      country: "United States",
      phone: "+1 (555) 123-4567"
    },
    {
      id: "addr-2",
      type: "Billing",
      isDefault: true,
      name: "Angelina Cherry",
      street: "123 Main St, Apt 4B",
      city: "Columbus",
      state: "Ohio",
      zip: "43215",
      country: "United States",
      phone: "+1 (555) 123-4567"
    }
  ]);
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<SavedAddress | null>(null);
  const [addrName, setAddrName] = useState("");
  const [addrType, setAddrType] = useState<"Shipping" | "Billing">("Shipping");
  const [addrStreet, setAddrStreet] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrState, setAddrState] = useState("Ohio");
  const [addrZip, setAddrZip] = useState("");
  const [addrPhone, setAddrPhone] = useState("");

  const openAddAddress = () => {
    setEditingAddress(null);
    setAddrName(user.name);
    setAddrType("Shipping");
    setAddrStreet("");
    setAddrCity("");
    setAddrState("Ohio");
    setAddrZip("");
    setAddrPhone("+1 (555) 123-4567");
    setAddressFormOpen(true);
  };

  const openEditAddress = (addr: SavedAddress) => {
    setEditingAddress(addr);
    setAddrName(addr.name);
    setAddrType(addr.type);
    setAddrStreet(addr.street);
    setAddrCity(addr.city);
    setAddrState(addr.state);
    setAddrZip(addr.zip);
    setAddrPhone(addr.phone);
    setAddressFormOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      setSavedAddresses(prev => prev.map(a => a.id === editingAddress.id ? {
        ...a,
        name: addrName,
        type: addrType,
        street: addrStreet,
        city: addrCity,
        state: addrState,
        zip: addrZip,
        phone: addrPhone
      } : a));
    } else {
      const newAddr: SavedAddress = {
        id: "addr-" + Date.now(),
        type: addrType,
        isDefault: false,
        name: addrName,
        street: addrStreet,
        city: addrCity,
        state: addrState,
        zip: addrZip,
        country: "United States",
        phone: addrPhone
      };
      setSavedAddresses(prev => [...prev, newAddr]);
    }
    setAddressFormOpen(false);
    setEditingAddress(null);
  };

  const handleSetDefaultAddress = (id: string, type: "Shipping" | "Billing") => {
    setSavedAddresses(prev => prev.map(a => {
      if (a.type === type) {
        return { ...a, isDefault: a.id === id };
      }
      return a;
    }));
  };

  const handleDeleteAddress = (id: string) => {
    setSavedAddresses(prev => prev.filter(a => a.id !== id));
  };

  // 4. Settings Section States
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [isSettingsSavedMessage, setIsSettingsSavedMessage] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsSettingsSavedMessage(true);
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setIsSettingsSavedMessage(false), 3000);
  };

  const handleAvatarChange = () => {
    const newName = prompt("Enter profile name:", name);
    if (newName) {
      setName(newName);
      setUser(prev => ({ ...prev, name: newName }));
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />

      {/* Main Content Area */}
      <main style={{ minHeight: "80vh", paddingBottom: "100px", position: "relative" }}>
        
        {/* Banner Section */}
        <div style={{
          position: "relative",
          height: "280px",
          width: "100%",
          overflow: "hidden"
        }}>
          <Image 
            src="/images/profile-banner-image.png" 
            alt="Profile Banner" 
            fill 
            style={{ objectFit: "cover" }} 
            priority
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5))"
          }} />
        </div>

        {/* Profile Card / Header Overlay */}
        <div style={{
          maxWidth: "1200px",
          margin: "-60px auto 0",
          padding: "0 24px",
          position: "relative",
          zIndex: 10
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
            padding: "24px 32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px"
          }} className="profile-header-card">
            
            {/* Avatar & Info */}
            <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }} className="avatar-info-container">
              <div style={{ position: "relative", marginTop: "-70px" }}>
                <div style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  border: "6px solid #ffffff",
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#ffffff"
                }}>
                  <Image 
                    src={user.avatar} 
                    alt={user.name} 
                    width={130} 
                    height={130} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <button 
                  onClick={handleAvatarChange}
                  style={{
                    position: "absolute",
                    bottom: "4px",
                    right: "4px",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                  }}
                  title="Change avatar name"
                >
                  <Camera size={14} />
                </button>
              </div>

              <div style={{ textAlign: "left" }}>
                <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#000000", margin: "0 0 4px 0", fontFamily: "var(--font-inter)" }}>
                  {user.name}
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", color: "#666666", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Mail size={12} /> {user.email}
                  </span>
                  <span style={{ height: "4px", width: "4px", borderRadius: "50%", backgroundColor: "#cccccc" }} />
                  <span style={{ fontSize: "14px", color: "#10b981", fontWeight: 700 }}>
                    Active Member
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div style={{ display: "flex", gap: "24px" }} className="profile-stats">
              <div style={{ textAlign: "center" }}>
                <span style={{ display: "block", fontSize: "22px", fontWeight: 800, color: "#000000" }}>
                  {orders.length}
                </span>
                <span style={{ fontSize: "12px", color: "#666666", textTransform: "uppercase", fontWeight: 700 }}>Orders</span>
              </div>
              <div style={{ width: "1px", backgroundColor: "#eaeaea" }} />
              <div style={{ textAlign: "center" }}>
                <span style={{ display: "block", fontSize: "22px", fontWeight: 800, color: "#000000" }}>
                  {wishlistItems.length}
                </span>
                <span style={{ fontSize: "12px", color: "#666666", textTransform: "uppercase", fontWeight: 700 }}>Wishlist</span>
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar + Panel Content Layout */}
        <div style={{
          maxWidth: "1200px",
          margin: "40px auto 0",
          padding: "0 24px",
          display: "flex",
          gap: "40px"
        }} className="profile-layout-container">
          
          {/* Left Sidebar Navigation */}
          <aside style={{ width: "260px", flexShrink: 0 }} className="profile-sidebar">
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e0e0e0",
              padding: "24px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}>
              {[
                { name: "Profile", key: "profile", icon: <User size={15} /> },
                { name: "Orders", key: "orders", icon: <ShoppingBag size={15} /> },
                { name: "Saved Items", key: "saved", icon: <Heart size={15} /> },
                { name: "Purchase History", key: "history", icon: <History size={15} /> },
                { name: "Addresses", key: "addresses", icon: <MapPin size={15} /> },
                { name: "Settings", key: "settings", icon: <Settings size={15} /> }
              ].map((item) => {
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleTabChange(item.key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: isActive ? "#000000" : "transparent",
                      color: isActive ? "#ffffff" : "#4b5563",
                      fontSize: "14px",
                      fontWeight: 700,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                      fontFamily: "var(--font-inter)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {item.icon}
                      {item.name}
                    </div>
                    <ChevronRight size={10} style={{ opacity: isActive ? 1 : 0.3 }} />
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Main Content Panel */}
          <div style={{ flexGrow: 1 }} className="profile-content-panel">
            
            {/* 1. PROFILE PANEL */}
            {activeTab === "profile" && (
              <div style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e0e0e0",
                padding: "36px",
                textAlign: "left"
              }}>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#000000", marginBottom: "8px", fontFamily: "var(--font-inter)" }}>
                  Personal Information
                </h3>
                <p style={{ fontSize: "14px", color: "#666666", marginBottom: "32px" }}>
                  Update your personal details and contact details below.
                </p>

                {isSavedMessage && (
                  <div style={{
                    backgroundColor: "#e8f8f0",
                    color: "#10b981",
                    padding: "12px 18px",
                    borderRadius: "6px",
                    marginBottom: "24px",
                    fontWeight: 600,
                    fontSize: "14px"
                  }}>
                    Profile details updated successfully!
                  </div>
                )}

                <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="grid-2-col">
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px" }}>Full Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px" }}>Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="grid-2-col">
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px" }}>Phone Number</label>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px" }}>Country</label>
                      <input 
                        type="text" 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: "12px" }}>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        padding: "14px 40px",
                        borderRadius: "30px",
                        fontWeight: 700,
                        fontSize: "14px",
                        border: "none",
                        cursor: "pointer",
                        transition: "opacity 0.2s"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 2. ORDERS PANEL */}
            {activeTab === "orders" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ textAlign: "left" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#000000", margin: "0 0 8px 0" }}>Active Orders</h3>
                  <p style={{ fontSize: "14px", color: "#666666", margin: 0 }}>Track and manage your current deliveries.</p>
                </div>

                {activeOrders.length === 0 ? (
                  <div style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #e0e0e0",
                    padding: "60px 24px",
                    textAlign: "center"
                  }}>
                    <PackageOpen size={48} color="#cccccc" style={{ marginBottom: "16px" }} />
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#000000", marginBottom: "8px" }}>No active orders</h3>
                    <p style={{ fontSize: "14px", color: "#666666", marginBottom: "24px" }}>
                      Any active items shipped or in process will appear here.
                    </p>
                    <Link href="/shop" style={{ display: "inline-block", backgroundColor: "#000000", color: "#ffffff", padding: "12px 30px", borderRadius: "30px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                      Browse Shop
                    </Link>
                  </div>
                ) : (
                  activeOrders.map((order) => {
                    const isExpanded = expandedOrderId === order.id;
                    return (
                      <div key={order.id} style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        border: "1px solid #e0e0e0",
                        overflow: "hidden",
                        textAlign: "left"
                      }}>
                        {/* Header */}
                        <div style={{
                          backgroundColor: "#f9fafb",
                          padding: "20px 24px",
                          borderBottom: "1px solid #e0e0e0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "16px"
                        }}>
                          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                            <div>
                              <span style={{ fontSize: "12px", color: "#666666", display: "block", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Date</span>
                              <span style={{ fontSize: "14px", fontWeight: 700, color: "#000000" }}>{order.date}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: "12px", color: "#666666", display: "block", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Total</span>
                              <span style={{ fontSize: "14px", fontWeight: 700, color: "#000000" }}>${order.total.toLocaleString()}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: "12px", color: "#666666", display: "block", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Order ID</span>
                              <span style={{ fontSize: "14px", fontWeight: 700, color: "#000000" }}>{order.id}</span>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <span style={{
                              backgroundColor: "#fef3c7",
                              color: "#d97706",
                              padding: "6px 14px",
                              borderRadius: "30px",
                              fontSize: "12px",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px"
                            }}>
                              {order.status}
                            </span>
                            <button
                              onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                              style={{ background: "none", border: "none", color: "#6366f1", cursor: "pointer", fontSize: "14px", fontWeight: 700 }}
                            >
                              {isExpanded ? "Hide Details" : "Track Order"}
                            </button>
                          </div>
                        </div>

                        {/* Body */}
                        <div style={{ padding: "24px" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            {order.products.map((prod, index) => (
                              <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                  <div style={{ position: "relative", width: "60px", height: "60px", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f8f9fa", border: "1px solid #eef0f2" }}>
                                    <Image src={prod.image} alt={prod.name} fill style={{ objectFit: "cover" }} sizes="60px" />
                                  </div>
                                  <div>
                                    <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#000000", margin: "0 0 4px 0" }}>{prod.name}</h4>
                                    <span style={{ fontSize: "12px", color: "#666666" }}>{prod.size} | Qty: {prod.quantity}</span>
                                  </div>
                                </div>
                                <span style={{ fontSize: "15px", fontWeight: 700, color: "#000000" }}>${(prod.price * prod.quantity).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>

                          {isExpanded && (
                            <div style={{ marginTop: "24px", borderTop: "1px solid #eaeaea", paddingTop: "24px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "32px" }} className="grid-2-col">
                              <div>
                                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#000000", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}><Truck size={14} /> Shipping details</h4>
                                <div style={{ fontSize: "14px", color: "#666666", lineHeight: "1.6" }}>
                                  <p style={{ margin: "0 0 8px 0" }}><strong style={{ color: "#000000" }}>Recipient:</strong> {order.shippingAddress.name}</p>
                                  <p style={{ margin: "0 0 8px 0" }}><strong style={{ color: "#000000" }}>Address:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                                  <p style={{ margin: "0 0 8px 0" }}><strong style={{ color: "#000000" }}>Tracking No:</strong> {order.trackingId} ({order.trackingCourier})</p>
                                  <p style={{ margin: 0 }}><strong style={{ color: "#000000" }}>Expected Delivery:</strong> {order.estimatedDelivery}</p>
                                </div>
                              </div>

                              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <div style={{ fontSize: "14px", color: "#666666", display: "flex", flexDirection: "column", gap: "8px" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>Subtotal:</span>
                                    <span style={{ fontWeight: 600, color: "#000" }}>${order.subtotal.toLocaleString()}</span>
                                  </div>
                                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #eaeaea", paddingTop: "8px", fontWeight: 700, color: "#000" }}>
                                    <span>Total:</span>
                                    <span>${order.total.toLocaleString()}</span>
                                  </div>
                                </div>

                                <button
                                  onClick={() => setCancellingOrder(order)}
                                  style={{
                                    marginTop: "24px",
                                    backgroundColor: "#fee2e2",
                                    color: "#ef4444",
                                    border: "none",
                                    padding: "10px 16px",
                                    borderRadius: "6px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    width: "100%"
                                  }}
                                >
                                  Cancel Order
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* 3. SAVED ITEMS (WISHLIST) PANEL */}
            {activeTab === "saved" && (
              <div>
                <div style={{ textAlign: "left", marginBottom: "24px" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#000000", margin: "0 0 8px 0" }}>Saved Items</h3>
                  <p style={{ fontSize: "14px", color: "#666666", margin: 0 }}>Review products you saved for later.</p>
                </div>

                {wishlistItems.length === 0 ? (
                  <div style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #e0e0e0",
                    padding: "60px 24px",
                    textAlign: "center"
                  }}>
                    <Heart size={48} color="#cccccc" style={{ marginBottom: "16px" }} />
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#000000", marginBottom: "8px" }}>Your wishlist is empty</h3>
                    <p style={{ fontSize: "14px", color: "#666666", marginBottom: "24px" }}>Add items from the store to save them here.</p>
                    <Link href="/shop" style={{ display: "inline-block", backgroundColor: "#000000", color: "#ffffff", padding: "12px 30px", borderRadius: "30px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                      Go to Shop
                    </Link>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
                    {wishlistItems.map((prod) => (
                      <div key={prod.id} style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        border: "1px solid #e0e0e0",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left"
                      }}>
                        <div style={{ position: "relative", height: "240px", width: "100%", backgroundColor: "#f8f9fa" }}>
                          <Image src={prod.image} alt={prod.name} fill style={{ objectFit: "cover" }} />
                        </div>
                        <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                          <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#000000", margin: "0 0 6px 0", height: "22px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {prod.name}
                          </h4>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "#000000", marginBottom: "16px", display: "block" }}>
                            ${prod.numericPrice.toLocaleString()}
                          </span>

                          <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                            <button
                              onClick={() => {
                                addToCart(prod, 1, "M", "Default");
                                alert(`${prod.name} added to cart!`);
                              }}
                              style={{
                                flexGrow: 1,
                                backgroundColor: "#000000",
                                color: "#ffffff",
                                padding: "10px",
                                borderRadius: "30px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: 700
                              }}
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => toggleWishlist(prod)}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                border: "1px solid #cccccc",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                backgroundColor: "#ffffff"
                              }}
                            >
                              <X size={14} color="#ef4444" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. PURCHASE HISTORY PANEL */}
            {activeTab === "history" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ textAlign: "left" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#000000", margin: "0 0 8px 0" }}>Purchase History</h3>
                  <p style={{ fontSize: "14px", color: "#666666", margin: 0 }}>Review all completed and cancelled orders.</p>
                </div>

                {pastOrders.length === 0 ? (
                  <div style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #e0e0e0",
                    padding: "60px 24px",
                    textAlign: "center"
                  }}>
                    <History size={48} color="#cccccc" style={{ marginBottom: "16px" }} />
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#000000", marginBottom: "8px" }}>No past orders found</h3>
                    <p style={{ fontSize: "14px", color: "#666666", marginBottom: 0 }}>
                      Delivered items and history logs will be archived here.
                    </p>
                  </div>
                ) : (
                  pastOrders.map((order) => {
                    const isCancelled = order.status === "Cancelled";
                    return (
                      <div key={order.id} style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        border: "1px solid #e0e0e0",
                        overflow: "hidden",
                        textAlign: "left"
                      }}>
                        {/* Header */}
                        <div style={{
                          backgroundColor: "#f9fafb",
                          padding: "20px 24px",
                          borderBottom: "1px solid #e0e0e0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "16px"
                        }}>
                          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                            <div>
                              <span style={{ fontSize: "12px", color: "#666666", display: "block", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Date</span>
                              <span style={{ fontSize: "14px", fontWeight: 700, color: "#000000" }}>{order.date}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: "12px", color: "#666666", display: "block", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Total Amount</span>
                              <span style={{ fontSize: "14px", fontWeight: 700, color: "#000" }}>${order.total.toLocaleString()}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: "12px", color: "#666666", display: "block", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Order ID</span>
                              <span style={{ fontSize: "14px", fontWeight: 700, color: "#000000" }}>{order.id}</span>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <span style={{
                              backgroundColor: isCancelled ? "#fee2e2" : "#dcfce7",
                              color: isCancelled ? "#b91c1c" : "#15803d",
                              padding: "6px 14px",
                              borderRadius: "30px",
                              fontSize: "12px",
                              fontWeight: 700,
                              textTransform: "uppercase"
                            }}>
                              {order.status}
                            </span>
                            <button
                              onClick={() => alert("Invoice downloaded successfully! (Mock)")}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                backgroundColor: "transparent",
                                border: "1px solid #cccccc",
                                padding: "8px 12px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "12px",
                                fontWeight: 700,
                                color: "#000000"
                              }}
                            >
                              <Receipt size={12} /> Invoice
                            </button>
                          </div>
                        </div>

                        {/* Body */}
                        <div style={{ padding: "24px" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {order.products.map((prod, index) => (
                              <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                  <div style={{ position: "relative", width: "50px", height: "50px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#f8f9fa" }}>
                                    <Image src={prod.image} alt={prod.name} fill style={{ objectFit: "cover" }} sizes="50px" />
                                  </div>
                                  <div>
                                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#000000", margin: "0 0 2px 0" }}>{prod.name}</h4>
                                    <span style={{ fontSize: "11px", color: "#666666" }}>{prod.size} | Qty: {prod.quantity}</span>
                                  </div>
                                </div>
                                <span style={{ fontSize: "14px", fontWeight: 700, color: "#000000" }}>${(prod.price * prod.quantity).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* 5. ADDRESSES PANEL */}
            {activeTab === "addresses" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                  <div style={{ textAlign: "left" }}>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#000000", margin: "0 0 8px 0" }}>Addresses</h3>
                    <p style={{ fontSize: "14px", color: "#666666", margin: 0 }}>Manage your default billing and shipping addresses.</p>
                  </div>
                  <button
                    onClick={openAddAddress}
                    style={{
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "30px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px"
                    }}
                  >
                    <Plus size={10} /> Add Address
                  </button>
                </div>

                {/* Address Cards Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="grid-2-col">
                  {savedAddresses.map((addr) => (
                    <div key={addr.id} style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "14px",
                      border: addr.isDefault ? "1px solid #e0e7ff" : "1px solid #f0f0f0",
                      borderLeft: addr.isDefault ? "4px solid #6366f1" : "1px solid #f0f0f0",
                      padding: "24px",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                      boxShadow: addr.isDefault
                        ? "0 4px 16px rgba(99, 102, 241, 0.08)"
                        : "0 2px 8px rgba(0, 0, 0, 0.04)",
                      transition: "box-shadow 0.2s ease, border-color 0.2s ease"
                    }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                          <span style={{
                            backgroundColor: "#eaeaea",
                            color: "#000000",
                            padding: "4px 10px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: 700
                          }} className="address-badge">
                            {addr.type} Address
                          </span>
                          {addr.isDefault && (
                            <span style={{ fontSize: "12px", color: "#10b981", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                              <Check size={10} /> Default
                            </span>
                          )}
                        </div>

                        <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#000000", margin: "0 0 10px 0" }}>{addr.name}</h4>
                        <p style={{ fontSize: "14px", color: "#666666", margin: "0 0 6px 0", lineHeight: "1.5" }}>{addr.street}</p>
                        <p style={{ fontSize: "14px", color: "#666666", margin: "0 0 6px 0" }}>{addr.city}, {addr.state} {addr.zip}</p>
                        <p style={{ fontSize: "14px", color: "#666666", margin: "0 0 16px 0" }}>{addr.country}</p>
                        <p style={{ fontSize: "13px", color: "#666666", margin: 0 }}><strong style={{ color: "#000" }}>Phone:</strong> {addr.phone}</p>
                      </div>

                      <div style={{ display: "flex", gap: "12px", borderTop: "1px solid #eaeaea", paddingTop: "16px", marginTop: "20px" }}>
                        {!addr.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(addr.id, addr.type)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#6366f1",
                              cursor: "pointer",
                              fontSize: "13px",
                              fontWeight: 700,
                              padding: 0
                            }}
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => openEditAddress(addr)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#4b5563",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: 0,
                            marginLeft: addr.isDefault ? "0" : "auto"
                          }}
                        >
                          <Pencil size={11} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#ef4444",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: 0,
                            marginLeft: addr.isDefault ? "auto" : "0"
                          }}
                        >
                          <Trash2 size={11} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add/Edit Address Modal Form */}
                {addressFormOpen && (
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
                    <div style={{
                      maxWidth: "500px",
                      width: "100%",
                      backgroundColor: "#ffffff",
                      borderRadius: "16px",
                      padding: "32px",
                      boxShadow: "0 15px 50px rgba(0, 0, 0, 0.2)",
                      textAlign: "left"
                    }}>
                      <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#000000", marginBottom: "20px", fontFamily: "var(--font-inter)" }}>
                        {editingAddress ? "Edit Address" : "Add Address"}
                      </h3>

                      <form onSubmit={handleSaveAddress} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "#666666", marginBottom: "4px", fontWeight: 600 }}>Type</label>
                            <select 
                              value={addrType}
                              onChange={(e) => setAddrType(e.target.value as any)}
                              style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px" }}
                            >
                              <option value="Shipping">Shipping</option>
                              <option value="Billing">Billing</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "#666666", marginBottom: "4px", fontWeight: 600 }}>Recipient Name</label>
                            <input 
                              type="text" 
                              required 
                              value={addrName}
                              onChange={(e) => setAddrName(e.target.value)}
                              style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px" }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", color: "#666666", marginBottom: "4px", fontWeight: 600 }}>Street Address</label>
                          <input 
                            type="text" 
                            required 
                            value={addrStreet}
                            onChange={(e) => setAddrStreet(e.target.value)}
                            style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px" }}
                          />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "#666666", marginBottom: "4px", fontWeight: 600 }}>Town / City</label>
                            <input 
                              type="text" 
                              required 
                              value={addrCity}
                              onChange={(e) => setAddrCity(e.target.value)}
                              style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "#666666", marginBottom: "4px", fontWeight: 600 }}>ZIP Code</label>
                            <input 
                              type="text" 
                              required 
                              value={addrZip}
                              onChange={(e) => setAddrZip(e.target.value)}
                              style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px" }}
                            />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "#666666", marginBottom: "4px", fontWeight: 600 }}>State</label>
                            <select 
                              value={addrState}
                              onChange={(e) => setAddrState(e.target.value)}
                              style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px" }}
                            >
                              <option>Ohio</option>
                              <option>California</option>
                              <option>Oregon</option>
                              <option>Washington</option>
                              <option>New York</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "#666666", marginBottom: "4px", fontWeight: 600 }}>Phone Number</label>
                            <input 
                              type="tel" 
                              required 
                              value={addrPhone}
                              onChange={(e) => setAddrPhone(e.target.value)}
                              style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px" }}
                            />
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                          <button
                            type="button"
                            onClick={() => setAddressFormOpen(false)}
                            style={{
                              flex: 1,
                              backgroundColor: "#f3f4f6",
                              color: "#4b5563",
                              padding: "12px",
                              borderRadius: "30px",
                              fontWeight: 700,
                              cursor: "pointer",
                              border: "none",
                              fontSize: "14px",
                              textAlign: "center"
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            style={{
                              flex: 1,
                              backgroundColor: "#000000",
                              color: "#ffffff",
                              padding: "12px",
                              borderRadius: "30px",
                              fontWeight: 700,
                              cursor: "pointer",
                              border: "none",
                              fontSize: "14px",
                              textAlign: "center"
                            }}
                          >
                            Save Address
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 6. SETTINGS PANEL */}
            {activeTab === "settings" && (
              <div style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e0e0e0",
                padding: "36px",
                textAlign: "left"
              }}>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#000000", marginBottom: "8px", fontFamily: "var(--font-inter)" }}>
                  Settings
                </h3>
                <p style={{ fontSize: "14px", color: "#666666", marginBottom: "32px" }}>
                  Manage account security and notification preferences.
                </p>

                {isSettingsSavedMessage && (
                  <div style={{
                    backgroundColor: "#e8f8f0",
                    color: "#10b981",
                    padding: "12px 18px",
                    borderRadius: "6px",
                    marginBottom: "24px",
                    fontWeight: 600,
                    fontSize: "14px"
                  }}>
                    Settings saved successfully!
                  </div>
                )}

                <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                  {/* Security Fields */}
                  <div>
                    <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#000000", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Lock size={12} /> Security & Password
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="grid-2-col">
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px" }}>New Password</label>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          style={{ width: "100%", padding: "12px 16px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000000", marginBottom: "8px" }}>Confirm New Password</label>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          style={{ width: "100%", padding: "12px 16px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferences Fields */}
                  <div>
                    <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#000000", marginBottom: "16px" }}>
                      Notification Preferences
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                        <input 
                          type="checkbox" 
                          checked={emailNotifications}
                          onChange={(e) => setEmailNotifications(e.target.checked)}
                          style={{ width: "16px", height: "16px", accentColor: "#000" }}
                        />
                        Receive emails about updates, orders, and coupons
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                        <input 
                          type="checkbox" 
                          checked={smsNotifications}
                          onChange={(e) => setSmsNotifications(e.target.checked)}
                          style={{ width: "16px", height: "16px", accentColor: "#00" }}
                        />
                        Receive SMS tracking notifications
                      </label>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: "16px" }}>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        padding: "14px 40px",
                        borderRadius: "30px",
                        fontWeight: 700,
                        fontSize: "14px",
                        border: "none",
                        cursor: "pointer",
                        transition: "opacity 0.2s"
                      }}
                    >
                      Save Settings
                    </button>
                    <button
                      type="button"
                      onClick={() => alert("Please contact support to delete your profile account.")}
                      style={{
                        backgroundColor: "#fee2e2",
                        color: "#ef4444",
                        border: "none",
                        padding: "14px 24px",
                        borderRadius: "30px",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: "14px",
                        marginLeft: "auto"
                      }}
                    >
                      Delete Account
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>

        {/* Cancellation Modal Overlay */}
        {cancellingOrder && (
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
            <div style={{
              maxWidth: "440px",
              width: "100%",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 15px 50px rgba(0, 0, 0, 0.2)",
              textAlign: "left"
            }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#000000", marginBottom: "12px", fontFamily: "var(--font-inter)" }}>
                Cancel Order {cancellingOrder.id}
              </h3>
              <p style={{ fontSize: "14px", color: "#666666", marginBottom: "20px", lineHeight: "1.5" }}>
                Are you sure you want to cancel this order? Please provide a brief reason for the cancellation.
              </p>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "12px", color: "#666666", marginBottom: "6px", fontWeight: 600 }}>Reason for cancellation</label>
                <textarea 
                  placeholder="e.g., Ordered wrong size, changed my mind" 
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "6px", border: "1px solid #cccccc", backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", outline: "none", minHeight: "80px", fontFamily: "inherit" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setCancellingOrder(null)}
                  style={{
                    flex: 1,
                    backgroundColor: "#f3f4f6",
                    color: "#4b5563",
                    padding: "12px",
                    borderRadius: "30px",
                    fontWeight: 700,
                    cursor: "pointer",
                    border: "none",
                    fontSize: "14px",
                    textAlign: "center"
                  }}
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirmCancel}
                  style={{
                    flex: 1,
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    padding: "12px",
                    borderRadius: "30px",
                    fontWeight: 700,
                    cursor: "pointer",
                    border: "none",
                    fontSize: "14px",
                    textAlign: "center"
                  }}
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />

      <style jsx global>{`
        @media (max-width: 1023px) {
          .profile-layout-container {
            flex-direction: column !important;
          }
          .profile-sidebar {
            width: 100% !important;
          }
        }
        @media (max-width: 768px) {
          .profile-header-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .avatar-info-container {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .profile-stats {
            align-self: stretch !important;
            justify-content: space-around !important;
            margin-top: 10px !important;
          }
          .grid-2-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f9fa" }}>
        <p style={{ color: "#000", fontSize: "16px", fontWeight: "bold" }}>Loading profile...</p>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
