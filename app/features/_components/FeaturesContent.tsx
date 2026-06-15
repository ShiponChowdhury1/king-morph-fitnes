"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, User, Dumbbell, Apple, Utensils, LineChart, ShoppingBag } from "lucide-react";

export default function FeaturesContent() {
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

  const moreFeatures = [
    {
      icon: <User size={22} />,
      title: "Morphology Identification",
      desc: "Discover your unique body type through our advanced quiz system.",
    },
    {
      icon: <Dumbbell size={22} />,
      title: "Personalized Training",
      desc: "Custom workout plans designed specifically for your body type and goals.",
    },
    {
      icon: <Apple size={22} />,
      title: "Nutrition Tracking",
      desc: "Track macros and calories with guidance tailored to your morphology.",
    },
    {
      icon: <Utensils size={22} />,
      title: "Custom Recipes",
      desc: "Access hundreds of recipes optimized for your nutritional needs.",
    },
    {
      icon: <LineChart size={22} />,
      title: "Progress Monitoring",
      desc: "Visualize your transformation with detailed analytics and insights.",
    },
    {
      icon: <ShoppingBag size={22} />,
      title: "Fitness Shop",
      desc: "Shop curated supplements, apparel, and equipment for your journey.",
    },
  ];

  return (
    <main className="features-page" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Section 01: Hero Section */}
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
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
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
            Powerful Features for Your Transformation
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "18px",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Everything you need to achieve your fitness goals, personalized to your unique body type and lifestyle.
          </p>
        </div>
      </section>

      {/* Section 02: Morphology Quiz (left side image, right side text) */}
      <section className="features-section-block">
        <div className="features-section-container">
          <div className="features-section-image-wrapper">
            <Image
              src="/images/features/morphology-Quiz.png"
              alt="Morphology Quiz"
              width={540}
              height={450}
              style={{ objectFit: "contain", width: "100%", height: "auto", maxWidth: "480px" }}
              sizes="(max-width: 992px) 100vw, 540px"
              priority
              quality={80}
            />
          </div>
          <div className="features-section-text">
            <h2 className="features-section-title">Morphology Quiz</h2>
            <p className="features-section-desc">
              Take our comprehensive body type assessment to identify your unique morphology. Our science-backed quiz analyzes your physical characteristics to determine whether you&apos;re an ectomorph, mesomorph, endomorph, or one of the five female body shapes.
            </p>
            <ul className="features-section-features">
              <li>
                <span className="features-section-check">
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
                <span>15-minute comprehensive assessment</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Science-based methodology</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Accurate body type identification</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Personalized recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 03: Smart Training Plans (background image, full width, text right side) */}
      <section
        className="features-bg-section-style bg-align-right"
        style={{ backgroundImage: `url("/images/features/smart-Training-bg.png")` }}
      >
        <div className="features-bg-section-container">
          <div className="features-section-text" style={{ maxWidth: "540px", width: "100%" }}>
            <h2 className="features-section-title">Smart Training Plans</h2>
            <p className="features-section-desc">
              Get custom workout programs designed specifically for your body type and fitness goals. Whether you want to build muscle, lose fat, or improve overall fitness, our plans adapt to your morphology.
            </p>
            <ul className="features-section-features">
              <li>
                <span className="features-section-check">
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
                <span>Body type-optimized exercises</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Progressive overload protocols</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Video demonstrations</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Flexible scheduling</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 04: Nutrition Tracking (left side text, right side image) */}
      <section className="features-section-block">
        <div className="features-section-container">
          <div className="features-section-text">
            <h2 className="features-section-title">Nutrition Tracking</h2>
            <p className="features-section-desc">
              Track your macros, calories, and meals with intelligent guidance tailored to your body type. Our nutrition system helps you fuel your body optimally based on your unique metabolic needs.
            </p>
            <ul className="features-section-features">
              <li>
                <span className="features-section-check">
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
                <span>Morphology-based macro targets</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Meal logging and scanning</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Macro and micronutrient tracking</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Smart suggestions</span>
              </li>
            </ul>
          </div>
          <div className="features-section-image-wrapper">
            <Image
              src="/images/features/nutritionTracking.png"
              alt="Nutrition Tracking"
              width={540}
              height={450}
              style={{ objectFit: "contain", width: "100%", height: "auto", maxWidth: "480px" }}
              sizes="(max-width: 992px) 100vw, 540px"
              quality={80}
            />
          </div>
        </div>
      </section>

      {/* Section 05: Recipe Library (background image, full width, text right side) */}
      <section
        className="features-bg-section-style bg-align-right"
        style={{ backgroundImage: `url("/images/features/recipeLibrary-bg.png")` }}
      >
        <div className="features-bg-section-container">
          <div className="features-section-text" style={{ maxWidth: "540px", width: "100%" }}>
            <h2 className="features-section-title">Recipe Library</h2>
            <p className="features-section-desc">
              Access hundreds of delicious, nutritious recipes optimized for your body type and dietary preferences. Each recipe includes complete nutritional information and easy-to-follow instructions.
            </p>
            <ul className="features-section-features">
              <li>
                <span className="features-section-check">
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
                <span>Large library of curated recipes</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Dietary preference filters</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Nutritional breakdowns</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 06: Progress Tracking (background image, full width, text left side) */}
      <section
        className="features-bg-section-style bg-align-left"
        style={{ backgroundImage: `url("/images/features/progressTracking-bg.png")` }}
      >
        <div className="features-bg-section-container">
          <div className="features-section-text" style={{ maxWidth: "540px", width: "100%" }}>
            <h2 className="features-section-title">Progress Tracking</h2>
            <p className="features-section-desc">
              Monitor your transformation with comprehensive analytics and insights. Track weight, measurements, photos, and performance metrics to visualize your journey and stay motivated.
            </p>
            <ul className="features-section-features">
              <li>
                <span className="features-section-check">
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
                <span>Weight and measurement tracking</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Progress photos</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Performance analytics</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Achievement milestones</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 07: Shop Integration (left side image, right side text) */}
      <section className="features-section-block">
        <div className="features-section-container">
          <div className="features-section-image-wrapper">
            <Image
              src="/images/features/shop-Integration.png"
              alt="Shop Integration"
              width={540}
              height={450}
              style={{ objectFit: "contain", width: "100%", height: "auto", maxWidth: "480px" }}
              sizes="(max-width: 992px) 100vw, 540px"
              quality={80}
            />
          </div>
          <div className="features-section-text">
            <h2 className="features-section-title">Shop Integration</h2>
            <p className="features-section-desc">
              Browse and purchase curated fitness products, supplements, and apparel designed to support your specific body type and training goals. Everything you need in one place.
            </p>
            <ul className="features-section-features">
              <li>
                <span className="features-section-check">
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
                <span>Curated product selection</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Exclusive discounts</span>
              </li>
              <li>
                <span className="features-section-check">
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
                <span>Wide verity of collections</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 08: AI Coaching (left side image, right side text) */}
      <section className="features-section-block">
        <div className="features-section-container">
          <div className="features-section-image-wrapper">
            <Image
              src="/images/features/ai-coaching.png"
              alt="AI Coaching Apps"
              width={540}
              height={450}
              style={{ objectFit: "contain", width: "100%", height: "auto", maxWidth: "480px" }}
              sizes="(max-width: 992px) 100vw, 540px"
              quality={80}
            />
          </div>
          <div className="features-section-text">
            <h2 className="features-section-title">AI Coaching</h2>
            <p className="features-section-desc">
              Get personalized guidance and support from our AI-powered coaching system. Receive real-time feedback, form corrections, and motivation tailored to your progress and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Section 09: AI Coaching - Mirror Hologram (background image, full width, text left side) */}
      <section
        className="features-bg-section-style bg-align-left"
        style={{ backgroundImage: `url("/images/features/ai-coaching-bg.png")` }}
      >
        <div className="features-bg-section-container">
          <div className="features-section-text" style={{ maxWidth: "540px", width: "100%" }}>
            <h2 className="features-section-title">AI Coaching</h2>
            <p className="features-section-desc">
              Get personalized guidance and support from our AI-powered coaching system. Receive real-time feedback, form corrections, and motivation tailored to your progress and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Section 10: Track Workouts & Nutrition (left side image, right side text) */}
      <section className="features-section-block">
        <div className="features-section-container">
          <div className="features-section-image-wrapper">
            <Image
              src="/images/features/ai-coaching.png"
              alt="Track Workouts & Nutrition App"
              width={540}
              height={450}
              style={{ objectFit: "contain", width: "100%", height: "auto", maxWidth: "480px" }}
              sizes="(max-width: 992px) 100vw, 540px"
              quality={80}
            />
          </div>
          <div className="features-section-text">
            <h2 className="features-section-title">Track Workouts & Nutrition</h2>
            <p className="features-section-desc">
              Log your progress and stay accountable every day. Everyone is unique. Our programs are designed for your specific morphology.
            </p>
          </div>
        </div>
      </section>

      {/* Section 11: Ready to Experience These Features? (left side text, right side image, app download badges) */}
      <section className="features-section-block">
        <div className="features-section-container">
          <div className="features-section-text">
            <h2 className="features-section-title">
              Ready to Experience These Features?
            </h2>
            <p className="features-section-desc">
              King Morph combines AI-driven coaching, personalized morphology-based training, and premium performance apparel into one ecosystem.
            </p>
            <div style={{ display: "flex", gap: "16px", marginTop: "12px", flexWrap: "wrap" }}>
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
          <div className="features-section-image-wrapper">
            <Image
              src="/images/features/readyExperience-Features.png"
              alt="Ready to Experience Features"
              width={540}
              height={450}
              style={{ objectFit: "contain", width: "100%", height: "auto", maxWidth: "480px" }}
              sizes="(max-width: 992px) 100vw, 540px"
              quality={80}
            />
          </div>
        </div>
      </section>

      {/* Section 12: Even More Reasons to Choose MorphFit (Grid) */}
      <section style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)", padding: "100px 24px" }}>
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
              Even More Reasons to Choose MorphFit
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
              Additional features that make your fitness journey easier and more effective.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px",
            }}
          >
            {moreFeatures.map((feat, idx) => (
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
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "var(--accent-alpha)",
                    color: "var(--accent)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {feat.icon}
                </div>
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
                  {feat.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 13: Contact Form section */}
      <section style={{ background: "var(--bg-primary)", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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
                  Reach Out to us
                </h2>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: "1.8", margin: 0 }}>
                Whether you have a question about our services, need help with your order, or simply want to learn more about what we offer, our team is here to assist you. Fill out the form below and we’ll get back to you as soon as possible.
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
