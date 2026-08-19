import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaStar, FaShippingFast, FaShieldAlt, FaUndo, FaHeadset } from "react-icons/fa";
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

  const categories = CATEGORIES;

  const trustFeatures = [
    { id: 1, icon: <FaShippingFast size={24} color="#5e3b25" />, title: "FREE SHIPPING", desc: "On orders above ₹999" },
    { id: 2, icon: <FaShieldAlt size={24} color="#5e3b25" />, title: "CERTIFIED QUALITY", desc: "100% Hallmarked Jewellery" },
    { id: 3, icon: <FaUndo size={24} color="#5e3b25" />, title: "EASY RETURNS", desc: "7 Days Return Policy" },
    { id: 4, icon: <FaHeadset size={24} color="#5e3b25" />, title: "CUSTOMER SUPPORT", desc: "24/7 Support Available" },
  ];

  return (
    <div className="home-wrapper">
      
      {/* 1. Immersive Hero Section */}
      <section className="classic-hero" style={{ backgroundImage: `url('/banner.jpg')` }}>
        <div className="hero-overlay-gradient"></div>
        <div className="hero-content-full">
          <div className="hero-text-container">
            <h1 className="hero-title">Timeless Elegance,<br/>Crafted for You</h1>
            <div className="hero-divider-small">
              <div className="line"></div>
              <span className="diamond">✦</span>
            </div>
            <p className="hero-desc">
              Exquisite jewellery that celebrates every<br/>moment of your life.
            </p>
            <div className="hero-buttons">
              <button className="btn-solid" onClick={() => navigate("/best-sellers")}>
                SHOP NOW
              </button>
              <button className="btn-outline-hero" onClick={() => navigate("/category/necklaces")}>
                EXPLORE COLLECTIONS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Features */}
      <section className="classic-trust-section">
        <div className="trust-grid">
          {trustFeatures.map(feature => (
            <div key={feature.id} className="trust-item">
              <div className="trust-icon">{feature.icon}</div>
              <div className="trust-text">
                <h3 className="trust-title">{feature.title}</h3>
                <p className="trust-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* 3. Best Sellers */}
      <section className="home-section classic-bestsellers-section">
        <div className="section-header-center">
          <h2 className="classic-section-title">BEST SELLERS <span className="sparkle">✨</span></h2>
          <p className="section-subtitle">Our most loved pieces</p>
        </div>

        <div className="classic-product-grid">
          {loadingBestSellers ? (
            <div className="loading-state">Loading exceptional pieces...</div>
          ) : bestSellers.length === 0 ? (
            <div className="loading-state">No creations available at the moment.</div>
          ) : (
            bestSellers.map((product) => (
              <div key={product._id} className="classic-product-card" onClick={() => navigate(`/product/${product._id}`)}>
                <div className="product-image-wrap">
                  {product.productImage ? (
                    <img src={product.productImage} alt={product.productName} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                  <button className="heart-btn">
                    <FaStar size={16} color="#5e3b25" /> {/* Placeholder for heart icon, image shows a heart outline */}
                  </button>
                </div>
                <div className="product-details">
                  <h3 className="product-name">{product.productName}</h3>
                  <p className="product-material">22K Gold</p>
                  <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="view-all-wrapper">
          <button className="classic-btn-outline" onClick={() => navigate("/best-sellers")}>
            View All Creations
          </button>
        </div>
      </section>

      {/* 4. Shop By Category */}
      <section className="home-section classic-category-section">
        <div className="section-header-center">
          <h2 className="classic-section-title">SHOP BY CATEGORY <span className="sparkle">✨</span></h2>
          <p className="section-subtitle">Find the perfect piece for every occasion</p>
        </div>
        <div className="classic-category-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="classic-category-card"
              onClick={() => navigate(`/category/${cat.slug}`)}
            >
              <div className="category-image-wrap">
                <img src={cat.image} alt={cat.name} />
              </div>
              <h3 className="category-title">{cat.name}</h3>
              <p className="category-subtitle">100+ Designs</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Our Story */}
      <section className="home-section classic-story-section">
        <div className="story-split">
          <div className="story-text">
            <p className="story-subtitle">OUR STORY</p>
            <h2 className="story-title">Crafted with Passion,<br/>Inspired by Tradition</h2>
            <div className="story-divider-small">
              <div className="line"></div>
              <span className="diamond">✦</span>
            </div>
            <p className="story-paragraph">
              At Elora Jewellery, every piece is more than just an accessory - it's a story of heritage, craftsmanship, and timeless beauty.
            </p>
            <p className="story-paragraph">
              We blend traditional artistry with modern elegance to create jewellery that celebrates you.
            </p>
            <button className="btn-solid" onClick={() => navigate("/about")}>
              DISCOVER OUR JOURNEY
            </button>
          </div>
          <div className="story-image">
             <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1000" alt="Craftsmanship" />
          </div>
        </div>
      </section>



    </div>
  );
}

export default Home;