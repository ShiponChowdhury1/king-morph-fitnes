import { Navbar, Footer } from "../_components";

export const metadata = {
  title: "Privacy Policy | MorphFit",
  description: "At MorphFit, we are committed to protecting your privacy and ensuring the security of your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="no-hero">
      <Navbar />
      <main className="legal-page">
        <section className="legal-hero">
          <div className="legal-hero-content animate-fade-in-up">
            <h1>Privacy Policy</h1>
            <p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.</p>
            <span className="last-updated">Last Updated: February 23, 2026</span>
          </div>
        </section>

        <div className="legal-container">
          <div className="legal-card animate-fade-in-up">
            <p>
              At MorphFit, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our fitness application and services.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, including when you create an account, complete your morphology assessment, log workouts, track nutrition, or contact us for support. This includes your name, email address, physical characteristics, fitness data, progress photos, and health information.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, including to personalize your workout and nutrition plans based on your body type and goals. We analyze fitness data to give you insights about your progress and adapt your programs accordingly.
            </p>

            <h2>Data Security</h2>
            <p>
              We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. All data is encrypted in transit using SSL/TLS and at rest using AES-256 encryption. We use industry-standard security practices to protect your information.
            </p>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our platform, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time through your account settings. You can also request a copy of your data or request that we delete your account and all associated data. We will respond to such requests within 30 days.
            </p>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              Our service may contain links to third-party websites or services that are not owned or controlled by MorphFit. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:privacy@morphfit.com">privacy@morphfit.com</a></li>
              <li><strong>Address:</strong> 123 Fitness Street, San Francisco, CA 94102</li>
              <li><strong>Phone:</strong> +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
