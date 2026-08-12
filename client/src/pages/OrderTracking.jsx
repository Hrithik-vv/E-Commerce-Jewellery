import React from 'react';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import '../css/OrderTracking.css';

function OrderTracking() {
  // Sample Data for Order
  const orderData = {
    id: 'TH-1038',
    placedDate: '6 Jul, 2026',
    status: 'In Transit', // Variants: 'Delivered', 'In Transit', 'Processing'
    currentStepIndex: 3, // 0: Ordered, 1: Processed, 2: Shipped, 3: Out for Delivery, 4: Delivered
    steps: [
      { label: 'Ordered', date: '6 Jul, 2026' },
      { label: 'Processed', date: '7 Jul, 2026' },
      { label: 'Shipped', date: '8 Jul, 2026' },
      { label: 'Out for Delivery', date: '10 Jul, 2026' },
      { label: 'Delivered', date: '—' },
    ],
    shippingAddress: {
      name: 'Sophia Montgomery',
      addressLine1: '742 Evergreen Terrace',
      addressLine2: 'Apt 4B',
      cityStateZip: 'Springfield, OR 97477',
      phone: '+1 (555) 234-5678',
    },
    paymentMethod: {
      type: 'Credit Card',
      cardDetails: 'Visa ending in •••• 4242',
      billingName: 'Sophia Montgomery',
    },
    items: [
      {
        id: 1,
        name: 'Solitaire Diamond Ring',
        qty: 1,
        price: '$1,250.00',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200',
      },
      {
        id: 2,
        name: '18k Gold Drop Earrings',
        qty: 1,
        price: '$450.00',
        image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=200',
      },
    ],
    subtotal: '$1,700.00',
    shipping: 'Free',
    total: '$1,700.00',
  };

  // Helper function for status badge style class
  const getBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-badge delivered';
      case 'in transit':
      case 'intransit':
        return 'status-badge in-transit';
      case 'processing':
      default:
        return 'status-badge processing';
    }
  };

  // Dynamic calculation for timeline horizontal progress bar width
  const progressPercent = (orderData.currentStepIndex / (orderData.steps.length - 1)) * 100;

  return (
    <div className="order-tracking-container">
      {/* 1. Back Link */}
      <a href="/profile" className="back-link">
        <FaArrowLeft size={12} /> Back to Orders
      </a>

      {/* 2. Order Header */}
      <div className="order-header">
        <div className="order-title-group">
          <h1 className="order-title">Order #{orderData.id}</h1>
          <p className="order-subtext">Placed on {orderData.placedDate}</p>
        </div>
        <span className={getBadgeClass(orderData.status)}>{orderData.status}</span>
      </div>

      {/* 3. Tracking Card */}
      <div className="tracking-card">
        <div className="timeline-container">
          <div className="timeline-track">
            <div
              className="timeline-progress-line"
              style={{
                width: `${progressPercent}%`,
                '--vertical-progress': `${progressPercent}%`,
              }}
            ></div>
          </div>

          <div className="timeline-steps">
            {orderData.steps.map((step, index) => {
              const isCompleted = index < orderData.currentStepIndex;
              const isCurrent = index === orderData.currentStepIndex;
              const isPending = index > orderData.currentStepIndex;

              return (
                <div key={index} className="timeline-step">
                  {/* Dot */}
                  {isCompleted && (
                    <div className="step-dot completed">
                      <FaCheck size={12} />
                    </div>
                  )}
                  {isCurrent && (
                    <div className="step-dot current">
                      <div className="inner-emerald-dot"></div>
                    </div>
                  )}
                  {isPending && (
                    <div className="step-dot pending">
                      <div className="inner-gray-dot"></div>
                    </div>
                  )}

                  {/* Text labels */}
                  <div>
                    <div className={`step-label ${isPending ? 'pending' : 'active'}`}>
                      {step.label}
                    </div>
                    <div className="step-date">{step.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Order Details Card */}
      <div className="tracking-card">
        <div className="details-grid">
          <div>
            <div className="info-label">Shipping Address</div>
            <div className="info-text">
              <span className="name-line">{orderData.shippingAddress.name}</span>
              <br />
              {orderData.shippingAddress.addressLine1}
              <br />
              {orderData.shippingAddress.addressLine2 && (
                <>
                  {orderData.shippingAddress.addressLine2}
                  <br />
                </>
              )}
              {orderData.shippingAddress.cityStateZip}
              <br />
              {orderData.shippingAddress.phone}
            </div>
          </div>

          <div>
            <div className="info-label">Payment Method</div>
            <div className="info-text">
              <span className="name-line">{orderData.paymentMethod.type}</span>
              <br />
              {orderData.paymentMethod.cardDetails}
              <br />
              {orderData.paymentMethod.billingName}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Items Card */}
      <div className="tracking-card">
        <div className="items-list">
          {orderData.items.map((item) => (
            <div key={item.id} className="item-row">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-qty">Qty: {item.qty}</span>
              </div>
              <span className="item-price">{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Order Summary Card */}
      <div className="tracking-card">
        <div className="summary-rows">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{orderData.subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{orderData.shipping}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>{orderData.total}</span>
          </div>
        </div>
      </div>

      {/* 7. Help Text */}
      <div className="help-text">
        Need assistance with your order?{' '}
        <a href="/contact" className="help-link">
          Contact us
        </a>
      </div>
    </div>
  );
}

export default OrderTracking;