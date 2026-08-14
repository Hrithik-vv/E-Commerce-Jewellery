import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../utils/CartContext';
import api from '../utils/api';
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

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [productRes, relatedRes] = await Promise.all([
          api.get(`/products/getsingleproductdetails/${id}`),
          api.get(`/products/getrelatedproducts/${id}`)
        ]);

        if (productRes.success) {
          setProduct(productRes.product);
        } else {
          setError(productRes.message || 'Product not found');
        }

        if (relatedRes.success) {
          setRelatedProducts(relatedRes.products || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch product details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductData();
      setQty(1); // Reset quantity on navigation
    }
  }, [id]);

  const decrement = () => setQty((q) => (q > 1 ? q - 1 : 1));
  const increment = () => setQty((q) => q + 1);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty);
      // After adding, navigate to the Cart page
      navigate('/cart');
    }
  };

  const handleBuyNow = () => {
    // Ensure user is logged in before proceeding to checkout
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      // Redirect to login with intent to checkout after authentication, preserving product and quantity
      const redirectUrl = `/checkout?productId=${id}&qty=${qty}`;
      navigate(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
      return;
    }
    if (product) {
      addToCart(product, qty);
      navigate('/checkout');
    }
  };

  if (isLoading) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2 style={{ color: 'red' }}>{error || 'Product not found'}</h2>
        <button onClick={() => navigate('/products')} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <>
      {/* ===== Product Hero Section ===== */}
      <section className="product-hero">
        {/* Product Image */}
        <div className="product-image-section">
          <div className="product-image">
            {product.productImage ? (
              <img
                src={product.productImage}
                alt={product.productName}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            ) : (
              <PlaceholderIcon size={64} />
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.productName}</h1>
          <p className="product-price">Rs. {product.price.toLocaleString()}</p>
          <hr className="product-divider" />

          {/* Action Row */}
          <div className="action-row">
            <div className="quantity-selector">
              <button className="qty-btn" onClick={decrement} aria-label="Decrease quantity">−</button>
              <div className="qty-value">{qty}</div>
              <button className="qty-btn" onClick={increment} aria-label="Increase quantity">+</button>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <CartIcon />
              Add to Cart
            </button>
          </div>

          <button className="buy-now-btn" onClick={handleBuyNow}>Buy It Now</button>

          {/* Product Details List */}
          <ul className="product-details-list">
            <li>
              Category: <strong>{product.category}</strong>
            </li>
            {product.stockQuantity !== undefined && (
              <li>
                Availability: <strong>{product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}</strong>
              </li>
            )}
            {product.description && (
              <li>
                Description: <strong>{product.description}</strong>
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* ===== You May Also Like Section ===== */}
      <section className="also-like-section">
        <h2 className="also-like-title">You may also like</h2>
        <div className="related-grid">
          {relatedProducts.map((rp) => (
            <div
              className="related-card"
              key={rp._id}
              onClick={() => navigate(`/product/${rp._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="related-card-image">
                {rp.productImage ? (
                  <img
                    src={rp.productImage}
                    alt={rp.productName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                ) : (
                  <PlaceholderIcon size={40} />
                )}
              </div>
              <div className="related-card-name">{rp.productName}</div>
              <div className="related-card-price">Rs. {rp.price.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
