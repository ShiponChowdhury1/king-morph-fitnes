import { Navbar, Footer } from "../_components";

export const metadata = {
  title: "Terms of Service | MorphFit",
  description: "Read the Terms of Service carefully before using MorphFit website, application, or services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="no-hero">
      <Navbar />
      <main className="legal-page">
        <section className="legal-hero">
          <div className="legal-hero-content animate-fade-in-up">
            <h1>Terms of Service</h1>
            <p>Please read these terms carefully before using our services. By using MorphFit, you agree to be bound by these terms.</p>
            <span className="last-updated">Last Updated: February 23, 2026</span>
          </div>
        </section>

        <div className="legal-container">
          <div className="legal-card animate-fade-in-up">
            <p>
              Welcome to MorphFit. These Terms of Service (&quot;Terms&quot;) govern your use of our website and mobile application. By accessing or using MorphFit, you agree to be bound by these Terms and our Privacy Policy.
            </p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using MorphFit, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our services.
            </p>

            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily access and use the materials (information or software) on MorphFit for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials, use the materials for any commercial purpose, or attempt to decompile or reverse engineer any software contained on MorphFit.
            </p>

            <h2>User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
            </p>

            <h2>Health and Medical Disclaimer</h2>
            <p>
              MorphFit provides fitness and nutrition information for educational purposes only. This information is not intended as medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on MorphFit.
            </p>

            <h2>Subscription and Billing</h2>
            <p>
              Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. Billing cycles are set on a monthly basis. At the end of each billing cycle, your subscription will automatically renew unless you cancel it or we cancel it.
            </p>

            <h2>Cancellation and Refunds</h2>
            <p>
              You may cancel your subscription at any time through your account settings. Upon cancellation, you will retain access to paid features until the end of your current billing period. We do not provide refunds for partial subscription periods, except as required by law.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of MorphFit and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks may not be used in connection with any product or service without the prior written consent of MorphFit.
            </p>

            <h2>User Content</h2>
            <p>
              You retain all rights to any content you submit, post, or display on or through the Service. By submitting, posting, or displaying content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content.
            </p>

            <h2>Prohibited Uses</h2>
            <p>
              You may not use our Service for any illegal or unauthorized purpose, to violate any laws in your jurisdiction, to infringe upon our intellectual property rights, to harass or harm another person, to submit false or misleading information, to upload viruses or malicious code, or to collect or track the personal information of others.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              In no event shall MorphFit, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:legal@morphfit.com">legal@morphfit.com</a></li>
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
