"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function HowItWorksContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up and tell us about yourself. Input your basic information, fitness experience, and current lifestyle to help us understand your starting point.",
      features: [
        "Enter your age, height, and weight",
        "Share your fitness experience level",
        "Tell us about your daily activity",
        "Set your initial preferences",
      ],
      image: "/images/how-work/create-Your-profile.png",
      isBackground: true,
      align: "right",
    },
    {
      number: "02",
      title: "Identify Your Morphology",
      description: "Take our comprehensive body type quiz. Answer questions about your physical characteristics, body composition, and how your body responds to exercise and nutrition.",
      features: [
        "Complete 15-minute assessment",
        "Upload optional body photos",
        "Answer morphology questions",
        "Get instant body type results",
      ],
      image: "/images/how-work/identify-Your-morphology.png",
      isBackground: true,
      align: "left",
    },
    {
      number: "03",
      title: "Choose Your Goal",
      description: "Select your primary fitness objective. Whether you want to lose fat, build muscle, improve performance, or enhance overall health, we'll tailor everything to your goal.",
      features: [],
      image: "/images/how-work/choose.png",
      isBackground: false,
      align: "right",
    },
    {
      number: "04",
      title: "Track Your Results",
      description: "Monitor your progress with comprehensive analytics. Log workouts, track nutrition, take progress photos, and watch as our intelligent system adapts your plan based on your results.",
      features: [
        "Log daily workouts and meals",
        "Track body measurements",
        "View progress analytics",
        "Get adaptive recommendations",
      ],
      image: "/images/how-work/track-your- results.png",
      isBackground: true,
      align: "right",
    },
  ];

  const benefits = [
    {
      title: "Science-based morphology assessment",
      desc: "Discover your unique body type through our advanced quiz system.",
    },
    {
      title: "Personalized to your unique body type",
      desc: "Custom workout plans designed specifically for your body type and goals.",
    },
    {
      title: "Adaptive plans that evolve with you",
      desc: "Watch your program shift dynamically as your body and fitness levels level up.",
    },
    {
      title: "No generic cookie-cutter programs",
      desc: "Ditch the one-size-fits-all approach for a strategy that respects your individuality.",
    },
    {
      title: "Comprehensive nutrition guidance",
      desc: "Fuel your body with custom macronutrient breakdowns and meal planning tools.",
    },
    {
      title: "Progress tracking and analytics",
      desc: "Shop curated supplements, apparel, and equipment for your journey.",
    },
  ];

  const step1 = steps[0];
  const step2 = steps[1];
  const step3 = steps[2];
  const step4 = steps[3];

  const renderStep = (step: typeof steps[0]) => {
    if (step.isBackground) {
      const isRight = step.align === "right";
      return (
        <div
          key={step.number}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "560px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            overflow: "hidden",
            backgroundImage: `url("${step.image}")`,
            backgroundSize: "cover",
            backgroundPosition: isRight ? "right center" : "left center",
            padding: "80px 24px",
          }}
        >
          {/* Overlay fade effect that works dynamically in both light and dark themes */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isRight
                ? "linear-gradient(90deg, var(--bg-primary) 0%, var(--bg-primary) 45%, transparent 75%)"
                : "linear-gradient(270deg, var(--bg-primary) 0%, var(--bg-primary) 45%, transparent 75%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "1280px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: isRight ? "flex-start" : "flex-end",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "540px", width: "100%" }}>
              <h2
                style={{
                  fontFamily: "var(--font-bebas), sans-serif",
                  fontSize: "56px",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  margin: 0,
                  lineHeight: "1.1",
                  letterSpacing: "0.5px",
                }}
              >
                {step.title}
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "18px",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                {step.description}
              </p>
              {step.features && step.features.length > 0 && (
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                  {step.features.map((feat, fidx) => (
                    <li key={fidx} style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "16px", color: "var(--text-primary)" }}>
                      <span style={{ color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{
                          background: "#10b981",
                          color: "#ffffff",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px"
                        }}>
                          <Check size={10} />
                        </span>
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={step.number} className="how-work-section-block" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
          <div className={`how-work-section-container ${step.align === "left" ? "image-left" : ""}`}>
            {step.align === "right" ? (
              <>
                <div className="how-work-section-text">
                  <h2 className="how-work-section-title" style={{ color: "var(--text-primary)" }}>{step.title}</h2>
                  <p className="how-work-section-desc" style={{ color: "var(--text-secondary)" }}>{step.description}</p>
                  {step.features && step.features.length > 0 && (
                    <ul className="how-work-section-features">
                      {step.features.map((feat, fidx) => (
                        <li key={fidx} style={{ color: "var(--text-primary)" }}>
                          <span className="how-work-section-check">
                            <span style={{
                              background: "#10b981",
                              color: "#ffffff",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "11px"
                            }}>
                              <Check size={10} />
                            </span>
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="how-work-section-image-wrapper">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={600}
                    height={450}
                    style={{ objectFit: "contain", width: "100%", height: "auto" }}
                    sizes="(max-width: 768px) 100vw, 600px"
                    quality={80}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="how-work-section-image-wrapper">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={600}
                    height={450}
                    style={{ objectFit: "contain", width: "100%", height: "auto" }}
                    sizes="(max-width: 768px) 100vw, 600px"
                    quality={80}
                  />
                </div>
                <div className="how-work-section-text">
                  <h2 className="how-work-section-title" style={{ color: "var(--text-primary)" }}>{step.title}</h2>
                  <p className="how-work-section-desc" style={{ color: "var(--text-secondary)" }}>{step.description}</p>
                  {step.features && step.features.length > 0 && (
                    <ul className="how-work-section-features">
                      {step.features.map((feat, fidx) => (
                        <li key={fidx} style={{ color: "var(--text-primary)" }}>
                          <span className="how-work-section-check">
                            <span style={{
                              background: "#10b981",
                              color: "#ffffff",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "11px"
                            }}>
                              <Check size={10} />
                            </span>
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <main className="how-work-page legal-page" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* 1st Section: Hero Section */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "380px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "160px 24px 80px 24px",
          backgroundColor: "var(--bg-primary)",
          textAlign: "center",
        }}
      >
        <div className="animate-fade-in-up" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontWeight: 400,
              fontSize: "64px",
              lineHeight: "1.1",
              color: "var(--text-primary)",
              marginBottom: "20px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Your Journey to a Better You
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "18px",
              maxWidth: "600px",
              margin: "0 auto 32px auto",
              lineHeight: "1.6",
            }}
          >
            Follow our simple 5-step process to transform your fitness journey with
            personalized, science-backed training and nutrition.
          </p>
          <div>
            <Link
              href="/features"
              className="btn-primary"
              style={{
                backgroundColor: "var(--text-primary)",
                color: "var(--bg-primary)",
                padding: "16px 36px",
                borderRadius: "9999px",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "14px",
                letterSpacing: "1px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* 2nd Section: Create Your Profile (Step 1) */}
      {renderStep(step1)}

      {/* 3rd Section: Identify Your Morphology (Step 2) */}
      {renderStep(step2)}

      {/* 4th Section: Choose Your Goal (Step 3) */}
      {renderStep(step3)}

      {/* 5th Section: Ready to Experience These Features? */}
      <section className="how-work-section-block" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="how-work-section-container">
          <div className="how-work-section-text">
            <h2 className="how-work-section-title" style={{ color: "var(--text-primary)" }}>
              Ready to Experience These Features?
            </h2>
            <p className="how-work-section-desc" style={{ color: "var(--text-secondary)" }}>
              King Morph combines AI-driven coaching, personalized morphology-based
              training, and premium performance apparel into one ecosystem.
            </p>
            <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#000",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "12px 24px",
                  borderRadius: "var(--radius-md)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "14px",
                  transition: "opacity 0.2s",
                }}
              >
                <span>GET IT ON</span>
                <span style={{ fontWeight: 800 }}>Google Play</span>
              </a>
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#000",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "12px 24px",
                  borderRadius: "var(--radius-md)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "14px",
                  transition: "opacity 0.2s",
                }}
              >
                <span>Download on the</span>
                <span style={{ fontWeight: 800 }}>App Store</span>
              </a>
            </div>
          </div>

          <div className="how-work-section-image-wrapper">
            <Image
              src="/images/how-work/ready-Experience.png"
              alt="Ready to Experience Features"
              width={600}
              height={450}
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
              sizes="(max-width: 768px) 100vw, 600px"
              quality={80}
            />
          </div>
        </div>
      </section>

      {/* 6th Section: Track Your Results (Step 4) */}
      {renderStep(step4)}

      {/* 7th Section: Why This Approach Works */}
      <section style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                fontSize: "56px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Why This Approach Works
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
              Our method is built on proven principles of exercise science and personalized nutrition.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "32px",
            }}
          >
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-lg)",
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  transition: "all 0.3s ease",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontSize: "24px",
                    margin: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--text-primary)",
                  }}
                >
                  {benefit.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8th Section: Contact Section at the Bottom */}
      <section style={{ background: "var(--bg-primary)", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: "64px",
              alignItems: "center",
            }}
          >
            {/* Info on the LEFT */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <div>
                <span style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "var(--accent)" }}>
                  Reach Out to us
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontSize: "56px",
                    textTransform: "uppercase",
                    marginTop: "12px",
                    lineHeight: "1.1",
                    color: "var(--text-primary)",
                  }}
                >
                  We are here to help
                </h2>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: "1.8", margin: 0 }}>
                Whether you have a question about our services, need help with your order, or simply want to learn more about what we offer, our team is here to assist you. Fill out the form and we’ll get back to you as soon as possible.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "12px" }}>
                <p style={{ color: "var(--text-primary)", fontWeight: 600, margin: 0 }}>
                  Email: <a href="mailto:support@kingmorph.com" style={{ color: "var(--accent)", textDecoration: "none" }}>support@kingmorph.com</a>
                </p>
                <p style={{ color: "var(--text-primary)", fontWeight: 600, margin: 0 }}>
                  Phone: <a href="tel:+15551234567" style={{ color: "var(--text-primary)", textDecoration: "none" }}>+1 (555) 123-4567</a>
                </p>
              </div>
            </div>

            {/* Form on the RIGHT */}
            <div className="contact-form-card">
              <h3>Send us message</h3>
              {submitted ? (
                <div style={{ color: "#10b981", padding: "24px 0", fontSize: "16px", fontWeight: 600 }}>
                  Thank you! Your message has been sent successfully. We will get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-page-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="(513) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us what you're looking for..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="submit-btn full-width">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
