"use client";

import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactContent() {
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

  return (
    <main className="contact-page legal-page">
      <section className="legal-hero">
        <div className="legal-hero-content animate-fade-in-up">
          <h1>Get In Touch</h1>
          <p>
            Have a question or need help? Our team is here to support you on your
            fitness journey. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="contact-page-container animate-fade-in-up">
        {/* Left Column: Form Card */}
        <div className="contact-form-card">
          <h3>Send Us Message</h3>
          {submitted ? (
            <div className="submission-success">
              <p>Thank you! Your message has been sent successfully. We will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-page-form">
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  type="text"
                  id="contact-name"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number</label>
                <input
                  type="tel"
                  id="contact-phone"
                  placeholder="(513) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
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

        {/* Right Column: Contact Information */}
        <div className="contact-info-column">
          <h3>Contact Information</h3>
          <p className="contact-info-subtitle">
            Prefer to reach out directly? Here are all the ways you can contact us.
          </p>

          <div className="contact-info-cards">
            <div className="info-card">
              <div className="info-card-icon">
                <FaEnvelope size={18} />
              </div>
              <div className="info-card-text">
                <h4>Email</h4>
                <a href="mailto:support@morphfit.com">support@morphfit.com</a>
                <p className="card-subtext">We reply within 24 hours</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                <FaPhoneAlt size={18} />
              </div>
              <div className="info-card-text">
                <h4>Phone</h4>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
                <p className="card-subtext">Mon-Fri 9am-6pm EST</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                <FaMapMarkerAlt size={18} />
              </div>
              <div className="info-card-text">
                <h4>Office</h4>
                <p className="info-value">123 Fitness Street</p>
                <p className="card-subtext">San Francisco, CA 94102</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                <FaClock size={18} />
              </div>
              <div className="info-card-text">
                <h4>Support Hours</h4>
                <p className="info-value">Monday - Friday</p>
                <p className="card-subtext">9:00 AM - 6:00 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
