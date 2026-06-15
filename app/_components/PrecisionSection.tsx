"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Apple, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PrecisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const textEl = textRef.current;
    if (!textEl) return;

    // Split text into words
    const words = textEl.innerText.split(/\s+/);
    textEl.innerHTML = words
      .map((word) => `<span class="reveal-word-precision" style="opacity: 0.15; display: inline-block; margin-right: 0.2em;">${word}</span>`)
      .join(" ");

    const wordSpans = textEl.querySelectorAll(".reveal-word-precision");

    const ctx = gsap.context(() => {
      gsap.to(wordSpans, {
        opacity: 1,
        stagger: 0.05,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",    // Start animating when the top of the section enters the screen
          end: "bottom 60%",   // End when the section reaches middle-high viewport
          scrub: 1,            // Smooth animation linked to scroll position
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="precision-section" id="precision" ref={containerRef}>
      <div className="precision-container">
        <div className="precision-text">
          <p className="label">Performance Meets Precision</p>
          <h2 ref={textRef}>
            King Morph combines AI-driven coaching, personalized
            morphology-based training, and premium performance apparel into one
            ecosystem.
          </h2>
          <div className="app-store-buttons">
            <a href="#" className="store-btn">
              <Apple size={24} />
              <div className="store-btn-text">
                <small>Download on the</small>
                <span>App Store</span>
              </div>
            </a>
            <a href="#" className="store-btn">
              <Play size={22} fill="currentColor" />
              <div className="store-btn-text">
                <small>GET IT ON</small>
                <span>Google Play</span>
              </div>
            </a>
          </div>
        </div>

        <div className="precision-image animate-float">
          <Image
            src="/images/preclsion.png"
            alt="KingMorph app interface showing morphology-based training"
            width={480}
            height={560}
            style={{ objectFit: "contain", borderRadius: "24px" }}
          />
        </div>
      </div>
    </section>
  );
}
