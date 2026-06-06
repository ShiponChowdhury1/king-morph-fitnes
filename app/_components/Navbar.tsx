"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Shop", href: "#shop" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("kingmorph-theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    } else {
      document.documentElement.classList.remove("light");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("kingmorph-theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="navbar-container">
          <Link href="/" className="navbar-logo">
            KING<span>MORPH</span>
          </Link>

          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            <a href="#" className="navbar-signin">
              Sign In
            </a>

            <button
              className="navbar-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              style={{ marginLeft: 8 }}
            >
              {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`navbar-mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu"
          style={{ position: "absolute", top: 24, right: 24 }}
        >
          <FaTimes size={24} />
        </button>
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} onClick={handleLinkClick}>
            {link.label}
          </a>
        ))}
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 16 }}>
          <button
            onClick={() => {
              toggleTheme();
              handleLinkClick();
            }}
            className="theme-toggle"
            style={{ marginRight: 0, padding: "12px 24px", border: "1px solid var(--border-light)", width: "100%", borderRadius: "var(--radius-full)" }}
          >
            {theme === "dark" ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><FaSun size={16} /> Light Mode</span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><FaMoon size={16} /> Dark Mode</span>
            )}
          </button>
          
          <a
            href="#"
            className="navbar-signin"
            style={{ display: "block", textAlign: "center", width: 140 }}
            onClick={handleLinkClick}
          >
            Sign In
          </a>
        </div>
      </div>
    </>
  );
}
