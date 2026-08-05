import React from "react";
import {FaFacebookF,FaInstagram,FaWhatsapp,FaTwitter,FaMapMarkerAlt,FaPhoneAlt,FaEnvelope,} from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#0B3D36",
        padding: "60px 80px 0px",
        color: "#FFFFFF",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
          gap: "40px",
          paddingBottom: "48px",
        }}
      >
        {/* Brand Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Logo Container */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Logo Text */}
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "#D4AF37",
                letterSpacing: "1px",
              }}
            >
              Elora Jewellery
            </span>
          </div>

          {/* Tagline Text */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#C9D2CF",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            Crafting timeless elegance and sustainable luxury for your most cherished moments.
          </p>

          {/* Social Icons Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid #3A6660",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              <FaFacebookF size={14} />
            </div>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid #3A6660",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              <FaInstagram size={14} />
            </div>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid #3A6660",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              <FaWhatsapp size={14} />
            </div>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid #3A6660",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              <FaTwitter size={14} />
            </div>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              color: "#D4AF37",
              marginBottom: "16px",
            }}
          >
            Quick Links
          </h4>
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#C9D2CF",
            }}
          >
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>Home</div>
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>About Us</div>
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>Contact Us</div>
          </div>
        </div>

        {/* Categories Column */}
        <div>
          <h4
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              color: "#D4AF37",
              marginBottom: "16px",
            }}
          >
            Categories
          </h4>
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#C9D2CF",
            }}
          >
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>Bangles</div>
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>Pendants</div>
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>Rings</div>
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>Earrings</div>
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>Necklaces</div>
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>+ More</div>
          </div>
        </div>

        {/* Customer Support Column */}
        <div>
          <h4
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              color: "#D4AF37",
              marginBottom: "16px",
            }}
          >
            Customer Support
          </h4>
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#C9D2CF",
            }}
          >
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>Privacy Policy</div>
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>Refund Policy</div>
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>Shipping Policy</div>
            <div style={{ marginBottom: "12px", cursor: "pointer" }}>Disclaimer Policy</div>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h4
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              color: "#D4AF37",
              marginBottom: "16px",
            }}
          >
            Contact
          </h4>

          {/* Address Item Row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <FaMapMarkerAlt
              style={{
                width: "15px",
                height: "15px",
                color: "#D4AF37",
                marginTop: "2px",
                flexShrink: 0,
              }}
            />
            <a
              href="https://maps.google.com/?q=MG+Road+Kochi+Kerala"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "#C9D2CF",
                lineHeight: "1.5",
                textDecoration: "none",
              }}
            >
              Elora Jewellery, MG Road, Kochi, Kerala - 682016
            </a>
          </div>

          {/* Phone Item Row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <FaPhoneAlt
              style={{
                width: "15px",
                height: "15px",
                color: "#D4AF37",
                marginTop: "2px",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "#C9D2CF",
                lineHeight: "1.5",
              }}
            >
              +91 98765 43210
            </span>
          </div>

          {/* Email Item Row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <FaEnvelope
              style={{
                width: "15px",
                height: "15px",
                color: "#D4AF37",
                marginTop: "2px",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "#C9D2CF",
                lineHeight: "1.5",
              }}
            >
              support@elorajewellery.com
            </span>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#244B45",
        }}
      />

      {/* Bottom Bar */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0px",
        }}
      >
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "#9FB0AC",
            textAlign: "center",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} Elora Jewellery. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;