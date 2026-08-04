import { useState } from 'react';
import '../css/ProductDetailsPage.css';

/* Inline SVG icons to avoid external dependencies */
function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function PlaceholderIcon({ size = 64 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

/* Sample product data */
const product = {
  name: 'Emerald Essence Necklace',
  price: '₹12,499',
  details: [
    { label: 'Length', value: '80cm' },
    { label: 'Extension chain', value: 'No extension' },
    { label: 'Material', value: '18K Gold Plated Brass' },
    { label: 'Stone', value: 'Cubic Zirconia' },
    { label: 'Clasp type', value: 'Lobster claw' },
  ],
};

const relatedProducts = [
  { name: 'Jade Drop Earrings', price: '₹4,299' },
  { name: 'Pearl Blossom Bracelet', price: '₹6,799' },
  { name: 'Sapphire Aura Ring', price: '₹8,999' },
  { name: 'Golden Ivy Pendant', price: '₹10,199' },
];

export default function ProductDetailsPage() {
  const [qty, setQty] = useState(1);

  const decrement = () => setQty((q) => (q > 1 ? q - 1 : 1));
  const increment = () => setQty((q) => q + 1);

  return (
    <>
      {/* ===== Product Hero Section ===== */}
      <section className="product-hero">
        {/* Product Image */}
        <div className="product-image-section">
          <div className="product-image">
            <PlaceholderIcon size={64} />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{product.price}</p>
          <hr className="product-divider" />

          {/* Action Row */}
          <div className="action-row">
            <div className="quantity-selector">
              <button className="qty-btn" onClick={decrement} aria-label="Decrease quantity">−</button>
              <div className="qty-value">{qty}</div>
              <button className="qty-btn" onClick={increment} aria-label="Increase quantity">+</button>
            </div>
            <button className="add-to-cart-btn">
              <CartIcon />
              Add to Cart
            </button>
          </div>

          <button className="buy-now-btn">Buy It Now</button>

          {/* Product Details List */}
          <ul className="product-details-list">
            {product.details.map((item, i) => (
              <li key={i}>
                {item.label}: <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== You May Also Like Section ===== */}
      <section className="also-like-section">
        <h2 className="also-like-title">You may also like</h2>
        <div className="related-grid">
          {relatedProducts.map((rp, i) => (
            <div className="related-card" key={i}>
              <div className="related-card-image">
                <PlaceholderIcon size={40} />
              </div>
              <div className="related-card-name">{rp.name}</div>
              <div className="related-card-price">{rp.price}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
