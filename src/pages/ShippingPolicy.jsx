import React from 'react';
import './ShippingPolicy.css';

function ShippingPolicy() {
  return (
    <section className="shipping-policy-section">
      <div className="shipping-policy-container">
        {/* Main Page Title */}
        <h1 className="shipping-policy-title">Shipping Policy</h1>

        {/* Section 2 & 3: General Shipping Information */}
        <h2 className="shipping-policy-heading main-content-heading">Shipping Policy</h2>
        <p className="shipping-policy-text">
          Thank you for shopping with us! We aim to ensure your orders are delivered quickly, safely, and efficiently. Please review our detailed shipping policy below to understand our processing, delivery methods, and partner guidelines.
        </p>

        <ul className="shipping-policy-list">
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Courier Options:</span> We offer shipping via <span className="shipping-policy-bold">DTDC</span> and <span className="shipping-policy-bold">India Post</span>. Customers can select their preferred courier method during checkout.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Order Processing:</span> All orders are carefully packed and processed within <span className="shipping-policy-bold">3 working days</span> before dispatch.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Estimated Delivery:</span>
            <ul className="shipping-policy-list" style={{ marginTop: '10px', marginBottom: '0' }}>
              <li className="shipping-policy-list-item">
                <span className="shipping-policy-bold">Within Kerala:</span> Up to 5 working days.
              </li>
              <li className="shipping-policy-list-item">
                <span className="shipping-policy-bold">Outside Kerala:</span> 3 to 10 working days.
              </li>
            </ul>
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Tracking Details:</span> Shipment tracking information and tracking links will be shared with the customer via email immediately after dispatch.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Delivery Responsibility:</span> Customers are kindly requested to monitor shipment tracking and remain available to receive courier communications during delivery.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Address Information:</span> Please provide a complete and accurate shipping address, phone number, PIN code, and landmark. Any delays or delivery failures caused by incorrect details provided are the responsibility of the customer.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Returned Shipments:</span> Orders returned to us due to unsuccessful delivery attempts or incorrect addresses will require a reshipping fee of <span className="shipping-policy-bold">₹49</span> for redelivery.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Order Finality:</span> Once an order is placed, it cannot be modified. Please verify all order and shipping details carefully before confirming your order.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Shipping Partners:</span> All shipments are managed through trusted third-party courier partners. Our customer support after dispatch is limited to shipment tracking assistance.
          </li>
        </ul>

        {/* Section 4: Courier Details & Pickup */}
        <h2 className="shipping-policy-heading">Courier & Delivery Options</h2>
        <ul className="shipping-policy-list">
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">DTDC:</span> A reliable courier option offering real-time shipment tracking and customer support.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">India Post:</span> An economical shipping option. Please note that shipments become the customer's responsibility after dispatch; Thauya is not liable for parcel loss or non-delivery through India Post. Parcels returned without delivery attempts may require additional reshipping charges.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Store Pickup:</span> Customers can choose the Store Pickup option during checkout to collect their orders directly from our Kozhikode store.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Express Delivery:</span> Express Delivery is available via WhatsApp booking for a flat charge of <span className="shipping-policy-bold">₹88</span>, with an estimated delivery time of 2–5 working days.
          </li>
        </ul>

        {/* Section 5: Delivery Guidelines */}
        <h2 className="shipping-policy-heading">Delivery Guidelines</h2>
        <ul className="shipping-policy-list">
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Address Verification:</span> Always double-check your complete delivery address and primary phone number before completing your purchase.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Availability:</span> Please ensure someone is available at the provided delivery address after dispatch to attend courier calls and accept parcel delivery.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Failed Delivery:</span> Orders returned due to incorrect address entries or missed delivery attempts require additional shipping charges for redelivery.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Regional Delivery:</span> Deliveries to North, West, and East India may take additional delivery time as all shipments originate from Kerala.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">External Delays:</span> Minor delivery delays may occasionally occur due to severe weather conditions, national holidays, remote transit locations, or technical delays beyond our control.
          </li>
        </ul>

        {/* Section 6: International Shipping */}
        <h2 className="shipping-policy-heading international-heading">International Orders</h2>
        <p className="shipping-policy-text">
          We ship selected products internationally to reach our global customers.
        </p>
        <ul className="shipping-policy-list">
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Shipping Method:</span> All international orders are processed and shipped securely via India Post.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">WhatsApp Assistance:</span> Customers are advised to contact our team via WhatsApp before placing an international order for custom order guidance and rate estimations.
          </li>
          <li className="shipping-policy-list-item">
            <span className="shipping-policy-bold">Service Charges:</span> International shipments incur additional delivery charges calculated based on the destination country and overall parcel weight.
          </li>
        </ul>

        <p className="shipping-policy-text" style={{ marginTop: '32px' }}>
          If you have any further questions or require assistance regarding your shipment, please feel free to reach out to our dedicated support team via email or WhatsApp.
        </p>
      </div>
    </section>
  );
}

export default ShippingPolicy;