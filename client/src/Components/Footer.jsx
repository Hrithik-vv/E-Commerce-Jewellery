import React, { useState } from "react";
import {FaFacebookF,FaInstagram,FaWhatsapp,FaTwitter,FaMapMarkerAlt,FaPhoneAlt,FaEnvelope,} from "react-icons/fa";
import "../css/Footer.css";
import { Link } from "react-router-dom";
import api from "../utils/api";

function Footer() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      setEmailSuccess(false);
      return;
    }

    setEmailError("");
    setSubmitting(true);

    try {
      const res = await api.post("/newsletter/subscribe", { email: email.trim() });
      if (res.success) {
        setEmailSuccess(true);
        setEmail("");
      } else {
        setEmailError(res.message || "Failed to subscribe.");
        setEmailSuccess(false);
      }
    } catch (err) {
      if (err.message && err.message.includes("already subscribed")) {
        setEmailError("Email is already subscribed.");
      } else {
        setEmailSuccess(true);
        setEmail("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="footer-container">
      
      {/* Newsletter Section */}
      <div className="footer-newsletter-section">
        <div className="newsletter-icon-wrap">
          <FaEnvelope size={24} color="#5e3b25" />
        </div>
        <div className="newsletter-text-wrap">
          <h3 className="newsletter-heading">STAY CONNECTED <span className="sparkle">✨</span></h3>
          <p className="newsletter-sub">Subscribe to get special offers, latest updates, and more.</p>
        </div>
        <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "SUBSCRIBING..." : "SUBSCRIBE"}
          </button>
        </form>
      </div>
      {emailError && <div className="newsletter-msg error">{emailError}</div>}
      {emailSuccess && <div className="newsletter-msg success">Subscribed successfully!</div>}

      <div className="footer-divider-top" />

      {/* Main Footer Content */}
      <div className="footer-top">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="text-logo">
            <span className="logo-title">ELORA</span>
            <span className="logo-subtitle">JEWELLERY</span>
          </div>
          <p className="footer-tagline">
            Timeless jewellery crafted with passion and precision. Designed to make every moment special.
          </p>
          <div className="footer-social-row">
            <a href="#" className="social-icon-link"><FaInstagram size={16} /></a>
            <a href="#" className="social-icon-link"><FaFacebookF size={16} /></a>
            <a href="#" className="social-icon-link"><FaTwitter size={16} /></a>
            <a href="#" className="social-icon-link"><FaWhatsapp size={16} /></a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="footer-heading">QUICK LINKS</h4>
          <div className="footer-links-list">
            <Link to="/" className="footer-link-item">Home</Link>
            <Link to="/best-sellers" className="footer-link-item">Shop</Link>
            <Link to="/category/necklaces" className="footer-link-item">Collections</Link>
            <Link to="/about" className="footer-link-item">About Us</Link>
            <Link to="/contact" className="footer-link-item">Contact</Link>
          </div>
        </div>

        {/* Customer Care Column */}
        <div>
          <h4 className="footer-heading">CUSTOMER CARE</h4>
          <div className="footer-links-list">
            <Link to="/shipping-policy" className="footer-link-item">Shipping Policy</Link>
            <Link to="/refund-policy" className="footer-link-item">Return Policy</Link>
            <Link to="/privacy-policy" className="footer-link-item">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="footer-link-item">Privacy Policy</Link>
            <Link to="/about" className="footer-link-item">FAQ</Link>
          </div>
        </div>

        {/* Contact Us Column */}
        <div>
          <h4 className="footer-heading">CONTACT US</h4>
          <div className="contact-item-row">
            <FaPhoneAlt className="contact-icon" />
            <span className="contact-text">+91 98765 43210</span>
          </div>
          <div className="contact-item-row">
            <FaEnvelope className="contact-icon" />
            <span className="contact-text">support@elorajewellery.com</span>
          </div>
          <div className="contact-item-row">
            <FaMapMarkerAlt className="contact-icon" />
            <span className="contact-text">Kerala, India</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Elora Jewellery. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;