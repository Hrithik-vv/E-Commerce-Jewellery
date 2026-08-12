import React from 'react';
import './RefundPolicy.css';

function RefundPolicy() {
  return (
    <section className="refund-policy-section">
      <div className="refund-policy-container">
        {/* Page Title */}
        <h1 className="refund-policy-title">Refund Policy</h1>

        {/* Section Heading */}
        <h2 className="refund-policy-heading main-content-heading">
          Return and Refund Policy
        </h2>

        {/* Purchase & Inspection Policy */}
        <p className="refund-policy-text">
          <span className="refund-policy-bold">Purchase Policy:</span> All purchases made through our store are final. Under normal circumstances, we do not offer returns, exchanges, or refunds once an order is placed and processed.
        </p>

        <p className="refund-policy-text">
          <span className="refund-policy-bold">Product Inspection:</span> Every product undergoes a strict quality inspection before delivery or billing to ensure that items are handed over in perfect and good condition.
        </p>

        {/* Eligible Returns & Requirements */}
        <h2 className="refund-policy-heading">Eligible Returns & Claim Requirements</h2>
        <p className="refund-policy-text">
          Returns or replacements are strictly accepted <span className="refund-policy-bold">only</span> if the delivered product is physically damaged upon arrival or differs from the original order placed.
        </p>

        <ul className="refund-policy-list">
          <li className="refund-policy-list-item">
            <span className="refund-policy-bold">Unboxing Video Requirement:</span> To process any damage or incorrect product claim, a continuous, unedited <span className="refund-policy-bold">unboxing video</span> is mandatory. The video must clearly show:
            <ul className="refund-policy-list" style={{ marginTop: '10px', marginBottom: '0' }}>
              <li className="refund-policy-list-item">
                A complete 360° view of the sealed outer parcel/box before opening.
              </li>
              <li className="refund-policy-list-item">
                Continuous recording from opening the package to inspecting the product without any cuts, pauses, or edits.
              </li>
            </ul>
          </li>
          <li className="refund-policy-list-item">
            <span className="refund-policy-bold">Reporting Timeframe:</span> All issues, damages, or discrepancies must be reported to our support team within <span className="refund-policy-bold">48 hours</span> of receiving the shipment along with the unboxing video proof.
          </li>
          <li className="refund-policy-list-item">
            <span className="refund-policy-bold">Return Conditions:</span> For approved returns, the product must remain completely unused, in its original condition, and returned in its original packaging along with all tags and invoice copies.
          </li>
          <li className="refund-policy-list-item">
            <span className="refund-policy-bold">Refund Processing:</span> Once an eligible return is received and verified by our team, approved refunds will be processed within <span className="refund-policy-bold">three working days</span> to the original payment method or as store credit.
          </li>
        </ul>

        {/* Non-Returnable Items & Exceptions */}
        <h2 className="refund-policy-heading">Non-Returnable Conditions</h2>
        <p className="refund-policy-text">
          Returns, exchanges, or refunds will <span className="refund-policy-bold">NOT</span> be accepted under the following circumstances:
        </p>

        <ul className="refund-policy-list">
          <li className="refund-policy-list-item">
            Change of mind or personal preference after placing the order.
          </li>
          <li className="refund-policy-list-item">
            Slight colour variations due to digital screen settings or photographic lighting.
          </li>
          <li className="refund-policy-list-item">
            Size dissatisfaction where standard sizing dimensions were provided.
          </li>
          <li className="refund-policy-list-item">
            Damages caused due to improper handling, misuse, normal wear and tear, or accidental damage post-delivery.
          </li>
        </ul>

        {/* Customer Support */}
        <h2 className="refund-policy-heading">Customer Support</h2>
        <p className="refund-policy-text">
          If you have any questions, require assistance, or need clarification regarding our Return and Refund Policy, please feel free to reach out to our customer support team via email or WhatsApp before placing your order.
        </p>
      </div>
    </section>
  );
}

export default RefundPolicy;