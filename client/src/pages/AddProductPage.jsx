import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import '../css/AddProductPage.css';

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: '',
    price: '',
    discountPrice: '',
    stockQuantity: '',
    bestSeller: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.category || !formData.price || !formData.stockQuantity) {
      return toast.error("Please fill in all required fields.");
    }

    try {
      setIsSubmitting(true);
      const submitData = new FormData();
      submitData.append('productName', formData.productName);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('price', formData.price);
      if (formData.discountPrice) submitData.append('discountPrice', formData.discountPrice);
      submitData.append('stockQuantity', formData.stockQuantity);
      submitData.append('isBestSeller', formData.bestSeller);
      
      if (imageFile) {
        submitData.append('productImage', imageFile);
      } else {
        return toast.error("Product image is required");
      }

      const res = await api.post('/products/addproduct', submitData);
      
      if (res.success) {
        toast.success("Product added successfully!");
        navigate('/products');
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.message || "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <p className="add-product-page-description">Enter the details below to add a new piece of jewellery to your store's inventory.</p>
      </div>

      <form onSubmit={handleSubmit} className="add-product-form-shell">
        <div className="add-product-form-main">
          
          <div className="add-product-card">
            <h2 className="add-product-card-title">Product Information</h2>
            <input 
              type="text" 
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="add-product-input" 
              placeholder="e.g. Emerald Drop Earrings" 
              required 
            />
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="add-product-textarea" 
              placeholder="Describe the product's material, style, and details..."
            ></textarea>
            <select 
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="add-product-select" 
              required
            >
              <option value="">Select category</option>
              <option value="Rings">Rings</option>
              <option value="Necklaces">Necklaces</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Earrings">Earrings</option>
              <option value="Bangles">Bangles</option>
              <option value="Jhumkas">Jhumkas</option>
            </select>
          </div>

          <div className="add-product-card">
            <h2 className="add-product-card-title">Pricing</h2>
            <div className="add-product-price-row">
               <div>
                 <span>(Rs.) Price</span>
                 <input 
                   type="number" 
                   name="price"
                   value={formData.price}
                   onChange={handleInputChange}
                   className="add-product-number-input" 
                   placeholder="0.00" 
                   min="0"
                   required 
                 />
               </div>
               <div>
                 <span>(Rs.) Discount Price</span>
                 <input 
                   type="number" 
                   name="discountPrice"
                   value={formData.discountPrice}
                   onChange={handleInputChange}
                   className="add-product-number-input" 
                   placeholder="0.00" 
                   min="0"
                 />
               </div>
            </div>
            <p className="add-product-field-hint">Discount price is shown as a strikethrough price if lower than the current price.</p>
          </div>

          <div className="add-product-card">
            <h2 className="add-product-card-title">Product Image</h2>
            <div className="add-product-upload-box" onClick={triggerFileInput} style={{ cursor: 'pointer', overflow: 'hidden' }}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: '200px' }} />
              ) : (
                <>
                  <svg className="add-product-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span className="add-product-upload-text">Click to upload</span>
                  <span className="add-product-upload-subtext">PNG, JPG up to 5MB (recommended: square image)</span>
                </>
              )}
            </div>
            <input 
              type="file" 
              accept="image/*"
              ref={fileInputRef} 
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>

        </div>
        
        <div className="add-product-form-side">
          <div className="add-product-card">
            <h2 className="add-product-card-title">Inventory</h2>
            <input 
              type="number" 
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
              className="add-product-number-input" 
              placeholder="0" 
              min="0"
              required 
            />
          </div>

          <div className="add-product-card">
            <h2 className="add-product-card-title">Visibility</h2>
            <div className="add-product-visibility-row">
              <span className="add-product-visibility-label">Mark as Best Seller</span>
              <label className="add-product-toggle-switch-label" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  name="bestSeller"
                  checked={formData.bestSeller}
                  onChange={handleInputChange}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </label>
            </div>
          </div>
          
          <div className="add-product-form-footer" style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button type="button" onClick={() => navigate('/products')} className="add-product-btn-cancel">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="add-product-btn-submit">
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
