import React, { useState } from 'react';
import './Contact.css';

function Contact({ heroBgImage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="contact-page-root">
      {/* 1. Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${
            heroBgImage ||
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'
          })`,
        }}
      >
        <div className="hero-overlay" />
        <h1 className="hero-heading">Contact Us.</h1>
      </section>

      {/* 2. Contact Info Section */}
      <section className="contact-info-section">
        <div className="contact-info-wrapper">
          {/* Left Column */}
          <div className="info-left-col">
            <h2 className="subheading-get-in-touch">Get in touch with us.</h2>
            <p className="intro-text">
              Have a question or need assistance? Reach out to our dedicated team. We are here to help you every step of the way.
            </p>

            <div className="chat-us-block">
              <h3 className="subheading-chat-us">Chat with us.</h3>
              <p className="chat-text">
                Prefer instant messaging? Connect with us directly on{' '}
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-link"
                >
                  WhatsApp
                </a>{' '}
                for quick answers to your inquiries.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="info-right-col">
            <div className="visit-us-nested-row">
              <div className="visit-us-block">
                <h3 className="subheading-visit-us">Visit Us.</h3>
                <p className="address-text">
                  Elora Jewellery, MG Road, Kochi, Kerala - 682016
                </p>
              </div>
              <div className="visit-us-block">
                <h3 className="subheading-visit-us">Hours.</h3>
                <p className="address-text">
                  Monday – Friday<br />
                  9:00 AM – 6:00 PM EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Drop Us A Message Section */}
      <section className="drop-message-section">
        <div className="form-card">
          <h2 className="form-heading">Drop Us a Message.</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="name-email-row">
              <div className="field-share">
                <label htmlFor="name" className="visually-hidden">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="input-field"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field-share">
                <label htmlFor="email" className="visually-hidden">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <label htmlFor="phone" className="visually-hidden">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your Phone Number"
              className="input-field field-phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <label htmlFor="comment" className="visually-hidden">Comment</label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Your Message"
              className="input-field field-comment"
              value={formData.comment}
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-btn">
              Send Message.
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;