import React from 'react';
import '../css/OrderListPage.css';

const OrderListPage = () => {
  return (
    <>
      {/* Admin Navbar (Reuse Existing Component) exactly as documented in the Admin/Navbar BRD */}
      
      <div className="order-list-main-container">
        
        <div className="order-list-page-header">
          <h1 className="order-list-page-title">Orders</h1>
          <p className="order-list-page-description">Manage, track, and update the status of customer orders.</p>
        </div>

        <div className="order-list-filter-container">
          <input 
            type="text" 
            className="order-list-search-input" 
            placeholder="Search by Order ID or Customer Name..." 
          />
          <select className="order-list-status-filter">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <select className="order-list-payment-filter">
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>

        <div className="order-list-table-container">
          <table className="order-list-table">
            <thead>
              <tr className="order-list-table-header-row">
                <th>Order ID</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="order-list-table-row">
                <td className="order-list-col-id">#ORD-12345</td>
                <td className="order-list-col-customer">Jane Doe</td>
                <td className="order-list-col-date">07 Aug 2026, 11:45 AM</td>
                <td className="order-list-col-amount">₹15,000</td>
                <td>
                  <div className="order-list-payment-badge order-list-payment-paid">
                    <span className="order-list-payment-dot"></span> Paid
                  </div>
                </td>
                <td>
                  <select className="order-list-status-control" defaultValue="Processing">
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td>
                  <button className="order-list-btn-action">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </td>
              </tr>
              {/* Additional rows could be dynamically rendered here */}
            </tbody>
          </table>
        </div>

        <div className="order-list-pagination-container">
          <div className="order-list-records-count">
            Showing 1–10 of 1000 orders
          </div>
          
          <div className="order-list-pagination-controls">
            <button className="order-list-btn-prev">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                <path d="M15 18L9 12L15 6"/>
              </svg>
              <span className="order-list-btn-label" style={{ marginLeft: '4px' }}>Previous</span>
            </button>
            
            <div className="order-list-page-number order-list-page-active">1</div>
            <div className="order-list-page-number">2</div>
            <div className="order-list-page-number">3</div>
            
            <button className="order-list-btn-next">
              <span className="order-list-btn-label" style={{ marginRight: '4px' }}>Next</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                <path d="M9 18L15 12L9 6"/>
              </svg>
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default OrderListPage;
