import React, { useState } from 'react';
import '../css/SingleOrderPage.css';

const SingleOrderPage = () => {
    // Start at Payment Successful to demonstrate interactive flow
    const [orderStatus, setOrderStatus] = useState('Payment Successful');

    const handleAcceptOrder = () => setOrderStatus('Processing');
    const handleCancelOrder = () => setOrderStatus('Cancelled');
    const handleShipped = () => setOrderStatus('Shipped');
    const handleDelivered = () => setOrderStatus('Delivered');

    const getStatusDetails = () => {
        switch (orderStatus) {
            case 'Payment Pending':
                return {
                    badgeClass: 'badge-pending',
                    label: 'Payment Pending',
                    message: 'Waiting for the customer to complete the payment.',
                    actions: null
                };
            case 'Payment Successful':
                return {
                    badgeClass: 'badge-successful',
                    label: 'Payment Successful',
                    message: 'Payment has been successfully received. Awaiting acceptance.',
                    actions: (
                        <div className="single-order-actions-row">
                            <button className="btn-accept-order" onClick={handleAcceptOrder}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6 9 17l-5-5"/>
                                </svg> 
                                Accept Order
                            </button>
                            <button className="btn-cancel-order" onClick={handleCancelOrder}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                                </svg>
                                Cancel Order
                            </button>
                        </div>
                    )
                };
            case 'Processing':
                return {
                    badgeClass: 'badge-processing',
                    label: 'Processing',
                    message: 'The order has been accepted and is currently being processed.',
                    actions: (
                        <div className="single-order-actions-row">
                            <button className="btn-mark-shipped" onClick={handleShipped}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
                                </svg>
                                Mark as Shipped
                            </button>
                        </div>
                    )
                };
            case 'Shipped':
                return {
                    badgeClass: 'badge-shipped',
                    label: 'Shipped',
                    message: 'The order has been shipped and is on its way to the customer.',
                    actions: (
                        <div className="single-order-actions-row">
                            <button className="btn-mark-delivered" onClick={handleDelivered}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/>
                                </svg>
                                Mark as Delivered
                            </button>
                        </div>
                    )
                };
            case 'Delivered':
                return {
                    badgeClass: 'badge-delivered',
                    label: 'Delivered',
                    message: 'The order has been successfully delivered to the customer.',
                    actions: null
                };
            case 'Cancelled':
                return {
                    badgeClass: 'badge-cancelled',
                    label: 'Cancelled',
                    message: 'This order has been cancelled.',
                    actions: null
                };
            default:
                return { badgeClass: '', label: '', message: '', actions: null };
        }
    };

    const statusDetails = getStatusDetails();

    const getPaymentBadge = () => {
        if (orderStatus === 'Payment Pending') {
            return { class: 'badge-pending', text: 'Pending' }; 
        } else if (orderStatus === 'Cancelled') {
            return { class: 'badge-refunded', text: 'Refunded' };
        }
        return { class: 'badge-paid', text: 'Paid' };
    };

    const paymentBadge = getPaymentBadge();

    return (
        <div className="single-order-page-wrapper">
            {/* Header */}
            <div className="single-order-header-main">
                <a href="#" className="single-order-back-nav">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
                    </svg>
                    <span className="single-order-back-text">Back to Orders</span>
                </a>
            </div>

            <div className="single-order-header-main" style={{ marginTop: '0', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <h1 className="single-order-id-title">Order #ORD-98765</h1>
                        <div className={`single-order-status-badge ${statusDetails.badgeClass}`}>
                            <div className="single-order-status-dot"></div> {statusDetails.label}
                        </div>
                    </div>
                    <p className="single-order-meta-line">Placed on 15 Aug 2026, 10:30 AM · John Doe</p>
                </div>
                <button className="single-order-print-button" onClick={() => window.print()}>
                    Print Order
                </button>
            </div>

            {/* Content Grid */}
            <div className="single-order-content-grid">
                
                {/* Left Column */}
                <div className="single-order-left-column">
                    
                    {/* Order Status Section */}
                    <div className="single-order-section-card">
                        <h2 className="single-order-section-title">Order Status</h2>
                        <div className={`single-order-status-badge ${statusDetails.badgeClass}`}>
                            <div className="single-order-status-dot"></div> {statusDetails.label}
                        </div>
                        <p className="single-order-status-message">{statusDetails.message}</p>
                        {statusDetails.actions}
                    </div>

                    {/* Order Details Section */}
                    <div className="single-order-section-card">
                        <h2 className="single-order-section-title">Order Details</h2>
                        
                        <div className="single-order-details-grid customer-info-grid">
                            <div className="single-order-detail-group">
                                <span className="single-order-detail-label">Customer Name</span>
                                <span className="single-order-detail-value bold">John Doe</span>
                            </div>
                            <div className="single-order-detail-group">
                                <span className="single-order-detail-label">Email Address</span>
                                <span className="single-order-detail-value">john.doe@example.com</span>
                            </div>
                            <div className="single-order-detail-group">
                                <span className="single-order-detail-label">Phone Number</span>
                                <span className="single-order-detail-value">+91 9876543210</span>
                            </div>
                            <div className="single-order-detail-group">
                                <span className="single-order-detail-label">Shipping Address</span>
                                <span className="single-order-detail-address">123, Rose Villa, MG Road, Mumbai, Maharashtra 400001, India</span>
                            </div>
                        </div>

                        <div className="single-order-details-grid order-info-grid mt-24">
                            <div className="single-order-detail-group">
                                <span className="single-order-detail-label">Order Date</span>
                                <span className="single-order-detail-value">15 Aug 2026, 10:30 AM</span>
                            </div>
                            <div className="single-order-detail-group">
                                <span className="single-order-detail-label">Total Items</span>
                                <span className="single-order-detail-value">3</span>
                            </div>
                            <div className="single-order-detail-group">
                                <span className="single-order-detail-label">Payment Method</span>
                                <span className="single-order-detail-value">UPI</span>
                            </div>
                            <div className="single-order-detail-group">
                                <span className="single-order-detail-label">Delivery Method</span>
                                <span className="single-order-detail-value">Standard</span>
                            </div>
                        </div>

                        <div className="single-order-items-list">
                            <div className="single-order-item-row">
                                <span className="single-order-item-name">Gold Plated Necklace</span>
                                <span className="single-order-item-qty">Qty 1</span>
                            </div>
                            <div className="single-order-item-row">
                                <span className="single-order-item-name">Diamond Stud Earrings</span>
                                <span className="single-order-item-qty">Qty 2</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Column */}
                <div className="single-order-right-column">
                    
                    {/* Order Summary Section */}
                    <div className="single-order-section-card">
                        <h2 className="single-order-section-title">Order Summary</h2>
                        <div className="single-order-summary-list">
                            <div className="single-order-summary-row">
                                <span>Subtotal</span>
                                <span>₹25,000</span>
                            </div>
                            <div className="single-order-summary-row">
                                <span>Shipping Charge</span>
                                <span>₹150</span>
                            </div>
                            <div className="single-order-summary-row">
                                <span>Discount</span>
                                <span>-₹500</span>
                            </div>
                            <div className="single-order-summary-divider"></div>
                            <div className="single-order-summary-total">
                                <span>Total Amount</span>
                                <span>₹24,650</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details Section */}
                    <div className="single-order-section-card">
                        <h2 className="single-order-section-title">Payment Details</h2>
                        
                        <div className="single-order-payment-status-row">
                            <div className={`single-order-status-badge ${paymentBadge.class}`}>
                                <div className="single-order-status-dot"></div> {paymentBadge.text}
                            </div>
                        </div>

                        <div className="single-order-payment-info-list">
                            <div className="single-order-detail-group">
                                <span className="single-order-detail-label">Payment Method</span>
                                <span className="single-order-detail-value">UPI</span>
                            </div>
                            <div className="single-order-detail-group">
                                <span className="single-order-detail-label">Transaction ID</span>
                                <span className="single-order-detail-value">{orderStatus === 'Payment Pending' ? '—' : 'pay_xyz123456789'}</span>
                            </div>
                            <div className="single-order-detail-group">
                                <span className="single-order-detail-label">Amount Paid</span>
                                <span className="single-order-payment-value-bold">{orderStatus === 'Payment Pending' ? '—' : '₹24,650'}</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default SingleOrderPage;
