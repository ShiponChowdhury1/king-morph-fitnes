import { Navbar, Footer } from "../_components";

export const metadata = {
  title: "Cookie Policy | MorphFit",
  description: "Learn how MorphFit uses cookies and similar technologies to provide, customize, and improve our services.",
};

export default function CookiePolicyPage() {
  return (
    <div className="no-hero">
      <Navbar />
      <main className="legal-page">
        <section className="legal-hero">
          <div className="legal-hero-content animate-fade-in-up">
            <h1>Cookie Policy</h1>
            <p>Please read this cookie policy carefully before using our website or mobile application. By using MorphFit, you agree to our use of cookies.</p>
            <span className="last-updated">Last Updated: February 23, 2026</span>
          </div>
        </section>

        <div className="legal-container">
          <div className="legal-card animate-fade-in-up">
            <p>
              Welcome to MorphFit. This Cookie Policy explains how we use cookies and similar technologies to recognize you when you visit our website and mobile application. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>

            <h2>Why Do We Use Cookies?</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our services to operate, and we refer to these as &quot;essential&quot; or &quot;strictly necessary&quot; cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our platform.
            </p>

            <h2>Types of Cookies We Use</h2>
            <p>
              The specific types of first and third-party cookies served through our services and the purposes they perform are described below:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas or persisting your shopping cart items.</li>
              <li><strong>Performance and Analytics Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</li>
              <li><strong>Targeting Cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</li>
            </ul>

            <h2>How Can You Control Cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>

            <h2>Third-Party Tracking Technologies</h2>
            <p>
              In addition to cookies, we may use other, similar technologies, like web beacons (sometimes called &quot;tracking pixels&quot; or &quot;clear gifs&quot;). These are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our services. This allows us, for example, to monitor the traffic patterns of users from one page within our services to another, or to deliver or communicate with cookies.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We reserve the right to modify this Cookie Policy at any time. If we make material changes to this policy, we will notify you by updating the date of this policy and posting it on our services. We encourage you to periodically review this page for the latest information on our cookie practices.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us:
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
