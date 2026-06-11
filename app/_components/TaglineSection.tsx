"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TaglineSection() {
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
      .map((word) => `<span class="reveal-word" style="opacity: 0.15; display: inline-block; margin-right: 0.2em;">${word}</span>`)
      .join(" ");

    const wordSpans = textEl.querySelectorAll(".reveal-word");

    const ctx = gsap.context(() => {
      gsap.to(wordSpans, {
        opacity: 1,
        stagger: 0.05,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",   // Start animating when the top of the section enters the screen
          end: "bottom 50%",   // End when the section reaches the middle
          scrub: 1,            // Smooth animation linked to scroll position
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="tagline-section" id="how-it-works" ref={containerRef}>
      <h2 className="tagline-text" ref={textRef}>
        King Morph combines AI-driven coaching, personalized morphology-based
        training, and premium performance apparel into one ecosystem.
      </h2>
    </section>
  );
}
