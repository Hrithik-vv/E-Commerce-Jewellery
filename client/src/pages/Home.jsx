import React, { useState } from "react";
import { FaArrowRight, FaStar, FaEnvelope, FaShippingFast, FaShieldAlt, FaUndo, FaHeadset } from "react-icons/fa";
import "../css/Home.css";

function Home() {
  // Newsletter Form State & Validation
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
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

  // Sample Data for Categories (6 Category Cards)
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
            <button className="primary-btn">
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
          <button className="view-all-btn">View All</button>
        </div>

        <div className="best-sellers-grid">
          {bestSellers.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <span className="product-name">{product.name}</span>
                <div className="product-rating">
                  {[...Array(product.rating)].map((_, i) => (
                    <FaStar key={i} size={14} color="#D4AF37" />
                  ))}
                </div>
                <span className="product-price">{product.price}</span>
              </div>
              <button className="add-to-cart-btn">Add To Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Shop By Category Section */}
      <section className="category-section">
        <div className="category-header">
          <h2 className="section-title">Shop By Category</h2>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
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
              <button type="submit" className="subscribe-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 7. Trust Features Section */}
      <section className="trust-section">
        <div className="trust-grid">
          {trustFeatures.map((item) => (
            <div key={item.id} className="trust-card">
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