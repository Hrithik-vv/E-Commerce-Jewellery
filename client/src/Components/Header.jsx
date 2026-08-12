import React, { useState } from "react";
import { NavDropdown, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoCart } from "react-icons/io5";
import "./Header.css";

function Header() {
  // Auth state & Cart count
  const isLoggedIn = false;
  const cartItemCount = 2;

  // Search input state
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Navbar expand="lg" className="header-navbar">
      <Container fluid className="header-container">
        {/* Logo Container */}
        <Navbar.Brand as={Link} to="/" className="logo-brand">
          {/* Logo Mark */}
          <div className="logo-circle">
            <img src="/logo3.jpeg" alt="Elora Jewellery" />
          </div>

          {/* Logo Text */}
          <span className="logo-text">Elora Jewellery</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav Links Container */}
          <Nav className="ms-auto nav-links">
            {/* Home Link */}
            <Nav.Link
              as={Link}
              to="/"
              className="nav-link-custom active-link"
            >
              Home
            </Nav.Link>

            {/* Categories Link Dropdown */}
            <NavDropdown
              title="Categories"
              id="basic-nav-dropdown"
              className="custom-categories-dropdown nav-link-custom"
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
            <Nav.Link as={Link} to="/best-sellers" className="nav-link-custom">
              Best Sellers
            </Nav.Link>

            {/* About Us Link */}
            <Nav.Link as={Link} to="/about" className="nav-link-custom">
              About Us
            </Nav.Link>

            {/* Contact Us Link */}
            <Nav.Link as={Link} to="/contact" className="nav-link-custom">
              Contact Us
            </Nav.Link>

            {/* Icons Container */}
            <div className="icon-group">
              {/* Search Icon Container & Input */}
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search jewellery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <FaSearch className="search-icon" />
              </div>

              {/* Profile Icon */}
              <Nav.Link
                as={Link}
                to={isLoggedIn ? "/profile" : "/login"}
                className="nav-link-custom"
              >
                <CgProfile className="icon" />
              </Nav.Link>

              {/* Cart Icon */}
              <Nav.Link as={Link} to="/cart" className="cart-link nav-link-custom">
                <IoCart className="icon" />
                {/* Cart Count Badge */}
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;