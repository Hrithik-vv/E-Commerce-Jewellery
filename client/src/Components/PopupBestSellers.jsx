import React from 'react';
import { FaTimes, FaArrowRight, FaGem } from 'react-icons/fa';
import '../css/PopupBestSellers.css';

function PopupBestSellers({ isOpen = true, onClose, imageUrl }) {
  if (!isOpen) return null;

  const handleCtaClick = () => {
    window.location.href = '/collections/best-sellers';
  };

  return (
    <div
      className="bestsellers-popup-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bestsellers-popup-title"
    >
      {/* Modal Container */}
      <div
        className="bestsellers-popup-modal"
        onClick={(e) => e.stopPropagation()} /* Prevents backdrop click when clicking inside modal */
      >
        {/* 3. Close Button */}
        <button
          className="bestsellers-popup-close"
          onClick={onClose}
          aria-label="Close best sellers pop-up"
        >
          <FaTimes size={16} />
        </button>

        {/* 4. Left Image Section */}
        <div className="bestsellers-popup-image-container">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Best Seller Product"
              className="bestsellers-popup-img"
            />
          ) : (
            /* Icon placeholder if real product photo isn't supplied */
            <FaGem size={64} aria-hidden="true" />
          )}

          {/* Badge */}
          <span className="bestsellers-popup-badge">New.</span>
        </div>

        {/* 5. Right Content Section */}
        <div className="bestsellers-popup-content">
          <span className="bestsellers-popup-eyebrow">Handpicked For You,</span>

          <h2 id="bestsellers-popup-title" className="bestsellers-popup-heading">
            Our Best Sellers Are Waiting
          </h2>

          <p className="bestsellers-popup-description">
            Explore our most loved handcrafted pieces, curated specifically to elevate your timeless collection.
          </p>

          {/* 6. Primary CTA Button */}
          <button className="bestsellers-popup-cta" onClick={handleCtaClick}>
            <span>Shop Best Sellers</span>
            <FaArrowRight size={14} />
          </button>

          {/* 7. Secondary Dismiss Link */}
          <button className="bestsellers-popup-dismiss" onClick={onClose}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupBestSellers;