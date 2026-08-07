import React from 'react';
import { Link } from 'react-router-dom';
import '../css/EditProductPage.css';

const EditProductPage = () => {
  return (
    <div className="edit-product-main-container">
      <Link to="/products" className="edit-product-back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
          <path d="M15 18L9 12L15 6"/>
        </svg>
        Back to Products
      </Link>

      <div className="edit-product-page-header">
        <h1 className="edit-product-page-title">Edit Product</h1>
        <p className="edit-product-page-description">Update the details for #PRD-00018 - Emerald Drop Earrings.</p>
      </div>

      <div className="edit-product-form-shell">
        <div className="edit-product-form-main">
          
          <div className="edit-product-card">
            <h2 className="edit-product-card-title">Product Information</h2>
            <input type="text" className="edit-product-input" defaultValue="Emerald Drop Earrings" required />
            <textarea className="edit-product-textarea" defaultValue="Beautiful emerald drop earrings."></textarea>
            <select className="edit-product-select" defaultValue="Earrings" required>
              <option>Select category</option>
              <option>Rings</option>
              <option>Necklaces</option>
              <option>Bracelets</option>
              <option>Earrings</option>
              <option>Bangles</option>
              <option>Jhumkas</option>
            </select>
          </div>

          <div className="edit-product-card">
            <h2 className="edit-product-card-title">Pricing</h2>
            <div className="edit-product-price-row">
               <div>
                 <span>(Rs.)</span>
                 <input type="number" className="edit-product-number-input" defaultValue="15000" required />
               </div>
               <div>
                 <span>(Rs.)</span>
                 <input type="number" className="edit-product-number-input" defaultValue="18000" />
               </div>
            </div>
            <p className="edit-product-field-hint">Shown as a strikethrough price if higher than the current price.</p>
          </div>

          <div className="edit-product-card">
            <h2 className="edit-product-card-title">Product Image</h2>
            <div className="edit-product-image-preview">
              <div className="edit-product-image-thumbnail"></div>
              <div>
                 <div className="edit-product-image-filename">emerald-drop-earrings.jpg</div>
                 <div className="edit-product-image-subtext">Uploaded Aug 7, 2026</div>
              </div>
            </div>
            <div className="edit-product-upload-box">
              Click to replace image
            </div>
          </div>

        </div>
        
        <div className="edit-product-form-side">
          <div className="edit-product-card">
            <div className="edit-product-inventory-header">
              <h2 className="edit-product-card-title">Inventory</h2>
              <span className="edit-product-inventory-badge edit-product-badge-instock">In Stock</span>
            </div>
            <input type="number" className="edit-product-number-input" defaultValue="15" required />
            <p className="edit-product-field-hint">Stock status is calculated automatically from this quantity.</p>
          </div>

          <div className="edit-product-card">
            <h2 className="edit-product-card-title">Visibility</h2>
            <div className="edit-product-visibility-row">
              <span className="edit-product-visibility-label">Mark as Best Seller</span>
              <div className="edit-product-toggle-switch active"></div>
            </div>
          </div>
          
          <div className="edit-product-card">
            <h2 className="edit-product-card-title">Product Meta</h2>
            <div className="edit-product-meta-row">
               <span className="edit-product-meta-label">Product ID</span>
               <span className="edit-product-meta-value">#PRD-00018</span>
            </div>
            <div className="edit-product-meta-row">
               <span className="edit-product-meta-label">Date Added</span>
               <span className="edit-product-meta-value">Aug 1, 2026</span>
            </div>
            <div className="edit-product-meta-row">
               <span className="edit-product-meta-label">Last Updated</span>
               <span className="edit-product-meta-value">Aug 7, 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="edit-product-form-footer">
        <button className="edit-product-btn-delete">Delete Product</button>
        <button className="edit-product-btn-cancel">Cancel</button>
        <button className="edit-product-btn-save">Save Changes</button>
      </div>
    </div>
  );
};

export default EditProductPage;
