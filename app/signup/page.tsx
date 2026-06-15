"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, Check, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function SignUpPage() {
  const { setUser } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    // Simulate API registration
    setTimeout(() => {
      setUser({
        name: name || "John Doe",
        email: email || "jondoe@gmail.com",
        avatar: "/images/profile-image.png",
        isLoggedIn: true
      });
      setIsLoading(false);
      router.push("/profile?tab=profile");
    }, 1200);
  };

  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      backgroundColor: "var(--bg-primary)", 
      color: "var(--text-primary)",
      fontFamily: "var(--font-inter)",
      transition: "background-color 0.3s ease, color 0.3s ease"
    }}>
      
      {/* Left Column - Dark Grid Background & App Welcome */}
      <div className="auth-left-panel" style={{
        flex: "1",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 40px",
        overflow: "hidden"
      }}>
        {/* Background Image */}
        <Image 
          src="/images/background-image-auth.png" 
          alt="Auth Grid Background" 
          fill 
          style={{ objectFit: "cover" }} 
          priority
        />
        
        {/* Glowing Gradient Overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)",
          zIndex: 1
        }} />

        {/* Content Overlay */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "440px" }}>
          {/* Welcome Badge */}
          <div style={{
            display: "inline-block",
            padding: "8px 20px",
            borderRadius: "30px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 700,
            marginBottom: "32px",
            letterSpacing: "0.5px"
          }}>
            Welcome!
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: "1.1",
            margin: "0 0 16px 0",
            letterSpacing: "-1px"
          }}>
            Smarter<br />Workout App
          </h1>

          {/* Subtitle Description */}
          <p style={{
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: "1.6",
            margin: "0 0 40px 0"
          }}>
            Comprehensive tools designed to help you achieve your fitness goals faster.
          </p>

          {/* Bullet Check List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              "Personalized workout",
              "Nutrition plans",
              "Morphology and goals"
            ].map((text, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <Check size={12} color="#ffffff" />
                </div>
                <span style={{ fontSize: "16px", fontWeight: 600, color: "#ffffff" }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Sign Up Form */}
      <div className="auth-right-panel" style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 40px",
        backgroundColor: "var(--bg-primary)",
        borderLeft: "1px solid var(--border-light)",
        position: "relative"
      }}>
        
        {/* Back To Home Button */}
        <Link href="/" style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--text-secondary)",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: 600,
          transition: "color 0.2s"
        }}
          className="back-btn-hover"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div style={{ width: "100%", maxWidth: "400px", textAlign: "center", marginTop: "20px" }}>
          
          {/* Header */}
          <h2 style={{
            fontSize: "32px",
            fontWeight: 800,
            color: "var(--text-primary)",
            margin: "0 0 8px 0",
            letterSpacing: "-0.5px"
          }}>
            Create your account
          </h2>
          <p style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            margin: "0 0 32px 0",
            lineHeight: "1.5"
          }}>
            Sign up for free to access to in any of our products
          </p>

          {/* Error Message Box */}
          {errorMsg && (
            <div style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
              borderRadius: "8px",
              padding: "12px 14px",
              fontSize: "13px",
              fontWeight: 600,
              textAlign: "left",
              marginBottom: "20px"
            }}>
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
            
            {/* Full Name */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center"
                }}>
                  <User size={16} />
                </span>
                <input 
                  type="text" 
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input-field"
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 38px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-light)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s"
                  }}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center"
                }}>
                  <Mail size={16} />
                </span>
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input-field"
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 38px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-light)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s"
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center"
                }}>
                  <Lock size={16} />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input-field"
                  style={{
                    width: "100%",
                    padding: "12px 44px 12px 38px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-light)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: 0
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
                Confirm Password
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center"
                }}>
                  <Lock size={16} />
                </span>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  required
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="auth-input-field"
                  style={{
                    width: "100%",
                    padding: "12px 44px 12px 38px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-light)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: 0
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <p style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
              lineHeight: "1.5",
              margin: "2px 0 6px 0"
            }}>
              By creating an account, you agree to our{" "}
              <Link href="/terms" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "underline" }}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "underline" }}>
                Privacy Policy
              </Link>
            </p>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: "var(--text-primary)",
                color: "var(--bg-primary)",
                padding: "14px",
                borderRadius: "30px",
                fontWeight: 700,
                fontSize: "14px",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "opacity 0.2s, transform 0.1s"
              }}
              className="action-btn-hover"
            >
              {isLoading ? (
                <div className="spinner" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Social Register Divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "20px 0",
            color: "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 600
          }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border-light)" }} />
            <span>or sign up with</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border-light)" }} />
          </div>

          {/* Social Register Buttons */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button 
              type="button" 
              onClick={() => {
                setUser({ name: "Google User", email: "google@gmail.com", avatar: "/images/profile-image.png", isLoggedIn: true });
                router.push("/profile?tab=profile");
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "14px",
                borderRadius: "30px",
                border: "1px solid var(--border-light)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background-color 0.2s, border-color 0.2s"
              }}
              className="social-btn-hover"
            >
              <Image src="/images/google.png" alt="Google Icon" width={18} height={18} /> Sign up with Google
            </button>
          </div>

          {/* Switch to Signin */}
          <p style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            marginTop: "24px",
            fontWeight: 500
          }}>
            Already have an account?{" "}
            <Link 
              href="/signin" 
              style={{ 
                color: "var(--accent)", 
                fontWeight: 700, 
                textDecoration: "underline" 
              }}
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>

      <style jsx global>{`
        .auth-input-field:-webkit-autofill,
        .auth-input-field:-webkit-autofill:hover, 
        .auth-input-field:-webkit-autofill:focus, 
        .auth-input-field:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px var(--bg-secondary) inset !important;
          -webkit-text-fill-color: var(--text-primary) !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        .auth-input-field:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px var(--accent-alpha) !important;
        }
        .action-btn-hover:hover {
          opacity: 0.9;
        }
        .action-btn-hover:active {
          transform: scale(0.98);
        }
        .back-btn-hover:hover {
          color: var(--text-primary) !important;
        }
        .social-btn-hover:hover {
          background-color: var(--bg-card-hover) !important;
          border-color: var(--text-muted) !important;
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 991px) {
          .auth-left-panel {
            display: none !important;
          }
          .auth-right-panel {
            width: 100% !important;
            padding: 40px 24px !important;
            border-left: none !important;
          }
          .auth-right-panel > a {
            top: 24px !important;
            left: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
