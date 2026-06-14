import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>
            KING<span>MORPH</span>
          </h3>
          <p>
            Train smarter based on your unique body type. Personalized workout
            and nutrition plans designed for real results.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><FaFacebookF size={14} /></a>
            <a href="#" aria-label="Instagram"><FaInstagram size={14} /></a>
            <a href="#" aria-label="Twitter"><FaTwitter size={14} /></a>
            <a href="#" aria-label="YouTube"><FaYoutube size={14} /></a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Product</h4>
          <ul>
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/how-it-works">How It Works</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="#">Pricing</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="#">Support Center</Link>
            </li>
            <li>
              <Link href="#">Community</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link href="/cookies">Cookie Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 MorphFit. All rights reserved.</p>
        <a href="mailto:support@kingmorph.com">support@kingmorph.com</a>
      </div>
    </footer>
  );
}
