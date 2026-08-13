import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes, FaPlus, FaMinus, FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useCart } from '../utils/CartContext';
import '../css/Cart.css';

function Cart({ isOpen = true, onClose }) {
  const navigate = useNavigate();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItemCount,
    subtotal,
    cartNotes,
    setCartNotes,
  } = useCart();

  const [notesOpen, setNotesOpen] = useState(false);

  const handleQuantityChange = (id, newQty) => {
    updateQuantity(id, newQty);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    if (onClose) onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Semi-transparent Overlay */}
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />

      {/* Drawer Container */}
      <div
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
        aria-modal="true"
        role="dialog"
        aria-label="Shopping Cart"
      >
        {/* 1. Header Section */}
        <div className="cart-header">
          <div className="cart-header-title">
            <h2 className="cart-heading">Cart</h2>
            <div className="cart-count-badge" aria-label={`${totalItemCount} items in cart`}>
              {totalItemCount}
            </div>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Dynamic Display: Empty Cart vs Cart Products */}
        {cartItems.length === 0 ? (
          /* 2. Empty Cart Section */
          <div className="empty-cart-container">
            <h3 className="empty-cart-title">Your cart is empty</h3>
            <p className="empty-cart-account">
              Have an account?{' '}
              <Link to="/login" className="empty-cart-login-link">
                Log in
              </Link>{' '}
              to check out faster.
            </p>
            <button className="continue-shopping-btn" onClick={() => { if (onClose) onClose(); navigate('/best-sellers'); }}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* 3 & 4. Cart Products List & Controls */}
            <div className="cart-products-scroll">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-product-card">
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.title} className="cart-product-image" />
                  </Link>

                  <div className="cart-product-info">
                    <div className="cart-product-title-row">
                      <Link to={`/product/${item.id}`} className="cart-product-title">
                        {item.title}
                      </Link>
                    </div>

                    {item.variant && <div className="cart-product-variant">{item.variant}</div>}
                    <div className="cart-product-price">${Number(item.price).toFixed(2)}</div>

                    <div className="cart-product-actions">
                      <div className="quantity-selector">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <FaMinus size={10} />
                        </button>
                        <input
                          type="number"
                          className="quantity-input"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          aria-label="Product quantity"
                        />
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>

                      <button
                        className="item-remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label="Remove item"
                      >
                        <FaTrashAlt size={14} />
                      </button>

                      <div className="cart-product-total">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>

                    {item.error && <div className="quantity-error">{item.error}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* 5 & 6. Cart Summary & Checkout Footer */}
            <div className="cart-footer">
              {/* Special Instructions Collapsible */}
              <div className="special-instructions">
                <button
                  className="accordion-header"
                  onClick={() => setNotesOpen(!notesOpen)}
                  aria-expanded={notesOpen}
                >
                  <span>Special Instructions</span>
                  {notesOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </button>
                {notesOpen && (
                  <textarea
                    className="special-instructions-textarea"
                    placeholder="Add delivery notes or order instructions..."
                    value={cartNotes}
                    onChange={(e) => setCartNotes(e.target.value)}
                  />
                )}
              </div>

              {/* Order Summary */}
              <div className="summary-row">
                <span className="estimated-total-label">Estimated Total</span>
                <span className="estimated-total-amount">${subtotal.toFixed(2)}</span>
              </div>

              <p className="tax-shipping-note">
                Taxes, discounts and shipping calculated at checkout.{' '}
                <Link to="/shipping-policy" className="shipping-policy-link">
                  Shipping Policy
                </Link>
              </p>

              {/* Checkout Button */}
              <button className="checkout-btn" onClick={handleCheckout}>
                Check Out
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;