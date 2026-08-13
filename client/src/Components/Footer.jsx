import React from "react";
import {FaFacebookF,FaInstagram,FaWhatsapp,FaTwitter,FaMapMarkerAlt,FaPhoneAlt,FaEnvelope,} from "react-icons/fa";
import "../css/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-container">
      {/* Top Section */}
      <div className="footer-top">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo-box">
            <span className="footer-logo-text">Elora Jewellery</span>
          </div>

          <p className="footer-tagline">
            Crafting timeless elegance and sustainable luxury for your most cherished moments.
          </p>

          {/* Social Icons Row */}
          <div className="footer-social-row">
            <div className="social-icon-circle">
              <FaFacebookF size={14} />
            </div>
            <div className="social-icon-circle">
              <FaInstagram size={14} />
            </div>
            <div className="social-icon-circle">
              <FaWhatsapp size={14} />
            </div>
            <div className="social-icon-circle">
              <FaTwitter size={14} />
            </div>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="footer-heading">Quick Links</h4>
          <div className="footer-links-list">
            <Link to="/" className="footer-link-item">Home</Link>
            <Link to="/about" className="footer-link-item">About Us</Link>
            <Link to="/contact" className="footer-link-item">Contact Us</Link>
          </div>
        </div>

        {/* Categories Column */}
        <div>
          <h4 className="footer-heading">Categories</h4>
          <div className="footer-links-list">
            <Link to="/category/bangles" className="footer-link-item">Bangles</Link>
            <Link to="/category/jhumkas" className="footer-link-item">Jhumkas</Link>
            <Link to="/category/rings" className="footer-link-item">Rings</Link>
            <Link to="/category/earrings" className="footer-link-item">Earrings</Link>
            <Link to="/category/necklaces" className="footer-link-item">Necklaces</Link>
            <Link to="/best-sellers" className="footer-link-item">+ More</Link>
          </div>
        </div>

        {/* Customer Support Column */}
        <div>
          <h4 className="footer-heading">Customer Support</h4>
          <div className="footer-links-list">
           <Link to="/privacy-policy" className="footer-link-item">Privacy Policy</Link>
            <Link to="/refund-policy" className="footer-link-item">Refund Policy</Link>
            <Link to="/shipping-policy" className="footer-link-item">Shipping Policy</Link>
            <Link to="/disclaimer-policy" className="footer-link-item">Disclaimer Policy</Link>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="footer-heading">Contact</h4>

          {/* Address Item Row */}
          <div className="contact-item-row">
            <FaMapMarkerAlt className="contact-icon" />
            <a
              href="https://maps.google.com/?q=MG+Road+Kochi+Kerala"
              target="_blank"
              rel="noreferrer"
              className="contact-text-link"
            >
              Elora Jewellery, MG Road, Kochi, Kerala - 682016
            </a>
          </div>

          {/* Phone Item Row */}
          <div className="contact-item-row">
            <FaPhoneAlt className="contact-icon" />
            <span className="contact-text">+91 98765 43210</span>
          </div>

          {/* Email Item Row */}
          <div className="contact-item-row">
            <FaEnvelope className="contact-icon" />
            <span className="contact-text">support@elorajewellery.com</span>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="footer-divider" />

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Elora Jewellery. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;