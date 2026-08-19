import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash, FaStar } from 'react-icons/fa';
import { useCart } from '../utils/CartContext';
import { toast } from 'react-toastify';
import api from '../utils/api';
import '../css/WishlistPage.css';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await api.get('/profile/wishlist');
        if (data.success) setWishlist(data.wishlist || []);
      } catch (err) {
        console.error('Wishlist fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      const data = await api.post(`/profile/wishlist/${productId}`);
      if (data.success) {
        setWishlist(prev => prev.filter(p => p._id !== productId));
        toast.success('Removed from wishlist');
      }
    } catch (err) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  if (loading) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
        </div>
        <div className="wishlist-skeleton-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="wishlist-skeleton-card">
              <div className="skeleton-img"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      {/* Header */}
      <div className="wishlist-header">
        <div className="wishlist-header-left">
          <FaHeart className="wishlist-header-icon" />
          <div>
            <h1>My Wishlist</h1>
            <p>{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
          </div>
        </div>
        {wishlist.length > 0 && (
          <button className="wishlist-continue-btn" onClick={() => navigate('/best-sellers')}>
            Continue Shopping
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <FaHeart size={64} color="#D4AF37" />
          </div>
          <h2>Your wishlist is empty</h2>
          <p>Save products you love and come back to them anytime</p>
          <button className="wishlist-browse-btn" onClick={() => navigate('/best-sellers')}>
            Explore Collection
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(product => {
            const discount = product.compareAtPrice
              ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
              : 0;

            return (
              <div key={product._id} className="wishlist-card">
                <div className="wishlist-card-image" onClick={() => navigate(`/product/${product._id}`)}>
                  {discount > 0 && <span className="wishlist-badge">-{discount}%</span>}
                  {product.stockQuantity === 0 && <span className="wishlist-out-badge">Out of Stock</span>}
                  {product.productImage
                    ? <img src={product.productImage} alt={product.productName} />
                    : <div className="wishlist-no-image">💎</div>
                  }
                </div>

                <div className="wishlist-card-info">
                  <span className="wishlist-card-category">{product.category}</span>
                  <h3 className="wishlist-card-name" onClick={() => navigate(`/product/${product._id}`)}>
                    {product.productName}
                  </h3>
                  <div className="wishlist-card-rating">
                    {[...Array(5)].map((_, i) => <FaStar key={i} size={12} color="#D4AF37" />)}
                  </div>
                  <div className="wishlist-card-price-row">
                    <span className="wishlist-card-price">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.compareAtPrice && (
                      <span className="wishlist-card-original">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </div>

                <div className="wishlist-card-actions">
                  <button
                    className="wishlist-add-cart-btn"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stockQuantity === 0}
                  >
                    <FaShoppingCart size={14} />
                    {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  <button
                    className="wishlist-remove-btn"
                    onClick={() => handleRemove(product._id)}
                    title="Remove from wishlist"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
