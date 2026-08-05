import React, { useState } from "react";

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
    // Navigate to dedicated order details page using orderId
    alert(`Navigating to order details for: ${orderId}`);
  };

  return (
    <>
      <style>{`
        /* Global & Shell Layout */
        .account-shell {
          width: 100%;
          height: 100vh;
          background-color: #FAF9F6;
          display: flex;
          flex-direction: row;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* Sidebar Styling */
        .orders-sidebar {
          flex-basis: 260px;
          flex-shrink: 0;
          background-color: #FFFFFF;
          border-right: 1px solid #E5E7EB;
          padding: 32px 20px;
          height: 100%;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          box-sizing: border-box;
        }

        .sidebar-brand {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: 22px;
          color: #014D40;
          margin: 0;
        }

        .sidebar-subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: #8A8A8A;
          margin-top: 2px;
          margin-bottom: 24px;
        }

        .orders-nav-item {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: #014D40;
          background-color: #F3F7F5;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 20px;
          display: block;
        }

        .order-card {
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 14px;
          background-color: #FFFFFF;
          cursor: pointer;
          transition: all 200ms ease;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .order-card:hover {
          border-color: #046A5A;
          background-color: #FAF9F6;
        }

        /* Main Scrollable Column Styling */
        .profile-main-col {
          flex: 1 1 0%;
          min-width: 0;
          height: 100%;
          overflow-y: auto;
          padding: 40px 20px 80px 32px;
          box-sizing: border-box;
        }

        .column-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: 28px;
          color: #014D40;
          margin-bottom: 32px;
          margin-top: 0;
        }

        .profile-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 28px;
          margin-bottom: 24px;
        }

        .input-field {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 15px;
          color: #2B2B2B;
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 10px 12px;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }

        .input-field:focus {
          border-color: #046A5A;
          box-shadow: 0 0 0 3px rgba(4, 106, 90, 0.1);
        }

        .btn-primary {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #FFFFFF;
          background-color: #046A5A;
          border: none;
          border-radius: 8px;
          padding: 9px 20px;
          cursor: pointer;
          transition: background-color 200ms ease;
        }

        .btn-primary:hover {
          background-color: #014D40;
        }

        .btn-secondary {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #6B7280;
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 9px 20px;
          cursor: pointer;
          transition: border-color 200ms ease, color 200ms ease;
        }

        .btn-secondary:hover {
          border-color: #046A5A;
          color: #046A5A;
        }

        .btn-action-outline {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #046A5A;
          background: transparent;
          border: 1px solid #046A5A;
          border-radius: 8px;
          padding: 8px 18px;
          cursor: pointer;
          transition: background-color 200ms ease, color 200ms ease;
        }

        .btn-action-outline:hover {
          background-color: #046A5A;
          color: #FFFFFF;
        }

        .label-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 13px;
          color: #8A8A8A;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 6px;
        }

        .value-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 15px;
          color: #2B2B2B;
        }

        /* Responsive Breakpoints Rules */
        @media (max-width: 750px) {
          .orders-sidebar { flex-basis: 180px; padding: 20px 12px; }
          .sidebar-brand { font-size: 15px; }
          .sidebar-subtitle { font-size: 10px; margin-bottom: 16px; }
          .orders-nav-item { font-size: 12px; padding: 8px 10px; }
          .order-card { padding: 10px; }
          .order-id { font-size: 11px !important; }
          .status-badge { font-size: 9px !important; padding: 2px 6px !important; }
          .order-date { font-size: 10px !important; }
          .order-price { font-size: 11px !important; }

          .profile-main-col { padding: 20px 16px 60px 16px; }
          .empty-card-wrapper { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; padding: 10px !important; }
          .empty-icon { width: 28px !important; height: 28px !important; font-size: 12px !important; }
          .empty-text { font-size: 10px !important; }
        }

        @media (max-width: 480px) {
          .orders-sidebar { flex-basis: 140px; padding: 16px 8px; }
          .sidebar-brand { font-size: 13px; }
          .sidebar-subtitle { font-size: 9px; }
          .orders-nav-item { font-size: 11px; padding: 6px 6px; }
        }
      `}</style>

      {/* Account Shell Container */}
      <div className="account-shell">
        {/* 1. Orders Sidebar (Left, Fixed/Internal Scroll) */}
        <aside className="orders-sidebar">
          <div>
            <h2 className="sidebar-brand">Elora Jewellery</h2>
            <div className="sidebar-subtitle">My Account</div>
            <div className="orders-nav-item">Orders</div>
          </div>

          {/* Order List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", flex: 1 }}>
            {orders.length > 0 ? (
              orders.map((order) => {
                const badgeStyle = getBadgeStyles(order.status);
                return (
                  <div
                    key={order.id}
                    className="order-card"
                    onClick={() => handleOrderClick(order.id)}
                  >
                    {/* Top Row: Order ID + Status Badge */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span
                        className="order-id"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          fontSize: "13px",
                          color: "#014D40",
                        }}
                      >
                        {order.id}
                      </span>
                      <span
                        className="status-badge"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 500,
                          fontSize: "11px",
                          borderRadius: "999px",
                          padding: "3px 9px",
                          backgroundColor: badgeStyle.bg,
                          color: badgeStyle.text,
                        }}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Order Date */}
                    <span
                      className="order-date"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 400,
                        fontSize: "11px",
                        color: "#8A8A8A",
                      }}
                    >
                      {order.date}
                    </span>

                    {/* Bottom Row: Order Price */}
                    <span
                      className="order-price"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#2B2B2B",
                        marginTop: "4px",
                      }}
                    >
                      {order.price}
                    </span>
                  </div>
                );
              })
            ) : (
              /* Orders Empty State Card */
              <div
                className="empty-card-wrapper"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div
                  className="empty-icon"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#F3F7F5",
                    color: "#046A5A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  !
                </div>
                <span
                  className="empty-text"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#8A8A8A",
                  }}
                >
                  No orders yet.
                </span>
              </div>
            )}
          </div>
        </aside>

        {/* 2. Profile Main Column (Right, Independently Scrollable) */}
        <main className="profile-main-col">
          <h1 className="column-heading">Profile</h1>

          {/* CONTACT CARD */}
          <div className="profile-card">
            {/* Card Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#014D40",
                  margin: 0,
                }}
              >
                Contact
              </h3>

              {!isEditingContact && (
                <button className="btn-action-outline" onClick={handleEditContactClick}>
                  Edit
                </button>
              )}
            </div>

            {/* View Mode vs Edit Mode */}
            {!isEditingContact ? (
              /* VIEW MODE */
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
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

          {/* ADDRESSES CARD (Single Saved Address State Machine) */}
          <div className="profile-card">
            {/* Card Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#014D40",
                  margin: 0,
                }}
              >
                Address
              </h3>

              {addressMode !== "Form" && (
                <button className="btn-action-outline" onClick={handleOpenAddressForm}>
                  {addressMode === "Empty" ? "Add" : "Update"}
                </button>
              )}
            </div>

            {/* State 1: EMPTY STATE */}
            {addressMode === "Empty" && (
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#8A8A8A",
                  margin: 0,
                }}
              >
                No addresses added
              </p>
            )}

            {/* State 2: ADDRESS FORM (Inline Edit/Add) */}
            {addressMode === "Form" && (
              <form onSubmit={handleSaveAddress} style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "4px" }}>
                {/* Row 1: Full Name / Phone */}
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 200px" }}>
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
                  <div style={{ flex: "1 1 200px" }}>
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

                {/* Row 2: Address Line 1 */}
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

                {/* Row 3: Address Line 2 */}
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

                {/* City / State / PIN Code */}
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 200px" }}>
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
                  <div style={{ flex: "1 1 200px" }}>
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
                  <div style={{ flex: "1 1 200px" }}>
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

                {/* Form Action Buttons */}
                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                  <button type="submit" className="btn-primary">
                    Save Address
                  </button>
                  <button type="button" className="btn-secondary" onClick={handleCancelAddress}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* State 3: FILLED STATE (Saved Address Display) */}
            {addressMode === "Filled" && savedAddress && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div className="value-text" style={{ fontWeight: 600, color: "#014D40" }}>
                  {savedAddress.fullName}
                </div>
                <div className="value-text" style={{ color: "#6B7280" }}>
                  {savedAddress.line1}
                  {savedAddress.line2 ? `, ${savedAddress.line2}` : ""}
                </div>
                <div className="value-text" style={{ color: "#6B7280" }}>
                  {savedAddress.city}, {savedAddress.state} - {savedAddress.pinCode}
                </div>
                <div className="value-text" style={{ color: "#6B7280" }}>
                  Phone: {savedAddress.phone}
                </div>

                <div style={{ marginTop: "12px" }}>
                  <button
                    onClick={handleDeleteAddress}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: "13px",
                      color: "#DC2626",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Delete Address
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SIGN OUT BUTTON */}
          <button
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              color: "#FFFFFF",
              backgroundColor: "#046A5A",
              border: "none",
              borderRadius: "10px",
              padding: "12px 28px",
              marginTop: "8px",
              cursor: "pointer",
              transition: "background-color 200ms ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#014D40")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#046A5A")}
            onClick={() => alert("Signing out...")}
          >
            Sign out
          </button>
        </main>
      </div>
    </>
  );
}

export default UserProfile;