import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import '../css/ProductListPage.css';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products/allproducts');
      if (res.success) {
        setProducts(res.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(error.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await api.delete(`/products/deleteproduct/${id}`);
        if (res.success) {
          toast.success('Product deleted successfully');
          setProducts(products.filter(p => p._id !== id));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error(error.message || 'Failed to delete product');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  // Filter products based on search, category and stock
  const displayedProducts = products.filter(product => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product._id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    
    let matchesStock = true;
    if (stockFilter === 'In Stock') matchesStock = product.stockQuantity >= 10;
    if (stockFilter === 'Low Stock') matchesStock = product.stockQuantity > 0 && product.stockQuantity < 10;
    if (stockFilter === 'Out of Stock') matchesStock = product.stockQuantity === 0;

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="plp-main-container">
      {/* Page Header */}
      <div className="plp-page-header">
        <h1 className="plp-page-title">Products</h1>
        <p className="plp-page-description">Manage your entire jewellery catalog, monitor stock statuses, and easily edit or remove product listings from your store.</p>
      </div>

      {/* Filter & Search Section */}
      <div className="plp-filter-container">
        <input 
          type="text" 
          className="plp-search-input" 
          placeholder="Search by Product ID or Product Name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="plp-filter-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Rings">Rings</option>
          <option value="Earrings">Earrings</option>
          <option value="Bangles">Bangles</option>
          <option value="Jhumkas">Jhumkas</option>
          <option value="Bracelets">Bracelets</option>
          <option value="Necklaces">Necklaces</option>
        </select>
        <select className="plp-filter-select" value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
          <option value="All">All Stock</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="plp-table-container">
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading products...</div>
        ) : (
          <table className="plp-table">
            <thead>
              <tr className="plp-table-header-row">
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Stock Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product) => {
                  const isLowStock = product.stockQuantity > 0 && product.stockQuantity < 10;
                  const isOutOfStock = product.stockQuantity === 0;
                  const stockClass = isOutOfStock ? 'plp-stock-out' : (isLowStock ? 'plp-stock-low' : 'plp-stock-in');
                  const stockText = isOutOfStock ? 'Out of Stock' : (isLowStock ? 'Low Stock' : 'In Stock');

                  return (
                    <tr key={product._id} className="plp-table-row">
                      <td className="plp-product-id">#{product._id.substring(0, 8).toUpperCase()}</td>
                      <td>
                        <div className="plp-product-name-container">
                          <img className="plp-product-name-thumbnail" src={product.productImage || "https://placehold.co/40x40"} alt={product.productName} />
                          <span className="plp-product-name-text">{product.productName}</span>
                        </div>
                      </td>
                      <td className="plp-category">{product.category}</td>
                      <td>
                        <div className={`plp-stock-badge-container ${stockClass}`}>
                          {stockText} ({product.stockQuantity})
                        </div>
                      </td>
                      <td>
                        <div className="plp-action-container">
                          <button className="plp-btn-edit" title="Edit" onClick={() => handleEdit(product._id)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                          </button>{' '}
                          <button className="plp-btn-delete" title="Delete" onClick={() => handleDelete(product._id)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">
                    <div className="plp-empty-state-container">
                      <div className="plp-empty-icon-wrapper">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                      </div>
                      <p className="plp-empty-title">No products found</p>
                      <p className="plp-empty-subtext">Try adjusting your filters or search term.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {!loading && displayedProducts.length > 0 && (
          <div className="plp-pagination-container">
            <span className="plp-records-count">Showing {displayedProducts.length} product(s)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
