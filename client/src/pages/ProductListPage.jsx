import React, { useState } from 'react';
import '../css/ProductListPage.css';

const ProductListPage = () => {
  const [products, setProducts] = useState([
    { id: '#PRD-00001', name: 'Gold Ring', category: 'Rings', stock: 'In Stock' },
    { id: '#PRD-00002', name: 'Silver Earings', category: 'Earings', stock: 'Low Stock' },
    { id: '#PRD-00003', name: 'Diamond Bangle', category: 'Bangles', stock: 'Out of Stock' }
  ]);
  // Set to true to see empty state
  const [isEmpty, setIsEmpty] = useState(false);

  const displayedProducts = isEmpty ? [] : products;

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
        />
        <select className="plp-filter-select">
          <option>All</option>
          <option>Rings</option>
          <option>Earings</option>
          <option>Bangles</option>
          <option>Jhumkas</option>
          <option>Bracelets</option>
        </select>
        <select className="plp-filter-select">
          <option>All</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
        <select className="plp-filter-select">
          <option>All</option>
          <option>Newest</option>
          <option>Price</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="plp-table-container">
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
              displayedProducts.map((product, index) => (
                <tr key={index} className="plp-table-row">
                  <td className="plp-product-id">{product.id}</td>
                  <td>
                    <div className="plp-product-name-container">
                      <img className="plp-product-name-thumbnail" src="https://placehold.co/40x40" alt={product.name} />
                      <span className="plp-product-name-text">{product.name}</span>
                    </div>
                  </td>
                  <td className="plp-category">{product.category}</td>
                  <td>
                    <div className={`plp-stock-badge-container ${
                      product.stock === 'In Stock' ? 'plp-stock-in' : 
                      product.stock === 'Low Stock' ? 'plp-stock-low' : 'plp-stock-out'
                    }`}>
                      {product.stock}
                    </div>
                  </td>
                  <td>
                    <div className="plp-action-container">
                      <button className="plp-btn-edit" title="Edit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </button>{' '}
                      <button className="plp-btn-delete" title="Delete">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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
                    <p className="plp-empty-title">No products added yet</p>
                    <p className="plp-empty-subtext">Get started by adding your first product to the catalog.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {displayedProducts.length > 0 && (
          <div className="plp-pagination-container">
            <span className="plp-records-count">Showing 1–10 of 1000 orders</span>
            <div className="plp-pagination-controls">
              <button className="plp-btn-prev">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span className="plp-btn-label">Previous</span>
              </button>
              
              <button className="plp-page-number plp-page-active">1</button>
              <button className="plp-page-number plp-hide-mobile">2</button>
              <button className="plp-page-number plp-hide-mobile">3</button>
              <span className="plp-page-number plp-hide-mobile" style={{ border: 'none', background: 'transparent', cursor: 'default' }}>...</span>
              <button className="plp-page-number plp-hide-mobile">100</button>
              
              <button className="plp-btn-next">
                <span className="plp-btn-label">Next</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
