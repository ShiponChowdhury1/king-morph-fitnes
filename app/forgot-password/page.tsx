"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    // Simulate sending OTP instructions
    setTimeout(() => {
      setIsLoading(false);
      router.push("/verify-otp");
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
        <Image 
          src="/images/background-image-auth.png" 
          alt="Auth Grid Background" 
          fill 
          style={{ objectFit: "cover" }} 
          priority
        />
        
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)",
          zIndex: 1
        }} />

        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "440px" }}>
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

          <p style={{
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: "1.6",
            margin: "0 0 40px 0"
          }}>
            Comprehensive tools designed to help you achieve your fitness goals faster.
          </p>

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

      {/* Right Column - Forgot Password Form */}
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
        
        <Link href="/signin" style={{
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
          <ArrowLeft size={14} /> Back to Sign In
        </Link>

        <div style={{ width: "100%", maxWidth: "400px", textAlign: "left", marginTop: "20px" }}>
          
          <h2 style={{
            fontSize: "32px",
            fontWeight: 800,
            color: "var(--text-primary)",
            margin: "0 0 8px 0",
            letterSpacing: "-0.5px"
          }}>
            Forgot password?
          </h2>
          <p style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            margin: "0 0 32px 0",
            lineHeight: "1.5"
          }}>
            If you forgot your password, well, then we'll email you instructions to reset your password
          </p>

          {errorMsg && (
            <div style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
              borderRadius: "8px",
              padding: "12px 14px",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "20px"
            }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
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
                    padding: "14px 14px 14px 38px",
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

            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: "var(--text-primary)",
                color: "var(--bg-primary)",
                padding: "15px",
                borderRadius: "30px",
                fontWeight: 700,
                fontSize: "14px",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "6px",
                transition: "opacity 0.2s, transform 0.1s"
              }}
              className="action-btn-hover"
            >
              {isLoading ? (
                <div className="spinner" />
              ) : (
                <>Submit <span style={{ fontSize: "16px", lineHeight: "1" }}>➔</span></>
              )}
            </button>
          </form>

          <p style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            marginTop: "32px",
            fontWeight: 500,
            textAlign: "center"
          }}>
            Return to{" "}
            <Link 
              href="/signin" 
              style={{ 
                color: "var(--text-primary)", 
                fontWeight: 700, 
                textDecoration: "underline" 
              }}
            >
              Login
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
