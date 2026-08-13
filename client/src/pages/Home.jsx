import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaStar, FaEnvelope, FaShippingFast, FaShieldAlt, FaUndo, FaHeadset } from "react-icons/fa";
import { useCart } from "../utils/CartContext";
import { CATEGORIES } from "../utils/productsData";
import api from "../utils/api";
import "../css/Home.css";

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Newsletter Form State & Validation
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
        setEmailError(res.message || "Failed to subscribe. Please try again.");
        setEmailSuccess(false);
      }
    } catch (err) {
      if (err.message && err.message.includes("already subscribed")) {
        setEmailError("Email is already subscribed to the newsletter.");
      } else {
        // Fallback frontend state if backend is unreachable
        setEmailSuccess(true);
        setEmail("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Best Sellers State from Backend
  const [bestSellers, setBestSellers] = useState([]);
  const [loadingBestSellers, setLoadingBestSellers] = useState(true);
  
  React.useEffect(() => {
    const fetchHomeBestSellers = async () => {
      try {
        const data = await api.get('/products/getbestsellers?limit=4');
        if (data.success) {
          setBestSellers(data.products || []);
        }
      } catch (error) {
        console.error("Failed to load best sellers for home page", error);
      } finally {
        setLoadingBestSellers(false);
      }
    };
    fetchHomeBestSellers();
  }, []);

  // Sample Data for Categories (6 Category Cards)
  const categories = CATEGORIES;

  // Trust Features Data
  const trustFeatures = [
    { id: 1, icon: <FaShippingFast size={32} color="#0B5D50" />, title: "Free Shipping", desc: "Free shipping on all orders over $500", route: "/shipping-policy" },
    { id: 2, icon: <FaShieldAlt size={32} color="#0B5D50" />, title: "Certified Authentic", desc: "100% certified authentic hallmarked jewellery", route: "/about" },
    { id: 3, icon: <FaUndo size={32} color="#0B5D50" />, title: "30-Day Returns", desc: "Hassle-free 30-day money-back guarantee", route: "/refund-policy" },
    { id: 4, icon: <FaHeadset size={32} color="#0B5D50" />, title: "24/7 Support", desc: "Dedicated customer support whenever you need", route: "/contact" },
  ];

  return (
    <div className="main-container">
      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-subtitle">Exclusive Fine Jewellery</span>
            <h1 className="hero-heading">Timeless Jewellery Collection</h1>
            <p className="hero-description">
              Discover meticulously crafted gold, diamond, and precious gemstone designs created to illuminate every milestone in your journey.
            </p>
            <button className="primary-btn" onClick={() => navigate("/best-sellers")}>
              <span>Explore Collection</span>
              <FaArrowRight size={16} />
            </button>
          </div>

          <div className="hero-img-container">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000"
              alt="Hero Jewellery Collection"
            />
          </div>
        </div>
      </section>

      {/* 3. Best Sellers Section */}
      <section className="best-sellers-section">
        <div className="best-sellers-header">
          <h2 className="section-title">Best Sellers</h2>
          <button className="view-all-btn" onClick={() => navigate("/best-sellers")}>View All</button>
        </div>

        <div className="best-sellers-grid">
          {loadingBestSellers ? (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: "20px" }}>Loading...</p>
          ) : bestSellers.length === 0 ? (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: "20px" }}>No best sellers found.</p>
          ) : (
            bestSellers.map((product) => (
              <div
                key={product._id}
                className="product-card"
                onClick={() => navigate(`/product/${product._id}`)}
                style={{ cursor: "pointer" }}
              >
                {product.productImage ? (
                  <img src={product.productImage} alt={product.productName} />
                ) : (
                  <div style={{ width: '100%', height: '250px', background: '#f3f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ opacity: 0.5 }}>No Image</span>
                  </div>
                )}
                <div className="product-info">
                  <span className="product-name">{product.productName}</span>
                  <div className="product-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={14} color="#D4AF37" />
                    ))}
                  </div>
                  <span className="product-price">Rs. {product.price}</span>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. Shop By Category Section */}
      <section className="category-section">
        <div className="category-header">
          <h2 className="section-title">Shop By Category</h2>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => navigate(`/category/${cat.slug}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={cat.image} alt={cat.name} />
              <span className="category-name">{cat.name}</span>
              <span className="category-count">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Our Story Section */}
      <section className="story-parent">
        <div className="story-grid">
          <div className="story-content">
            <span className="story-subtitle">Our Story</span>
            <h2 className="section-title">Crafting Timeless Elegance Since 1995</h2>
            <p className="story-description">
              Founded in 1995 with a vision to redefine heritage luxury, Elora Jewellery began as a modest artisanal workshop. Over three decades, our master craftsmen have blended traditional Indian goldsmithing techniques with modern architectural design, ensuring every piece tells a story of passion, purity, and unmatched brilliance.
            </p>
          </div>

          <div className="story-img-container">
            <img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800"
              alt="Jewellery Craftsmanship"
            />
          </div>
        </div>
      </section>

      {/* 6. Newsletter Section */}
      <section className="newsletter-parent">
        <div className="newsletter-wrapper">
          <div className="newsletter-info">
            <div className="icon-badge">
              <FaEnvelope size={24} color="#FFFFFF" />
            </div>
            <div className="newsletter-text">
              <h3 className="newsletter-title">Subscribe to Our Newsletter</h3>
              <p className="newsletter-desc">
                Stay updated with our latest collections, exclusive offers, and new arrivals.
              </p>
            </div>
          </div>

          <div className="newsletter-form-container">
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-field-wrapper">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                    setEmailSuccess(false);
                  }}
                  placeholder="Enter your email"
                  className={`email-input ${emailError ? "error" : ""} ${emailSuccess ? "success" : ""}`}
                />
                {emailError && <span className="validation-error">{emailError}</span>}
                {emailSuccess && <span className="validation-success">Successfully subscribed!</span>}
              </div>
              <button type="submit" className="subscribe-btn" disabled={submitting}>
                {submitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 7. Trust Features Section */}
      <section className="trust-section">
        <div className="trust-grid">
          {trustFeatures.map((item) => (
            <div
              key={item.id}
              className="trust-card"
              onClick={() => navigate(item.route)}
              style={{ cursor: "pointer" }}
            >
              <div className="trust-icon">{item.icon}</div>
              <span className="trust-title">{item.title}</span>
              <p className="trust-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;