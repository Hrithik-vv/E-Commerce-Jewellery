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
                        <div className="d-flex gap-3 mt-3">
                            <button className="admin-btn admin-btn-primary" onClick={handleAcceptOrder}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                    <path d="M20 6 9 17l-5-5"/>
                                </svg> 
                                Accept Order
                            </button>
                            <button className="admin-btn admin-btn-danger" onClick={handleCancelOrder}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
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
                        <div className="d-flex gap-3 mt-3">
                            <button className="admin-btn admin-btn-primary" onClick={handleShipped}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
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
                        <div className="d-flex gap-3 mt-3">
                            <button className="admin-btn admin-btn-success" onClick={handleDelivered}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
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
        <div className="mb-4">
            {/* Header Navigation */}
            <div className="mb-3">
                <a href="/admin" onClick={(e) => { e.preventDefault(); window.history.back(); }} style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--admin-text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                        <path d="M15 18L9 12L15 6"/>
                    </svg>
                    Back to Orders
                </a>
            </div>

            {/* Main Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--admin-text-main)', margin: 0 }}>Order #ORD-98765</h1>
                        <span className={`admin-badge ${statusDetails.badgeClass.replace('badge-', 'admin-badge-')}`}>
                            {statusDetails.label}
                        </span>
                    </div>
                    <p style={{ color: 'var(--admin-text-muted)', margin: '8px 0 0 0', fontSize: '0.95rem' }}>
                        Placed on 15 Aug 2026, 10:30 AM · John Doe
                    </p>
                </div>
                <button className="admin-btn admin-btn-outline" onClick={() => window.print()}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                        <rect x="6" y="14" width="12" height="8"></rect>
                    </svg>
                    Print Order
                </button>
            </div>

            {/* Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                
                {/* Left Column (Takes more space on large screens) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', gridColumn: 'span 2' }}>
                    
                    {/* Order Status Section */}
                    <div className="admin-card" style={{ marginBottom: 0 }}>
                        <div className="admin-card-header">
                            <h2 className="admin-card-title">Order Status</h2>
                        </div>
                        <div className="mb-3">
                            <span className={`admin-badge ${statusDetails.badgeClass.replace('badge-', 'admin-badge-')}`} style={{ fontSize: '0.875rem', padding: '6px 12px' }}>
                                {statusDetails.label}
                            </span>
                        </div>
                        <p style={{ color: 'var(--admin-text-muted)', marginBottom: '20px' }}>{statusDetails.message}</p>
                        
                        {statusDetails.actions && (
                            <div className="d-flex gap-3 flex-wrap">
                                {/* Transform the action buttons directly here since we can't modify the state object's JSX easily without breaking the flow, wait I will just override styles in the state actions indirectly by re-mapping or styling child buttons if I couldn't, but here the state is created on each render so I can actually just wrap it or let it render. Since `getStatusDetails` returns JSX, I'll update `getStatusDetails` below. */}
                                {statusDetails.actions}
                            </div>
                        )}
                    </div>

                    {/* Order Details Section */}
                    <div className="admin-card" style={{ marginBottom: 0 }}>
                        <div className="admin-card-header">
                            <h2 className="admin-card-title">Order Details</h2>
                        </div>
                        
                        <div className="admin-grid-2 mb-4">
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Customer Name</div>
                                <div style={{ fontWeight: 500, color: 'var(--admin-text-main)' }}>John Doe</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Email Address</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>john.doe@example.com</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Phone Number</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>+91 9876543210</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Shipping Address</div>
                                <div style={{ color: 'var(--admin-text-main)', lineHeight: 1.4 }}>123, Rose Villa, MG Road, Mumbai, Maharashtra 400001, India</div>
                            </div>
                        </div>

                        <div className="admin-grid-2 mb-4" style={{ paddingTop: '20px', borderTop: '1px solid var(--admin-border)' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Order Date</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>15 Aug 2026, 10:30 AM</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Total Items</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>3</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Payment Method</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>UPI</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Delivery Method</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>Standard</div>
                            </div>
                        </div>

                        <div style={{ paddingTop: '20px', borderTop: '1px solid var(--admin-border)' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--admin-text-main)', marginBottom: '16px' }}>Items Ordered</h3>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--admin-bg)', borderRadius: 'var(--admin-radius-sm)', border: '1px solid var(--admin-border)' }}></div>
                                    <span style={{ fontWeight: 500, color: 'var(--admin-text-main)' }}>Gold Plated Necklace</span>
                                </div>
                                <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>Qty 1</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--admin-bg)', borderRadius: 'var(--admin-radius-sm)', border: '1px solid var(--admin-border)' }}></div>
                                    <span style={{ fontWeight: 500, color: 'var(--admin-text-main)' }}>Diamond Stud Earrings</span>
                                </div>
                                <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>Qty 2</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Order Summary Section */}
                    <div className="admin-card" style={{ marginBottom: 0 }}>
                        <div className="admin-card-header">
                            <h2 className="admin-card-title">Order Summary</h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div className="d-flex justify-content-between text-sm" style={{ color: 'var(--admin-text-muted)' }}>
                                <span>Subtotal</span>
                                <span style={{ color: 'var(--admin-text-main)' }}>₹25,000</span>
                            </div>
                            <div className="d-flex justify-content-between text-sm" style={{ color: 'var(--admin-text-muted)' }}>
                                <span>Shipping Charge</span>
                                <span style={{ color: 'var(--admin-text-main)' }}>₹150</span>
                            </div>
                            <div className="d-flex justify-content-between text-sm" style={{ color: 'var(--admin-text-success)' }}>
                                <span>Discount</span>
                                <span>-₹500</span>
                            </div>
                            <div style={{ borderTop: '1px dashed var(--admin-border)', margin: '8px 0' }}></div>
                            <div className="d-flex justify-content-between font-weight-bold" style={{ fontWeight: 600, fontSize: '1.125rem', color: 'var(--admin-text-main)' }}>
                                <span>Total Amount</span>
                                <span>₹24,650</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details Section */}
                    <div className="admin-card" style={{ marginBottom: 0 }}>
                        <div className="admin-card-header">
                            <h2 className="admin-card-title">Payment Details</h2>
                        </div>
                        
                        <div className="mb-4">
                            <span className={`admin-badge ${paymentBadge.class === 'badge-paid' ? 'admin-badge-success' : paymentBadge.class === 'badge-refunded' ? 'admin-badge-danger' : 'admin-badge-warning'}`}>
                                {paymentBadge.text}
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Payment Method</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>UPI</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Transaction ID</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>{orderStatus === 'Payment Pending' ? '—' : 'pay_xyz123456789'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Amount Paid</div>
                                <div style={{ fontWeight: 600, color: 'var(--admin-text-main)' }}>{orderStatus === 'Payment Pending' ? '—' : '₹24,650'}</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default SingleOrderPage;
