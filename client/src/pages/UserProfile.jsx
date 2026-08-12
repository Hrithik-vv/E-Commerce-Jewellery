import React, { useState } from "react";
import "../css/UserProfile.css";
import { Link } from "react-router-dom";

function UserProfile() {
  // --- Orders State & Dummy Data ---
  const [orders] = useState([
    { id: "#TH-1042", status: "Delivered", date: "Oct 24, 2025", price: "$1,299.00" },
    { id: "#TH-1038", status: "In Transit", date: "Nov 02, 2025", price: "$499.00" },
    { id: "#TH-1021", status: "Processing", date: "Nov 10, 2025", price: "$899.00" },
  ]);

  // --- Contact Card States ---
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactData, setContactData] = useState({
    name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
  });
  const [tempContact, setTempContact] = useState({ ...contactData });

  const handleEditContactClick = () => {
    setTempContact({ ...contactData });
    setIsEditingContact(true);
  };

  const handleSaveContact = () => {
    setContactData({ ...tempContact });
    setIsEditingContact(false);
  };

  const handleCancelContact = () => {
    setIsEditingContact(false);
  };

  // --- Address Card States (Empty | Form | Filled) ---
  const [addressMode, setAddressMode] = useState("Empty"); // 'Empty', 'Form', or 'Filled'
  const [savedAddress, setSavedAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const handleOpenAddressForm = () => {
    if (savedAddress) {
      setAddressForm({ ...savedAddress });
    } else {
      setAddressForm({
        fullName: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        pinCode: "",
      });
    }
    setAddressMode("Form");
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setSavedAddress({ ...addressForm });
    setAddressMode("Filled");
  };

  const handleCancelAddress = () => {
    if (savedAddress) {
      setAddressMode("Filled");
    } else {
      setAddressMode("Empty");
    }
  };

  const handleDeleteAddress = () => {
    setSavedAddress(null);
    setAddressMode("Empty");
  };

  // --- Helper Status Badge Color Generator ---
  const getBadgeStyles = (status) => {
    switch (status) {
      case "Delivered":
        return { bg: "#F3F7F5", text: "#046A5A" };
      case "In Transit":
        return { bg: "#FDF3DC", text: "#B8860B" };
      case "Processing":
        return { bg: "#EEF1FA", text: "#4A5B9A" };
      default:
        return { bg: "#F3F7F5", text: "#046A5A" };
    }
  };

  const handleOrderClick = (orderId) => {
    alert(`Navigating to order details for: ${orderId}`);
  };

  return (
    <div className="account-shell">
      {/* 1. Orders Sidebar */}
      <aside className="orders-sidebar">
        <div>
          <h2 className="sidebar-brand">Elora Jewellery</h2>
          <div className="sidebar-subtitle">My Account</div>
          <Link to="/ordertracking" className="orders-nav-item">Orders</Link>
        </div>

        {/* Order List */}
        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map((order) => {
              const badgeStyle = getBadgeStyles(order.status);
              return (
                <div
                  key={order.id}
                  className="order-card"
                  onClick={() => handleOrderClick(order.id)}
                >
                  <div className="order-card-row">
                    <span className="order-id">{order.id}</span>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: badgeStyle.bg,
                        color: badgeStyle.text,
                      }}
                    >
                      {order.status}
                    </span>
                  </div>

                  <span className="order-date">{order.date}</span>
                  <span className="order-price">{order.price}</span>
                </div>
              );
            })
          ) : (
            <div className="empty-card-wrapper">
              <div className="empty-icon">!</div>
              <span className="empty-text">No orders yet.</span>
            </div>
          )}
        </div>
      </aside>

      {/* 2. Profile Main Column */}
      <main className="profile-main-col">
        <h1 className="column-heading">Profile</h1>

        {/* CONTACT CARD */}
        <div className="profile-card">
          <div className="card-header">
            <h3 className="card-title">Contact</h3>

            {!isEditingContact && (
              <button className="btn-action-outline" onClick={handleEditContactClick}>
                Edit
              </button>
            )}
          </div>

          {!isEditingContact ? (
            /* VIEW MODE */
            <div className="card-body-stack">
              <div>
                <span className="label-text">FULL NAME</span>
                <div className="value-text">{contactData.name}</div>
              </div>
              <div>
                <span className="label-text">EMAIL ADDRESS</span>
                <div className="value-text">{contactData.email}</div>
              </div>
            </div>
          ) : (
            /* EDIT MODE */
            <div className="card-body-stack">
              <div>
                <label className="label-text">FULL NAME</label>
                <input
                  type="text"
                  className="input-field"
                  value={tempContact.name}
                  onChange={(e) => setTempContact({ ...tempContact, name: e.target.value })}
                />
              </div>
              <div>
                <label className="label-text">EMAIL ADDRESS</label>
                <input
                  type="email"
                  className="input-field"
                  value={tempContact.email}
                  onChange={(e) => setTempContact({ ...tempContact, email: e.target.value })}
                />
              </div>
              <div className="button-group">
                <button className="btn-primary" onClick={handleSaveContact}>
                  Save
                </button>
                <button className="btn-secondary" onClick={handleCancelContact}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ADDRESSES CARD */}
        <div className="profile-card">
          <div className="card-header">
            <h3 className="card-title">Address</h3>

            {addressMode !== "Form" && (
              <button className="btn-action-outline" onClick={handleOpenAddressForm}>
                {addressMode === "Empty" ? "Add" : "Update"}
              </button>
            )}
          </div>

          {/* State 1: EMPTY STATE */}
          {addressMode === "Empty" && (
            <p className="empty-address-text">No addresses added</p>
          )}

          {/* State 2: ADDRESS FORM */}
          {addressMode === "Form" && (
            <form onSubmit={handleSaveAddress} className="form-grid">
              <div className="form-row">
                <div className="form-col-flex">
                  <label className="label-text">FULL NAME</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="input-field"
                    required
                    value={addressForm.fullName}
                    onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                  />
                </div>
                <div className="form-col-flex">
                  <label className="label-text">PHONE</label>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="input-field"
                    required
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="label-text">ADDRESS LINE 1</label>
                <input
                  type="text"
                  placeholder="Street address"
                  className="input-field"
                  required
                  value={addressForm.line1}
                  onChange={(e) => setAddressForm({ ...addressForm, line1: e.target.value })}
                />
              </div>

              <div>
                <label className="label-text">ADDRESS LINE 2 (OPTIONAL)</label>
                <input
                  type="text"
                  placeholder="Apartment, suite, etc."
                  className="input-field"
                  value={addressForm.line2}
                  onChange={(e) => setAddressForm({ ...addressForm, line2: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-col-flex">
                  <label className="label-text">CITY</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="input-field"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  />
                </div>
                <div className="form-col-flex">
                  <label className="label-text">STATE</label>
                  <input
                    type="text"
                    placeholder="State"
                    className="input-field"
                    required
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  />
                </div>
                <div className="form-col-flex">
                  <label className="label-text">PIN CODE</label>
                  <input
                    type="text"
                    placeholder="PIN code"
                    className="input-field"
                    required
                    value={addressForm.pinCode}
                    onChange={(e) => setAddressForm({ ...addressForm, pinCode: e.target.value })}
                  />
                </div>
              </div>

              <div className="button-group-form">
                <button type="submit" className="btn-primary">
                  Save Address
                </button>
                <button type="button" className="btn-secondary" onClick={handleCancelAddress}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* State 3: FILLED STATE */}
          {addressMode === "Filled" && savedAddress && (
            <div className="card-body-stack">
              <div className="value-text value-text-highlight">
                {savedAddress.fullName}
              </div>
              <div className="value-text value-text-muted">
                {savedAddress.line1}
                {savedAddress.line2 ? `, ${savedAddress.line2}` : ""}
              </div>
              <div className="value-text value-text-muted">
                {savedAddress.city}, {savedAddress.state} - {savedAddress.pinCode}
              </div>
              <div className="value-text value-text-muted">
                Phone: {savedAddress.phone}
              </div>

              <div>
                <button onClick={handleDeleteAddress} className="btn-delete">
                  Delete Address
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SIGN OUT BUTTON */}
        <button className="btn-signout" onClick={() => alert("Signing out...")}>
          Sign out
        </button>
      </main>
    </div>
  );
}

export default UserProfile;