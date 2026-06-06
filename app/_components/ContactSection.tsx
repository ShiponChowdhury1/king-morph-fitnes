"use client";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Reach Out to Us</h2>
          <p>
            Whether you have a question about our services, need help with your
            order, or simply want to learn more about what we offer, our team is
            here to assist you. Fill out the form below and we&apos;ll get back
            to you as soon as possible.
          </p>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <h3>Send Us Message</h3>

          <div className="form-group">
            <label htmlFor="contact-name">Your Name</label>
            <input
              type="text"
              id="contact-name"
              placeholder="Jane Doe"
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">Email Address</label>
            <input
              type="email"
              id="contact-email"
              placeholder="example@gmail.com"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-phone">Phone Number</label>
            <input
              type="tel"
              id="contact-phone"
              placeholder="(513) 123-4567"
              autoComplete="tel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              placeholder="Tell us what you're looking for..."
            />
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
