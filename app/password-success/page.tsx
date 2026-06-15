"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PasswordSuccessPage() {
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

      {/* Right Column - Success Card */}
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
        
        <div style={{ 
          width: "100%", 
          maxWidth: "400px", 
          textAlign: "center", 
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "16px",
          border: "1px solid var(--border-light)",
          padding: "40px 30px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)"
        }}>
          
          {/* Green success ring */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <div style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              border: "4px solid rgba(34, 197, 94, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Check size={20} color="#ffffff" />
              </div>
            </div>
          </div>

          <h2 style={{
            fontSize: "26px",
            fontWeight: 800,
            color: "var(--text-primary)",
            margin: "0 0 12px 0",
            letterSpacing: "-0.5px",
            lineHeight: "1.2"
          }}>
            Your Password Successfully Changed
          </h2>
          <p style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            margin: "0 0 32px 0",
            lineHeight: "1.5"
          }}>
            Sign in to your account with your new password
          </p>

          <Link
            href="/signin"
            style={{
              display: "block",
              width: "100%",
              backgroundColor: "var(--text-primary)",
              color: "var(--bg-primary)",
              padding: "15px",
              borderRadius: "30px",
              fontWeight: 700,
              fontSize: "14px",
              textAlign: "center",
              textDecoration: "none",
              transition: "opacity 0.2s, transform 0.1s"
            }}
            className="action-btn-hover"
          >
            Sign in
          </Link>

        </div>
      </div>

      <style jsx global>{`
        .action-btn-hover:hover {
          opacity: 0.9;
        }
        .action-btn-hover:active {
          transform: scale(0.98);
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
        }
      `}</style>
    </div>
  );
}
