import React, { useState, useRef, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoCart } from "react-icons/io5";
import { useCart } from "../utils/CartContext";
import "../css/Header.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItemCount } = useCart();

  // Auth state & Cart count
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const cartItemCount = totalItemCount;

  // Search input state
  const [searchQuery, setSearchQuery] = useState("");

  // Categories Dropdown State & Ref
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchQuery.trim()) {
        navigate(`/category/${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
      }
    }
  };

  const isActive = (path) => (location.pathname === path ? "active-link" : "");

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
              className={`nav-link-custom ${isActive("/")}`}
            >
              Home
            </Nav.Link>

            {/* Categories Link Dropdown Wrapper */}
            <div className="categories-wrapper" ref={categoriesRef}>
              <button
                type="button"
                className={`categories-link nav-link-custom ${
                  location.pathname.startsWith("/category") ? "active-link" : ""
                }`}
                onClick={() => setIsCategoriesOpen((prev) => !prev)}
              >
                <span>Categories</span>
                <FaChevronDown className={`chevron-icon ${isCategoriesOpen ? "open" : ""}`} size={10} />
              </button>

              <div className={`categories-dropdown ${isCategoriesOpen ? "active" : ""}`}>
                <Link to="/category/rings" className="category-item" onClick={() => setIsCategoriesOpen(false)}>
                  Rings
                </Link>
                <Link to="/category/necklaces" className="category-item" onClick={() => setIsCategoriesOpen(false)}>
                  Necklaces
                </Link>
                <Link to="/category/bracelets" className="category-item" onClick={() => setIsCategoriesOpen(false)}>
                  Bracelets
                </Link>
                <Link to="/category/earrings" className="category-item" onClick={() => setIsCategoriesOpen(false)}>
                  Earrings
                </Link>
                <Link to="/category/bangles" className="category-item" onClick={() => setIsCategoriesOpen(false)}>
                  Bangles
                </Link>
                <Link to="/category/jhumkas" className="category-item" onClick={() => setIsCategoriesOpen(false)}>
                  Jhumkas
                </Link>
              </div>
            </div>

            {/* Best Sellers Link */}
            <Nav.Link
              as={Link}
              to="/best-sellers"
              className={`nav-link-custom ${isActive("/best-sellers")}`}
            >
              Best Sellers
            </Nav.Link>

            {/* About Us Link */}
            <Nav.Link
              as={Link}
              to="/about"
              className={`nav-link-custom ${isActive("/about")}`}
            >
              About Us
            </Nav.Link>

            {/* Contact Us Link */}
            <Nav.Link
              as={Link}
              to="/contact"
              className={`nav-link-custom ${isActive("/contact")}`}
            >
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
                  onKeyDown={handleSearchSubmit}
                  className="search-input"
                />
                <FaSearch className="search-icon" onClick={handleSearchSubmit} style={{ cursor: "pointer" }} />
              </div>

              {/* Profile Icon */}
              <Nav.Link
                as={Link}
                to={isLoggedIn ? "/profile" : "/login"}
                className={`nav-link-custom ${
                  isActive("/profile") || isActive("/login")
                }`}
              >
                <CgProfile className="icon" />
              </Nav.Link>

              {/* Cart Icon */}
              <Nav.Link as={Link} to="/cart" className={`cart-link nav-link-custom ${isActive("/cart")}`}>
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