import React, { useState, useMemo, useEffect, useRef } from 'react';
import '../css/BestSellerPage.css';

const MOCK_PRODUCTS = Array.from({ length: 24 }).map((_, index) => ({
  id: index + 1,
  name: `Elegant Ring ${index + 1}`,
  price: 2500 + (index * 500) % 5000,
  isBestSeller: true,
}));

export default function BestSellerPage() {
  const [isPricePopoverOpen, setIsPricePopoverOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedMinPrice, setAppliedMinPrice] = useState(null);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('Best Selling');

  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPricePopoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleApplyPrice = () => {
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setIsPricePopoverOpen(false);
  };

  const highestPrice = useMemo(() => {
    return Math.max(...MOCK_PRODUCTS.map(p => p.price));
  }, []);

  const isPriceApplied = appliedMinPrice !== null && appliedMinPrice !== '' && appliedMaxPrice !== null && appliedMaxPrice !== '';
  const priceLabel = isPriceApplied 
    ? `Price: Rs. ${appliedMinPrice} - Rs. ${appliedMaxPrice}` 
    : 'Price';

  return (
    <div className="bsp-wrapper">
      {/* Section 1 – Page Header */}
      <div className="bsp-page-header">
        <h1 className="bsp-page-title">Best Sellers</h1>
        <p className="bsp-page-subtitle">Our most loved pieces, chosen by you.</p>
      </div>

      {/* Section 2 – Shell */}
      <div className="bsp-shell">
        
        {/* Section 3 – Toolbar */}
        <div className="bsp-toolbar">
          
          {/* Section 4 – Price Filter */}
          <div className="bsp-price-filter-container" ref={popoverRef}>
            <button 
              className={`bsp-price-trigger ${isPricePopoverOpen ? 'open' : ''}`}
              onClick={() => setIsPricePopoverOpen(!isPricePopoverOpen)}
            >
              <span className="bsp-trigger-label">{priceLabel}</span>
              <svg className="bsp-trigger-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Section 5 – Price Popover */}
            {isPricePopoverOpen && (
              <div className="bsp-price-popover">
                <div className="bsp-highest-price-hint">
                  Highest priced item in this list: <span className="bsp-highest-price-value">Rs. {highestPrice}</span>
                </div>
                <div className="bsp-min-max-inputs">
                  <div className="bsp-input-wrapper">
                    <span className="bsp-input-prefix">Rs.</span>
                    <input 
                      type="number" 
                      className="bsp-price-input" 
                      value={minPrice} 
                      onChange={(e) => setMinPrice(e.target.value)} 
                    />
                  </div>
                  <div className="bsp-input-wrapper">
                    <span className="bsp-input-prefix">Rs.</span>
                    <input 
                      type="number" 
                      className="bsp-price-input" 
                      value={maxPrice} 
                      onChange={(e) => setMaxPrice(e.target.value)} 
                    />
                  </div>
                </div>
                <button className="bsp-apply-btn" onClick={handleApplyPrice}>
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Section 6 – Result Count */}
          <div className="bsp-result-count">
            {MOCK_PRODUCTS.length} products
          </div>

          {/* Section 7 – Toolbar Right (Sort) */}
          <div className="bsp-toolbar-right">
            <span className="bsp-sort-label">Sort by</span>
            <select 
              className="bsp-sort-select" 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Best Selling">Best Selling</option>
              <option value="Price Low to High">Price Low to High</option>
              <option value="Date New to Old">Date New to Old</option>
            </select>
          </div>

        </div>

        {/* Section 8 – Product Grid */}
        <div className="bsp-product-grid">
          {MOCK_PRODUCTS.map(product => (
            /* Section 9 – Product Card */
            <div key={product.id} className="bsp-product-card">
              <div className="bsp-product-image-container">
                <svg className="bsp-placeholder-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                <div className="bsp-best-seller-tag">Best Seller</div>
              </div>
              <h3 className="bsp-product-name">{product.name}</h3>
              <p className="bsp-product-price">Rs. {product.price}</p>
            </div>
          ))}
        </div>

        {/* Section 10 – Pagination */}
        <div className="bsp-pagination">
          <button 
            className="bsp-page-btn" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            <svg className="bsp-btn-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 9L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Prev
          </button>
          
          <span className="bsp-page-indicator">Page {currentPage}</span>
          
          <button 
            className="bsp-page-btn" 
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
            <svg className="bsp-btn-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
