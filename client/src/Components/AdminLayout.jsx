import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/AdminDashboard.css';

// --- Sidebar Components ---
const LogoSection = () => (
    <div className="admin-sidebar-logo-section">
        <div className="admin-sidebar-logo-badge">
            <span style={{ color: '#D4AF37', fontSize: '24px' }}>✨</span>
        </div>
        <h2 className="admin-sidebar-brand-name">ELORA</h2>
        <p className="admin-sidebar-brand-subtitle">JEWELLERY</p>
    </div>
);

const NavigationMenu = () => (
    <nav className="admin-sidebar-nav">
        <Link to="/admin-dashboard" className="admin-nav-item active">
            <span style={{ fontSize: '18px' }}>📊</span> <span>Dashboard</span>
        </Link>
        <Link to="/products" className="admin-nav-item">
            <span style={{ fontSize: '18px' }}>💎</span> <span>Products</span>
        </Link>
        <Link to="/categories" className="admin-nav-item">
            <span style={{ fontSize: '18px' }}>📁</span> <span>Categories</span>
        </Link>
        <Link to="/orders" className="admin-nav-item">
            <span style={{ fontSize: '18px' }}>📦</span> <span>Orders</span>
        </Link>
        <Link to="/users" className="admin-nav-item">
            <span style={{ fontSize: '18px' }}>👥</span> <span>Users</span>
        </Link>
        <Link to="/admin-profile" className="admin-nav-item">
            <span style={{ fontSize: '18px' }}>⚙️</span> <span>Profile</span>
        </Link>
    </nav>
);

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        window.dispatchEvent(new Event('auth-change'));
        navigate("/login");
    };

    return (
        <div className="admin-sidebar-logout">
            <a href="#" className="admin-sidebar-logout-btn" onClick={handleLogout}>
                <span style={{ fontSize: '18px' }}>🚪</span> <span>Logout</span>
            </a>
        </div>
    );
};

const SidebarQuote = () => (
    <div className="admin-sidebar-quote">
        <div className="admin-quote-text">"Elegance is the only beauty that never fades."</div>
        <div className="admin-quote-author">- Audrey Hepburn</div>
    </div>
);

const Sidebar = ({ isMobileOpen }) => (
    <aside className={`admin-dashboard-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <LogoSection />
        <NavigationMenu />
        <div className="admin-sidebar-divider"></div>
        <LogoutButton />
        <SidebarQuote />
    </aside>
);

// --- TopBar Components ---
const Search = () => (
    <div className="admin-search-container">
        <span className="admin-search-icon" style={{ fontSize: '16px' }}>🔍</span>
        <input type="text" className="admin-search-input" placeholder="Search..." />
    </div>
);

const Notification = () => (
    <div className="admin-notification">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span className="admin-notification-badge">3</span>
    </div>
);

const AdminProfile = () => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const name = user?.name || "Admin";
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    return (
        <div className="admin-profile-section">
            <div className="admin-avatar">{initials}</div>
            <div className="admin-profile-info">
                <span className="admin-profile-name">{name}</span>
                <span className="admin-profile-role">Admin</span>
            </div>
        </div>
    );
};

const TopBar = ({ toggleSidebar }) => (
    <header className="admin-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="hamburger-menu" onClick={toggleSidebar}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <h1 className="admin-topbar-title">Dashboard</h1>
        </div>
        <div className="admin-topbar-actions">
            <Search />
            <Notification />
            <AdminProfile />
        </div>
    </header>
);

const AdminLayout = ({ children }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const navigate = useNavigate();

    // Protect Admin Routes
    useEffect(() => {
        const checkAdminAuth = () => {
            const userStr = localStorage.getItem("user");
            if (!userStr) {
                navigate("/login");
                return;
            }

            try {
                const user = JSON.parse(userStr);
                if (user.role !== "Admin") {
                    navigate("/");
                }
            } catch (e) {
                navigate("/login");
            }
        };

        checkAdminAuth();
    }, [navigate]);

    const toggleSidebar = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    return (
        <div className="admin-dashboard-wrapper">
            <Sidebar isMobileOpen={isMobileOpen} />
            <main className="admin-dashboard-main">
                <TopBar toggleSidebar={toggleSidebar} />
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
