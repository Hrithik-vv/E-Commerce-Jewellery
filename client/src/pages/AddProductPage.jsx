import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AddProductPage.css';

const AddProductPage = () => {
  return (
    <div className="add-product-main-container">
      <Link to="/products" className="add-product-back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
          <path d="M15 18L9 12L15 6"/>
        </svg>
        Back to Products
      </Link>

      <div className="add-product-page-header">
        <h1 className="add-product-page-title">Add Product</h1>
        <p className="add-product-page-description">Briefly explains the purpose of the Add Product page.</p>
      </div>

      <div className="add-product-form-shell">
        <div className="add-product-form-main">
          
          <div className="add-product-card">
            <h2 className="add-product-card-title">Product Information</h2>
            <input type="text" className="add-product-input" placeholder="e.g. Emerald Drop Earrings" required />
            <textarea className="add-product-textarea" placeholder="Describe the product's material, style, and details..."></textarea>
            <select className="add-product-select" required>
              <option>Select category</option>
              <option>Rings</option>
              <option>Necklaces</option>
              <option>Bracelets</option>
              <option>Earrings</option>
              <option>Bangles</option>
              <option>Jhumkas</option>
            </select>
          </div>

          <div className="add-product-card">
            <h2 className="add-product-card-title">Pricing</h2>
            <div className="add-product-price-row">
               <div>
                 <span>(Rs.)</span>
                 <input type="number" className="add-product-number-input" placeholder="0.00" required />
               </div>
               <div>
                 <span>(Rs.)</span>
                 <input type="number" className="add-product-number-input" placeholder="0.00" />
               </div>
            </div>
            <p className="add-product-field-hint">Shown as a strikethrough price if higher than the current price.</p>
          </div>

          <div className="add-product-card">
            <h2 className="add-product-card-title">Product Image</h2>
            <div className="add-product-upload-box">
              <svg className="add-product-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span className="add-product-upload-text">Click to upload</span>
              <span className="add-product-upload-subtext">PNG, JPG up to 5MB (recommended: square image)</span>
            </div>
          </div>

        </div>
        
        <div className="add-product-form-side">
          <div className="add-product-card">
            <h2 className="add-product-card-title">Inventory</h2>
            <input type="number" className="add-product-number-input" placeholder="0" required />
          </div>

          <div className="add-product-card">
            <h2 className="add-product-card-title">Visibility</h2>
            <div className="add-product-visibility-row">
              <span className="add-product-visibility-label">Mark as Best Seller</span>
              <div className="add-product-toggle-switch"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="add-product-form-footer">
        <button className="add-product-btn-cancel">Cancel</button>
        <button className="add-product-btn-submit">Add Product</button>
      </div>
    </div>
  );
};

export default AddProductPage;
