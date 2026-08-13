import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import '../css/EditProductPage.css';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: '',
    price: '',
    discountPrice: '',
    stockQuantity: '',
    bestSeller: false
  });
  const [productData, setProductData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/getsingleproductdetails/${id}`);
      if (res.success && res.product) {
        const product = res.product;
        setProductData(product);
        setFormData({
          productName: product.productName || '',
          description: product.description || '',
          category: product.category || '',
          price: product.price || '',
          discountPrice: product.discountPrice || '',
          stockQuantity: product.stockQuantity || '',
          bestSeller: product.isBestSeller || false
        });
        setImagePreview(product.productImage || '');
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error(error.message || "Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

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
      }

      const res = await api.put(`/products/editproduct/${id}`, submitData);
      
      if (res.success) {
        toast.success("Product updated successfully!");
        navigate('/products');
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.message || "Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await api.delete(`/products/deleteproduct/${id}`);
        if (res.success) {
          toast.success('Product deleted successfully');
          navigate('/products');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error(error.message || 'Failed to delete product');
      }
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading product details...</div>;
  }

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
        <p className="edit-product-page-description">Update the details for #{id.substring(0, 8).toUpperCase()} - {formData.productName}.</p>
      </div>

      <form onSubmit={handleSubmit} className="edit-product-form-shell">
        <div className="edit-product-form-main">
          
          <div className="edit-product-card">
            <h2 className="edit-product-card-title">Product Information</h2>
            <input 
              type="text" 
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="edit-product-input" 
              required 
            />
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="edit-product-textarea" 
            ></textarea>
            <select 
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="edit-product-select" 
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

          <div className="edit-product-card">
            <h2 className="edit-product-card-title">Pricing</h2>
            <div className="edit-product-price-row">
               <div>
                 <span>(Rs.) Price</span>
                 <input 
                   type="number" 
                   name="price"
                   value={formData.price}
                   onChange={handleInputChange}
                   className="edit-product-number-input" 
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
                   className="edit-product-number-input" 
                 />
               </div>
            </div>
            <p className="edit-product-field-hint">Discount price is shown as a strikethrough price if lower than the current price.</p>
          </div>

          <div className="edit-product-card">
            <h2 className="edit-product-card-title">Product Image</h2>
            <div className="edit-product-image-preview">
              <div className="edit-product-image-thumbnail">
                {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <div>
                 <div className="edit-product-image-filename">{imageFile ? imageFile.name : 'Current Image'}</div>
                 <div className="edit-product-image-subtext">Click below to change</div>
              </div>
            </div>
            <div className="edit-product-upload-box" onClick={triggerFileInput} style={{ cursor: 'pointer' }}>
              Click to replace image
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
        
        <div className="edit-product-form-side">
          <div className="edit-product-card">
            <div className="edit-product-inventory-header">
              <h2 className="edit-product-card-title">Inventory</h2>
              <span className={`edit-product-inventory-badge ${formData.stockQuantity > 0 ? 'edit-product-badge-instock' : 'edit-product-badge-outofstock'}`}>
                {formData.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <input 
              type="number" 
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
              className="edit-product-number-input" 
              required 
            />
            <p className="edit-product-field-hint">Stock status is calculated automatically from this quantity.</p>
          </div>

          <div className="edit-product-card">
            <h2 className="edit-product-card-title">Visibility</h2>
            <div className="edit-product-visibility-row">
              <span className="edit-product-visibility-label">Mark as Best Seller</span>
              <label className="edit-product-toggle-switch-label" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
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
          
          {productData && (
            <div className="edit-product-card">
              <h2 className="edit-product-card-title">Product Meta</h2>
              <div className="edit-product-meta-row">
                 <span className="edit-product-meta-label">Product ID</span>
                 <span className="edit-product-meta-value">#{productData._id.substring(0, 8).toUpperCase()}</span>
              </div>
              <div className="edit-product-meta-row">
                 <span className="edit-product-meta-label">Date Added</span>
                 <span className="edit-product-meta-value">{new Date(productData.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="edit-product-meta-row">
                 <span className="edit-product-meta-label">Last Updated</span>
                 <span className="edit-product-meta-value">{new Date(productData.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="edit-product-form-footer" style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button type="button" onClick={handleDelete} className="edit-product-btn-delete" style={{ marginRight: 'auto' }}>Delete Product</button>
          <button type="button" onClick={() => navigate('/products')} className="edit-product-btn-cancel">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="edit-product-btn-save">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
