"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function IntegrationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const textEl = textRef.current;
    if (!textEl) return;

    // Split text into words
    const words = textEl.innerText.split(/\s+/);
    textEl.innerHTML = words
      .map((word) => `<span class="reveal-word-integration" style="opacity: 0.15; display: inline-block; margin-right: 0.2em;">${word}</span>`)
      .join(" ");

    const wordSpans = textEl.querySelectorAll(".reveal-word-integration");

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
    <section className="integration-section" id="integration" ref={containerRef}>
      <div className="integration-container">
        <div className="integration-text">
          <h2>Shop Integration</h2>
          <p ref={textRef}>
            Browse and purchase curated fitness products, supplements, and
            apparel designed to support your specific body type and training
            goals. Everything you need in one place.
          </p>

          <ul className="check-list">
            <li>
              <span className="check-icon"><CheckCircle size={16} /></span>
              Curated product selection
            </li>
            <li>
              <span className="check-icon"><CheckCircle size={16} /></span>
              Exclusive discounts
            </li>
            <li>
              <span className="check-icon"><CheckCircle size={16} /></span>
              Wide variety of collections
            </li>
          </ul>

          <a href="#precision" className="btn-primary">
            Download Now
          </a>
        </div>

        <div className="precision-image animate-float">
          <Image
            src="/images/integration.png"
            alt="KingMorph shop integration interface"
            width={480}
            height={560}
            style={{ objectFit: "contain", borderRadius: "24px" }}
            sizes="(max-width: 768px) 100vw, 480px"
            quality={80}
          />
        </div>
      </div>
    </section>
  );
}
