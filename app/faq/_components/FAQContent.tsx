"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does morphology identification work?",
    answer: "KingMorph uses structural assessments and body metrics to identify your primary morphology (Ectomorph, Mesomorph, or Endomorph). This allows us to customize your training volume, intensity, and macronutrient ratios specifically to your genetic profile for optimal results.",
  },
  {
    question: "Can I change my fitness goal?",
    answer: "Yes, you can update your fitness goals at any time in your profile settings. Your workout programs and nutrition plans will automatically recalculate and adjust to align with your new target.",
  },
  {
    question: "Is this suitable for beginners?",
    answer: "Absolutely. Our morphology-based plans accommodate all fitness levels, from complete beginners to advanced athletes. Each exercise comes with video tutorials and modification options to match your current capability.",
  },
  {
    question: "How long are the workouts?",
    answer: "Workouts typically range from 30 to 60 minutes, depending on your morphology type, fitness level, and selected track. You can also choose express workouts if you have limited time.",
  },
  {
    question: "How does nutrition tracking work?",
    answer: "Our nutrition system calculates your daily caloric and macronutrient targets based on your morphology and goals. You can log meals using our extensive database, scan barcodes, and get automated recipe suggestions tailored to your plan.",
  },
  {
    question: "Can I follow specific diets (keto, vegan, etc.)?",
    answer: "Yes! The meal planner supports various dietary preferences, including vegetarian, vegan, ketogenic, paleo, gluten-free, and dairy-free options, while ensuring you meet your morphological macro targets.",
  },
  {
    question: "Do I need gym access?",
    answer: "Not necessarily. We offer both gym-based and home-based training tracks. Home workouts focus on bodyweight exercises, resistance bands, or dumbbells, so you can train effectively wherever you are.",
  },
];

export default function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <main className="faq-page legal-page">
      <section className="legal-hero">
        <div className="legal-hero-content animate-fade-in-up">
          <h1>Frequently Asked Questions</h1>
          <p>
            Find answers to common questions about MorphFit, our features, and how
            to get the most out of your fitness journey.
          </p>
        </div>
      </section>

      {/* FAQs Accordion Container */}
      <div className="faq-accordion-container animate-fade-in-up">
        <h3>Frequently Asked Questions</h3>
        <div className="accordion-list">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`accordion-item ${isOpen ? "open" : ""}`}>
                <button
                  className="accordion-trigger"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="accordion-icon">
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                </button>
                <div className="accordion-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Still Got Questions Section */}
      <section className="faq-still-questions animate-fade-in-up">
        <div className="faq-contact-grid">
          <div className="faq-contact-info">
            <h2>Still Got Questions? Reach Out To Us</h2>
            <p>
              Whether you have a question about our services, need help with your
              order, or simply want to learn more about what we offer, our team is
              here to assist you. Fill out the form below and we&apos;ll get back
              to you as soon as possible.
            </p>
          </div>

          <div className="faq-contact-form-wrapper">
            <h3>Send Us Message</h3>
            {submitted ? (
              <div className="submission-success">
                <p>Thank you! Your message has been sent successfully. We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-page-form">
                <div className="form-group">
                  <label htmlFor="faq-contact-name">Your Name</label>
                  <input
                    type="text"
                    id="faq-contact-name"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="faq-contact-email">Email Address</label>
                  <input
                    type="email"
                    id="faq-contact-email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="faq-contact-phone">Phone Number</label>
                  <input
                    type="tel"
                    id="faq-contact-phone"
                    placeholder="(513) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="faq-contact-message">Message</label>
                  <textarea
                    id="faq-contact-message"
                    placeholder="Tell us what you're looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn full-width">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
