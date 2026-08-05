import React, { useState } from "react";
import { FaArrowRight, FaStar, FaEnvelope, FaShippingFast, FaShieldAlt, FaUndo, FaHeadset } from "react-icons/fa";

function Home() {
  // Newsletter Form State & Validation
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Please enter a valid email address.");
      setEmailSuccess(false);
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      setEmailSuccess(false);
    } else {
      setEmailError("");
      setEmailSuccess(true);
      setEmail("");
    }
  };

  // Sample Data for Best Sellers (5 Product Cards)
  const bestSellers = [
    { id: 1, name: "Diamond Ring", price: "$499", rating: 5, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "Gold Bangles", price: "$899", rating: 5, image: "https://manubhai.in/wp-content/uploads/2025/09/DJBD17342-3.jpg" },
    { id: 3, name: "Emerald Necklace", price: "$1,299", rating: 5, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400" },
    { id: 4, name: "Pearl Earrings", price: "$299", rating: 4, image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=400" },
    { id: 5, name: "Silver Bracelet", price: "$349", rating: 5, image: "https://m.media-amazon.com/images/I/71sqP5i4brL._AC_UY1100_.jpg" },
  ];

  // Sample Data for Categories (6 Category Cards as requested in BRD)
  const categories = [
    { id: 1, name: "Rings", count: "120+ Products", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200" },
    { id: 2, name: "Bangles", count: "85+ Products", image: "https://manubhai.in/wp-content/uploads/2025/09/DJBD17342-3.jpg" },
    { id: 3, name: "Necklaces", count: "150+ Products", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=200" },
    { id: 4, name: "Earrings", count: "200+ Products", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=200" },
    { id: 5, name: "Pendants", count: "90+ Products", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=200" },
    { id: 6, name: "Bracelets", count: "75+ Products", image: "https://m.media-amazon.com/images/I/71sqP5i4brL._AC_UY1100_.jpg" },
  ];

  // Trust Features Data
  const trustFeatures = [
    { id: 1, icon: <FaShippingFast size={32} color="#0B5D50" />, title: "Free Shipping", desc: "Free shipping on all orders over $500" },
    { id: 2, icon: <FaShieldAlt size={32} color="#0B5D50" />, title: "Certified Authentic", desc: "100% certified authentic hallmarked jewellery" },
    { id: 3, icon: <FaUndo size={32} color="#0B5D50" />, title: "30-Day Returns", desc: "Hassle-free 30-day money-back guarantee" },
    { id: 4, icon: <FaHeadset size={32} color="#0B5D50" />, title: "24/7 Support", desc: "Dedicated customer support whenever you need" },
  ];

  return (
    <>
      {/* BRD Dynamic Styles & Hover Effects */}
      <style>{`
        .primary-btn {
          background-color: #0B5D50;
          color: #FFFFFF;
          transition: all 0.3s ease;
        }
        .primary-btn:hover {
          background-color: #08483E;
          color: #FFFFFF;
        }
        .view-all-btn {
          background-color: transparent;
          border: 2px solid #0B5D50;
          color: #0B5D50;
          transition: all 0.3s ease;
        }
        .view-all-btn:hover {
          background-color: #0B5D50;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(11, 93, 80, 0.2);
        }
        .product-card {
          transition: all 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }
        .add-to-cart-btn {
          background-color: #0B5D50;
          color: #FFFFFF;
          transition: all 0.3s ease;
        }
        .add-to-cart-btn:hover {
          background-color: #08483E;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(11, 93, 80, 0.2);
        }
        .subscribe-btn {
          background-color: #0B5D50;
          color: #FFFFFF;
          transition: all 0.3s ease;
        }
        .subscribe-btn:hover {
          background-color: #08483E;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(11, 93, 80, 0.2);
        }
        .trust-card:last-child {
          border-right: none !important;
        }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; row-gap: 32px !important; }
          .story-grid { grid-template-columns: 1fr !important; row-gap: 32px !important; }
          .best-sellers-grid { grid-template-columns: repeat(3, minmax(180px, 1fr)) !important; }
          .category-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .trust-card { border-right: none !important; }
          .main-container { padding: 0 40px !important; }
        }
        @media (max-width: 640px) {
          .best-sellers-grid { grid-template-columns: repeat(2, minmax(140px, 1fr)) !important; }
          .category-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .trust-grid { grid-template-columns: 1fr !important; }
          .newsletter-wrapper { flex-direction: column !important; }
          .newsletter-form { width: 100% !important; flex-direction: column !important; }
          .email-input { width: 100% !important; }
          .hero-heading { font-size: 36px !important; line-height: 44px !important; }
          .hero-img-container { height: 320px !important; }
          .story-img-container { height: 280px !important; }
          .story-parent { padding: 48px 24px !important; }
          .newsletter-parent { padding: 24px !important; }
          .main-container { padding: 0 20px !important; }
          .best-sellers-header { flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* 1. Main Container */}
      <div
        className="main-container"
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 80px",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          gap: "96px",
          overflowX: "hidden",
        }}
      >
        {/* 2. Hero Section */}
        <section style={{ width: "100%", padding: "80px 0", backgroundColor: "#FFFFFF" }}>
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "45% 55%",
              columnGap: "48px",
              alignItems: "center",
            }}
          >
            {/* Left Content Container */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: "24px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0B5D50",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Exclusive Fine Jewellery
              </span>
              <h1
                className="hero-heading"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "56px",
                  fontWeight: 700,
                  lineHeight: "64px",
                  color: "#134E4A",
                  margin: 0,
                }}
              >
                Timeless Jewellery Collection
              </h1>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "26px",
                  color: "#6B7280",
                  maxWidth: "480px",
                  margin: 0,
                }}
              >
                Discover meticulously crafted gold, diamond, and precious gemstone designs created to illuminate every milestone in your journey.
              </p>
              <button
                className="primary-btn"
                style={{
                  width: "fit-content",
                  height: "52px",
                  padding: "16px 36px",
                  border: "none",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  gap: "8px",
                }}
              >
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: 500 }}>
                  Explore Collection
                </span>
                <FaArrowRight size={16} />
              </button>
            </div>

            {/* Right Image Container */}
            <div
              className="hero-img-container"
              style={{
                width: "100%",
                height: "560px",
                overflow: "hidden",
                borderRadius: "24px",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000"
                alt="Hero Jewellery Collection"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* 3. Best Sellers Section */}
        <section style={{ width: "100%", display: "flex", flexDirection: "column", gap: "48px" }}>
          {/* Header Container */}
          <div
            className="best-sellers-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "40px",
                fontWeight: 600,
                lineHeight: "48px",
                color: "#134E4A",
                margin: 0,
              }}
            >
              Best Sellers
            </h2>
            <button
              className="view-all-btn"
              style={{
                width: "fit-content",
                height: "48px",
                padding: "12px 28px",
                borderRadius: "8px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              View All
            </button>
          </div>

          {/* Product Grid Container (5 Cards) */}
          <div
            className="best-sellers-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(200px, 1fr))",
              gap: "24px",
            }}
          >
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="product-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  padding: "16px",
                  gap: "16px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "12px" }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "#2B2B2B",
                    }}
                  >
                    {product.name}
                  </span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[...Array(product.rating)].map((_, i) => (
                      <FaStar key={i} size={14} color="#D4AF37" />
                    ))}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#0B5D50",
                    }}
                  >
                    {product.price}
                  </span>
                </div>
                <button
                  className="add-to-cart-btn"
                  style={{
                    width: "100%",
                    height: "44px",
                    border: "none",
                    borderRadius: "8px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Shop By Category Section */}
        <section style={{ width: "100%", display: "flex", flexDirection: "column", gap: "48px" }}>
          {/* Header Container */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "40px",
                fontWeight: 600,
                lineHeight: "48px",
                color: "#134E4A",
                margin: 0,
              }}
            >
              Shop By Category
            </h2>
          </div>

          {/* Category Grid Container (6 Cards) */}
          <div
            className="category-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(180px, 1fr))",
              gap: "24px",
            }}
          >
            {categories.map((cat) => (
              <div
                key={cat.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  padding: "20px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: "140px", height: "140px", objectFit: "contain", borderRadius: "50%" }}
                />
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "#2B2B2B",
                  }}
                >
                  {cat.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#6B7280",
                  }}
                >
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Our Story Section */}
        <section
          className="story-parent"
          style={{
            width: "100%",
            backgroundColor: "#F8F7F4",
            borderRadius: "20px",
            padding: "96px 80px",
            overflow: "hidden",
          }}
        >
          <div
            className="story-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "45% 55%",
              columnGap: "64px",
              alignItems: "center",
            }}
          >
            {/* Left Content Container */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#0B5D50",
                }}
              >
                Our Story
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "40px",
                  fontWeight: 600,
                  lineHeight: "48px",
                  color: "#134E4A",
                  margin: 0,
                }}
              >
                Crafting Timeless Elegance Since 1995
              </h2>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "16px",
                  lineHeight: "28px",
                  color: "#6B7280",
                  maxWidth: "520px",
                  margin: 0,
                }}
              >
                Founded in 1995 with a vision to redefine heritage luxury, Elora Jewellery began as a modest artisanal workshop. Over three decades, our master craftsmen have blended traditional Indian goldsmithing techniques with modern architectural design, ensuring every piece tells a story of passion, purity, and unmatched brilliance.
              </p>
            </div>

            {/* Right Image Container */}
            <div
              className="story-img-container"
              style={{
                width: "100%",
                height: "480px",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800"
                alt="Jewellery Craftsmanship"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* 6. Newsletter Section */}
        <section
          className="newsletter-parent"
          style={{
            width: "100%",
            backgroundColor: "#F8F7F4",
            borderRadius: "18px",
            padding: "32px 48px",
          }}
        >
          <div
            className="newsletter-wrapper"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              width: "100%",
            }}
          >
            {/* Left Content Container */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#0B5D50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FaEnvelope size={24} color="#FFFFFF" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#134E4A",
                    margin: 0,
                  }}
                >
                  Subscribe to Our Newsletter
                </h3>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "16px",
                    color: "#6B7280",
                    margin: 0,
                  }}
                >
                  Stay updated with our latest collections, exclusive offers, and new arrivals.
                </p>
              </div>
            </div>

            {/* Right Form Container */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <form
                onSubmit={handleSubscribe}
                className="newsletter-form"
                style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                      setEmailSuccess(false);
                    }}
                    placeholder="Enter your email"
                    className="email-input"
                    style={{
                      width: "420px",
                      height: "52px",
                      padding: "0 20px",
                      borderRadius: "8px",
                      border: emailError
                        ? "1px solid #DC2626"
                        : emailSuccess
                        ? "1px solid #16A34A"
                        : "1px solid #D1D5DB",
                      outline: "none",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "15px",
                    }}
                  />
                  {emailError && (
                    <span
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "14px",
                        color: "#DC2626",
                      }}
                    >
                      {emailError}
                    </span>
                  )}
                  {emailSuccess && (
                    <span
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "14px",
                        color: "#16A34A",
                      }}
                    >
                      Successfully subscribed!
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="subscribe-btn"
                  style={{
                    width: "150px",
                    height: "52px",
                    border: "none",
                    borderRadius: "8px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* 7. Trust Features Section */}
        <section
          style={{
            width: "100%",
            padding: "40px 0",
            borderTop: "1px solid #E5E7EB",
            marginBottom: "40px",
          }}
        >
          <div
            className="trust-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "40px",
            }}
          >
            {trustFeatures.map((item) => (
              <div
                key={item.id}
                className="trust-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "16px",
                  borderRight: "1px solid #E5E7EB",
                  paddingRight: "20px",
                }}
              >
                <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justify: "center" }}>
                  {item.icon}
                </div>
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#134E4A",
                  }}
                >
                  {item.title}
                </span>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "15px",
                    lineHeight: "24px",
                    color: "#6B7280",
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;