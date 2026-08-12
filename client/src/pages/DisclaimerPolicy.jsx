import React from 'react';
import '../css/DisclaimerPolicy.css';

function DisclaimerPolicy() {
  return (
    <section className="disclaimer-section">
      <div className="disclaimer-container">
        {/* Page Title */}
        <h1 className="disclaimer-page-title">Disclaimer</h1>

        {/* Section 2: Disclaimer Main Section */}
        <h2 className="disclaimer-heading" style={{ marginTop: '24px' }}>
          Disclaimer
        </h2>
        <p className="disclaimer-text">
          <span className="disclaimer-bold">Last Updated: August 10, 2026</span>
        </p>
        <p className="disclaimer-text">
          Please read this Disclaimer Policy carefully before using our website, products, or services. By continuing to access or use this site, you acknowledge and agree to the terms set forth in this policy.
        </p>

        {/* Section 3: General Disclaimer */}
        <h2 className="disclaimer-heading">1. General Disclaimer</h2>
        <p className="disclaimer-text">
          All information published on this website is provided solely for general informational purposes.
        </p>
        <ul className="disclaimer-list">
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Content Accuracy:</span> While reasonable efforts are made to ensure accuracy, completeness, and timeliness, the company does not guarantee that all information is free from errors or omissions.
          </li>
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Professional Advice:</span> Website content should not be considered legal, financial, medical, or professional advice. Users should consult qualified professionals before making any decisions.
          </li>
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">User Responsibility:</span> Users access and use the website at their own discretion and are solely responsible for any decisions made based on the information provided.
          </li>
        </ul>

        {/* Section 4: Product & Service Disclaimer */}
        <h2 className="disclaimer-heading">2. Product & Service Disclaimer</h2>
        <ul className="disclaimer-list">
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Product Information:</span> Product descriptions, images, pricing, availability, and specifications are subject to change without prior notice.
          </li>
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Image Representation:</span> Product images are for illustration purposes only. Actual products may vary slightly due to lighting, photography, manufacturing, or display settings.
          </li>
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Availability:</span> Product availability is subject to stock. The company reserves the right to discontinue or modify products without notice.
          </li>
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Pricing:</span> Prices may change without prior notice, and pricing errors will be corrected whenever identified.
          </li>
        </ul>

        {/* Section 5: External Links Disclaimer */}
        <h2 className="disclaimer-heading">3. External Links Disclaimer</h2>
        <p className="disclaimer-text">
          This website may contain links to third-party websites provided strictly for convenience.
        </p>
        <ul className="disclaimer-list">
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Third-Party Responsibility:</span> The company has no control over external websites and is not responsible for their content, privacy practices, accuracy, or availability.
          </li>
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">User Decision:</span> Users access third-party websites entirely at their own risk.
          </li>
        </ul>

        {/* Section 6: Limitation of Liability */}
        <h2 className="disclaimer-heading">4. Limitation of Liability</h2>
        <ul className="disclaimer-list">
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Company Liability:</span> The company shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of the website, products, or services.
          </li>
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">System Availability:</span> Uninterrupted or error-free website availability is not guaranteed. Temporary interruptions may occur due to maintenance, technical issues, or unforeseen circumstances.
          </li>
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Technical Errors:</span> The company is not responsible for losses caused by technical failures, internet connectivity issues, or third-party service interruptions.
          </li>
        </ul>

        {/* Section 7: Intellectual Property */}
        <h2 className="disclaimer-heading">5. Intellectual Property</h2>
        <ul className="disclaimer-list">
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Content Ownership:</span> All website content including text, images, graphics, logos, icons, and other materials remain the property of the company unless otherwise stated.
          </li>
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Restrictions:</span> Copying, reproducing, distributing, modifying, or republishing website content without prior written permission is strictly prohibited.
          </li>
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Trademarks:</span> All trademarks, service marks, and brand names displayed on the website belong to their respective owners.
          </li>
        </ul>

        {/* Section 8: Changes to Disclaimer Policy */}
        <h2 className="disclaimer-heading">6. Changes to Disclaimer Policy</h2>
        <p className="disclaimer-text">
          The company reserves the right to modify, update, or replace this Disclaimer Policy at any time without prior notice. Continued use of the website following any posted updates constitutes full acceptance of the revised policy.
        </p>

        {/* Section 9: Contact Information */}
        <h2 className="disclaimer-heading disclaimer-contact-heading">Contact Us</h2>
        <p className="disclaimer-text">
          If you require any clarification or have questions regarding this Disclaimer Policy, our customer support team is available to assist you.
        </p>
        <ul className="disclaimer-list">
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Email:</span>{' '}
            <a href="mailto:support@example.com" className="disclaimer-link">
              support@example.com
            </a>
          </li>
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Phone:</span> +1 (800) 123-4567
          </li>
          <li className="disclaimer-list-item">
            <span className="disclaimer-bold">Business Address:</span> 123 Heritage Way, Suite 400, New York, NY 10001
          </li>
        </ul>
        <p className="disclaimer-text">
          Our dedicated customer support team is ready to answer any questions related to our products and legal disclosures.
        </p>
      </div>
    </section>
  );
}

export default DisclaimerPolicy;