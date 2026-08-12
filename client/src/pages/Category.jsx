import React, { useState, useMemo, useRef, useEffect } from 'react';
import '../css/Category.css';

// Sample Products Data
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Royal Emerald Cut Ring', price: 45000, bestSeller: true, date: '2024-01-15' },
  { id: 2, name: 'Classic Solitaire Pendant', price: 28000, bestSeller: false, date: '2024-02-10' },
  { id: 3, name: 'Heritage Gold Bangle', price: 85000, bestSeller: true, date: '2023-11-20' },
  { id: 4, name: 'Diamond Stud Earrings', price: 15000, bestSeller: false, date: '2024-03-01' },
  { id: 5, name: 'Vintage Pearl Necklace', price: 62000, bestSeller: true, date: '2023-12-05' },
  { id: 6, name: 'Rose Gold Choker', price: 34000, bestSeller: false, date: '2024-01-25' },
  { id: 7, name: 'Kundan Bridal Set', price: 120000, bestSeller: true, date: '2024-02-28' },
  { id: 8, name: 'Minimalist Gold Band', price: 9500, bestSeller: false, date: '2024-03-10' }
];

function Category() {
  // States
  const [products] = useState(INITIAL_PRODUCTS);
  const [sortOption, setSortOption] = useState('best-selling');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedPrice, setAppliedPrice] = useState({ min: '', max: '' });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const popoverRef = useRef(null);

  // Dynamic Highest Price Computation
  const highestPriceInList = useMemo(() => {
    if (products.length === 0) return 0;
    return Math.max(...products.map((p) => p.price));
  }, [products]);

  // Click Outside Popover to Close
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Price
    if (appliedPrice.min !== '') {
      result = result.filter((p) => p.price >= Number(appliedPrice.min));
    }
    if (appliedPrice.max !== '') {
      result = result.filter((p) => p.price <= Number(appliedPrice.max));
    }

    // Sort
    if (sortOption === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'date-new-old') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === 'best-selling') {
      result.sort((a, b) => (b.bestSeller === a.bestSeller ? 0 : b.bestSeller ? 1 : -1));
    }

    return result;
  }, [products, appliedPrice, sortOption]);

  // Apply Price Filter
  const handleApplyPrice = () => {
    setAppliedPrice({ min: minPrice, max: maxPrice });
    setIsPopoverOpen(false);
  };

  // Price Trigger Label Text
  const priceTriggerLabel = useMemo(() => {
    const { min, max } = appliedPrice;
    if (min !== '' && max !== '') return `Price: Rs. ${min} - Rs. ${max}`;
    if (min !== '') return `Price: From Rs. ${min}`;
    if (max !== '') return `Price: Up to Rs. ${max}`;
    return 'Price';
  }, [appliedPrice]);

  return (
    <div className="page-root">
      {/* 1. Page Header */}
      <header className="page-header">
        <h1 className="page-title">Fine Jewellery</h1>
        <p className="page-subtitle">
          Explore our handcrafted gold and diamond collections designed for timeless elegance.
        </p>
      </header>

      {/* 2. Shell */}
      <main className="shell">
        {/* 3. Toolbar */}
        <div className="toolbar">
          {/* 4. Price Filter */}
          <div className="price-filter-container" ref={popoverRef}>
            <button
              type="button"
              className={`price-trigger ${isPopoverOpen ? 'open' : ''}`}
              onClick={() => setIsPopoverOpen((prev) => !prev)}
            >
              <span className="price-trigger-label">{priceTriggerLabel}</span>
              <svg className={`arrow-icon ${isPopoverOpen ? 'rotated' : ''}`} viewBox="0 0 12 7">
                <path d="M1 1L6 6L11 1" />
              </svg>
            </button>

            {/* 5. Price Popover */}
            {isPopoverOpen && (
              <div className="price-popover">
                <div className="highest-price-hint">
                  Highest priced item in this list: Rs.{' '}
                  <span className="highest-price-value">{highestPriceInList.toLocaleString()}</span>
                </div>
                <div className="inputs-row">
                  <div className="input-wrapper">
                    <span className="input-prefix">Rs.</span>
                    <input
                      type="number"
                      className="price-input"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper">
                    <span className="input-prefix">Rs.</span>
                    <input
                      type="number"
                      className="price-input"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
                <button type="button" className="apply-btn" onClick={handleApplyPrice}>
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* 6. Result Count */}
          <div className="result-count">{filteredAndSortedProducts.length} products</div>

          {/* 7. Toolbar Right (Sort) */}
          <div className="toolbar-right">
            <span className="sort-label">Sort by</span>
            <div className="sort-select-wrapper">
              <select
                className="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="best-selling">Best Selling</option>
                <option value="price-low-high">Price Low to High</option>
                <option value="date-new-old">Date New to Old</option>
              </select>
              <svg className="sort-chevron" viewBox="0 0 12 7">
                <path d="M1 1L6 6L11 1" />
              </svg>
            </div>
          </div>
        </div>

        {/* 8. Product Grid */}
        <div className="product-grid">
          {filteredAndSortedProducts.map((product) => (
            /* 9. Product Card */
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                {product.bestSeller && <span className="bestseller-tag">Best seller</span>}
                {/* SVG Gem Placeholder */}
                <svg className="placeholder-icon" viewBox="0 0 24 24">
                  <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
                  <path d="M11 3v18" />
                  <path d="M2 9h20" />
                </svg>
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">Rs. {product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* 10. Pagination */}
        <div className="pagination">
          <button
            type="button"
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Prev
          </button>

          <span className="page-indicator">Page {currentPage}</span>

          <button
            type="button"
            className="page-btn"
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Category;