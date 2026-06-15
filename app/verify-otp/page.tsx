"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ArrowLeft, Clock } from "lucide-react";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Refs for the 6 input elements to support focus management
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Count down timer simulation
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return; // only allow numbers

    const newOtp = [...otp];
    // Keep only the last character entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current value is empty, clear previous input and focus it
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current value
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasteData)) return; // verify exactly 6 digits

    const digits = pasteData.split("");
    setOtp(digits);
    // Focus last input
    inputRefs.current[5]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const code = otp.join("");
    if (code.length < 6) {
      setErrorMsg("Please enter the full 6-digit OTP code.");
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification API
    setTimeout(() => {
      setIsLoading(false);
      // Simulate successful code (e.g. 123456 or any 6 digits)
      router.push("/reset-password");
    }, 1200);
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    setTimeLeft(59);
    setOtp(["", "", "", "", "", ""]);
    setErrorMsg("");
    inputRefs.current[0]?.focus();
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

      {/* Right Column - Verify OTP Form */}
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
        
        <Link href="/forgot-password" style={{
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
          <ArrowLeft size={14} /> Back
        </Link>

        <div style={{ width: "100%", maxWidth: "420px", textAlign: "left", marginTop: "20px" }}>
          
          <h2 style={{
            fontSize: "32px",
            fontWeight: 800,
            color: "var(--text-primary)",
            margin: "0 0 8px 0",
            letterSpacing: "-0.5px"
          }}>
            Email OTP Verification
          </h2>
          <p style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            margin: "0 0 32px 0",
            lineHeight: "1.5"
          }}>
            OTP sent to your Email Address example ******doe@example.com
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

          <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* OTP 6-Input Layout */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => { inputRefs.current[idx] = el; }}
                  type="text"
                  pattern="\d*"
                  inputMode="numeric"
                  maxLength={1}
                  required
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  className="auth-input-field otp-input"
                  style={{
                    width: "52px",
                    height: "58px",
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: 700,
                    borderRadius: "8px",
                    border: "1px solid var(--border-light)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s"
                  }}
                />
              ))}
            </div>

            {/* Timer Countdown Pill */}
            <div style={{ display: "flex", justifyContent: "center", margin: "4px 0" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "20px",
                backgroundColor: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.15)",
                color: "#ef4444",
                fontSize: "12px",
                fontWeight: 700
              }}>
                <Clock size={12} /> 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft} s
              </div>
            </div>

            {/* Resend OTP Link */}
            <p style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              textAlign: "center",
              margin: 0
            }}>
              Didn't get the OTP?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 0}
                style={{
                  background: "none",
                  border: "none",
                  color: timeLeft > 0 ? "var(--text-muted)" : "var(--text-primary)",
                  fontWeight: 700,
                  textDecoration: "underline",
                  cursor: timeLeft > 0 ? "not-allowed" : "pointer",
                  padding: 0
                }}
              >
                Resend OTP
              </button>
            </p>

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
                <>Verify & proceed <span style={{ fontSize: "16px", lineHeight: "1" }}>➔</span></>
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
        .otp-input:focus {
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
          .otp-input {
            width: 44px !important;
            height: 50px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
