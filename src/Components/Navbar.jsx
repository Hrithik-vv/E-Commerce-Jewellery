import React, { useState } from "react";
import { NavDropdown, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoCart } from "react-icons/io5";

function Header() {
  // Auth state & Cart count
  const isLoggedIn = false;
  const cartItemCount = 2;

  // Search input state
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* BRD Dynamic Hover & Animation Styles */}
      <style>{`
        /* Categories Dropdown Container BRD Styles */
        .custom-categories-dropdown .dropdown-menu {
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          width: 220px !important;
          background-color: #FFFFFF !important;
          border: 1px solid #E5E7EB !important;
          border-radius: 12px !important;
          padding: 16px 0 !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
          z-index: 1000 !important;
          margin-top: 0px !important;
        }

        /* Category Item BRD Styles */
        .custom-categories-dropdown .dropdown-item {
          font-family: 'Poppins', sans-serif !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          color: #374151 !important;
          padding: 12px 20px !important;
          display: flex !important;
          align-items: center !important;
          cursor: pointer !important;
          transition: background-color 0.2s ease, color 0.2s ease !important;
        }

        /* Category Item Hover BRD Styles */
        .custom-categories-dropdown .dropdown-item:hover {
          background-color: #F8F7F4 !important;
          color: #0B5D50 !important;
        }

        /* Caret Arrow Styling */
        .custom-categories-dropdown .nav-link::after {
          width: 14px !important;
          height: 14px !important;
          color: #374151 !important;
          transition: transform 0.3s ease !important;
          vertical-align: middle !important;
        }
      `}</style>

      {/* Navbar Parent Container */}
      <Navbar
        expand="lg"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 80px",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Container
          fluid
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 0,
          }}
        >
          {/* Logo Container */}
          <Navbar.Brand
            as={Link}
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              margin: 0,
              padding: 0,
              textDecoration: "none",
            }}
          >
            {/* Logo Mark */}
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "#134E4A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src="/logo3.jpeg"
                alt="Elora Jewellery"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Logo Text */}
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#134E4A",
                letterSpacing: "1px",
              }}
            >
              Elora Jewellery
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Nav Links Container */}
            <Nav
              className="ms-auto"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "36px",
              }}
            >
              {/* Home Link */}
              <Nav.Link
                as={Link}
                to="/"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#134E4A",
                  borderBottom: "2px solid #0B5D50",
                  paddingBottom: "4px",
                  paddingTop: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                Home
              </Nav.Link>

              {/* Categories Link Dropdown */}
              <NavDropdown
                title="Categories"
                id="basic-nav-dropdown"
                className="custom-categories-dropdown"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                <NavDropdown.Item as={Link} to="/category/rings">
                  Rings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/necklaces">
                  Necklaces
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/earrings">
                  Earrings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/bracelets">
                  Bracelets
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/chains">
                  Chains
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/diamond">
                  Diamond Jewellery
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/gold">
                  Gold Jewellery
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/bridal">
                  Bridal Collection
                </NavDropdown.Item>
              </NavDropdown>

              {/* Best Sellers Link */}
              <Nav.Link
                as={Link}
                to="/best-sellers"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#374151",
                  padding: 0,
                }}
              >
                Best Sellers
              </Nav.Link>

              {/* About Us Link */}
              <Nav.Link
                as={Link}
                to="/about"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#374151",
                  padding: 0,
                }}
              >
                About Us
              </Nav.Link>

              {/* Contact Us Link */}
              <Nav.Link
                as={Link}
                to="/contact"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#374151",
                  padding: 0,
                }}
              >
                Contact Us
              </Nav.Link>

              {/* Icons Container */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                {/* Search Icon Container & Input */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search jewellery..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "220px",
                      height: "40px",
                      padding: "0 40px 0 16px",
                      border: "1px solid #D1D5DB",
                      borderRadius: "20px",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "14px",
                      backgroundColor: "#FFFFFF",
                      outline: "none",
                      color: "#374151",
                      transition: "width 0.3s ease",
                    }}
                  />
                  <FaSearch
                    style={{
                      fontSize: "16px",
                      color: "#134E4A",
                      position: "absolute",
                      right: "14px",
                      cursor: "pointer",
                    }}
                  />
                </div>

                {/* Profile Icon */}
                <Nav.Link
                  as={Link}
                //   to="/profile"
                  to={isLoggedIn ? "/profile" : "/login"}
                  style={{ padding: 0, color: "#134E4A", display: "flex" }}
                >
                  <CgProfile
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#134E4A",
                      cursor: "pointer",
                    }}
                  />
                </Nav.Link>

                {/* Cart Icon */}
                <Nav.Link
                  as={Link}
                  to="/cart"
                  style={{
                    padding: 0,
                    color: "#134E4A",
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <IoCart
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#134E4A",
                      cursor: "pointer",
                    }}
                  />
                  {/* Cart Count Badge */}
                  {cartItemCount > 0 && (
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: "#D4AF37",
                        color: "#FFFFFF",
                        fontSize: "10px",
                        fontWeight: 600,
                        position: "absolute",
                        top: "-8px",
                        right: "-10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {cartItemCount}
                    </span>
                  )}
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;