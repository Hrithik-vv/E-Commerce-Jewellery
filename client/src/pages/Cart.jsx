import React, { useState } from 'react';
import { FaTimes, FaPlus, FaMinus, FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../css/Cart.css';

function Cart({ isOpen = true, onClose }) {
  // Sample Cart Items State
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      title: 'Emerald Solitaire Pendant',
      variant: '18k Yellow Gold / 18 Inch',
      price: 650.0,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=300',
      error: '',
    },
    {
      id: '2',
      title: 'Classic Gold Band',
      variant: 'Size 7',
      price: 320.0,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=300',
      error: '',
    },
  ]);

  const [notesOpen, setNotesOpen] = useState(false);
  const [cartNotes, setCartNotes] = useState('');

  // Total Quantity Count
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Subtotal Calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Quantity Change Handlers
  const handleQuantityChange = (id, newQty) => {
    if (isNaN(newQty) || newQty < 1) {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, error: 'Quantity must be at least 1' } : item))
      );
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Number(newQty), error: '' } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    // Redirect to Shopify Checkout securely
    window.location.href = '/checkout';
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
              <a href="/account/login" className="empty-cart-login-link">
                Log in
              </a>{' '}
              to check out faster.
            </p>
            <button className="continue-shopping-btn" onClick={() => (window.location.href = '/collections/all')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* 3 & 4. Cart Products List & Controls */}
            <div className="cart-products-scroll">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-product-card">
                  <a href={`/products/${item.id}`}>
                    <img src={item.image} alt={item.title} className="cart-product-image" />
                  </a>

                  <div className="cart-product-info">
                    <div className="cart-product-title-row">
                      <a href={`/products/${item.id}`} className="cart-product-title">
                        {item.title}
                      </a>
                    </div>

                    {item.variant && <div className="cart-product-variant">{item.variant}</div>}
                    <div className="cart-product-price">${item.price.toFixed(2)}</div>

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
                <a href="/policies/shipping-policy" className="shipping-policy-link">
                  Shipping Policy
                </a>
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