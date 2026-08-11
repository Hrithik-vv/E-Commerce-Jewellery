import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/AdminDashboard.css';

// --- Sidebar Components ---
const LogoSection = () => (
    <div className="admin-sidebar-logo-section">
        <div className="admin-sidebar-logo-badge">
            <span style={{ color: '#D4AF37', fontSize: '24px' }}>✨</span>
        </div>
        <h2 className="admin-sidebar-brand-name">AURA</h2>
        <p className="admin-sidebar-brand-subtitle">FINE JEWELLERY</p>
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

const LogoutButton = () => (
    <div className="admin-sidebar-logout">
        <a className="admin-sidebar-logout-btn">
            <span style={{ fontSize: '18px' }}>🚪</span> <span>Logout</span>
        </a>
    </div>
);

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

const AdminProfile = () => (
    <div className="admin-profile-section">
        <div className="admin-avatar">JD</div>
        <div className="admin-profile-info">
            <span className="admin-profile-name">John Doe</span>
            <span className="admin-profile-role">Admin</span>
        </div>
    </div>
);

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

// --- Dashboard Content Components ---
const DashboardOverview = () => (
    <div className="admin-overview">
        <h2 className="admin-overview-heading">Dashboard Overview</h2>
        <p className="admin-overview-desc">Here is the information about all your orders, revenue and products.</p>
    </div>
);

const StatisticsCards = () => (
    <div className="admin-stats-grid">
        <div className="admin-stat-card">
            <div className="admin-stat-icon bg-orders"><span style={{ fontSize: '24px' }}>📦</span></div>
            <div className="admin-stat-info">
                <span className="admin-stat-label">Total Orders</span>
                <span className="admin-stat-value">1,248</span>
            </div>
        </div>
        <div className="admin-stat-card">
            <div className="admin-stat-icon bg-revenue"><span style={{ fontSize: '24px' }}>💰</span></div>
            <div className="admin-stat-info">
                <span className="admin-stat-label">Total Revenue</span>
                <span className="admin-stat-value">₹12,45,680</span>
            </div>
        </div>
        <div className="admin-stat-card">
            <div className="admin-stat-icon bg-products"><span style={{ fontSize: '24px' }}>💎</span></div>
            <div className="admin-stat-info">
                <span className="admin-stat-label">Total Products</span>
                <span className="admin-stat-value">856</span>
            </div>
        </div>
        <div className="admin-stat-card">
            <div className="admin-stat-icon bg-users"><span style={{ fontSize: '24px' }}>👥</span></div>
            <div className="admin-stat-info">
                <span className="admin-stat-label">Total Users</span>
                <span className="admin-stat-value">2,350</span>
            </div>
        </div>
    </div>
);

const RecentOrders = () => (
    <div className="admin-card">
        <div className="admin-card-header">
            <h3 className="admin-card-title">Recent Orders</h3>
            <Link to="/orders" className="admin-card-link">View All</Link>
        </div>
        <div className="admin-table-container">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#ORD-001</td>
                        <td>Alice Smith</td>
                        <td>Aug 11, 2026</td>
                        <td>₹15,000</td>
                        <td><span className="admin-badge badge-delivered">Delivered</span></td>
                    </tr>
                    <tr>
                        <td>#ORD-002</td>
                        <td>Bob Jones</td>
                        <td>Aug 10, 2026</td>
                        <td>₹42,500</td>
                        <td><span className="admin-badge badge-shipped">Shipped</span></td>
                    </tr>
                    <tr>
                        <td>#ORD-003</td>
                        <td>Charlie Davis</td>
                        <td>Aug 09, 2026</td>
                        <td>₹8,200</td>
                        <td><span className="admin-badge badge-processing">Processing</span></td>
                    </tr>
                    <tr>
                        <td>#ORD-004</td>
                        <td>Diana Prince</td>
                        <td>Aug 08, 2026</td>
                        <td>₹1,15,000</td>
                        <td><span className="admin-badge badge-pending">Pending</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const TopSellingProducts = () => (
    <div className="admin-card">
        <div className="admin-card-header">
            <h3 className="admin-card-title">Top Selling Products</h3>
            <Link to="/products" className="admin-card-link">View All</Link>
        </div>
        <div className="admin-table-container">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Sold</th>
                        <th>Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="admin-product-cell">
                                <div className="admin-product-thumb"></div>
                                <span>Diamond Necklace</span>
                            </div>
                        </td>
                        <td>45</td>
                        <td>₹22,50,000</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="admin-product-cell">
                                <div className="admin-product-thumb"></div>
                                <span>Gold Bangles</span>
                            </div>
                        </td>
                        <td>38</td>
                        <td>₹15,20,000</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="admin-product-cell">
                                <div className="admin-product-thumb"></div>
                                <span>Platinum Ring</span>
                            </div>
                        </td>
                        <td>24</td>
                        <td>₹14,40,000</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="admin-product-cell">
                                <div className="admin-product-thumb"></div>
                                <span>Emerald Earrings</span>
                            </div>
                        </td>
                        <td>18</td>
                        <td>₹5,40,000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const LowStockProducts = () => (
    <div className="admin-card admin-low-stock-card">
        <div className="admin-card-header">
            <h3 className="admin-card-title">Low Stock Products</h3>
            <a className="admin-card-link">View All</a>
        </div>
        <div className="admin-table-container">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Stock</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="admin-product-cell">
                                <div className="admin-product-thumb"></div>
                                <span>Ruby Pendant</span>
                            </div>
                        </td>
                        <td>SKU-RUBY-01</td>
                        <td>2</td>
                        <td><span className="admin-badge badge-lowstock">Low Stock</span></td>
                    </tr>
                    <tr>
                        <td>
                            <div className="admin-product-cell">
                                <div className="admin-product-thumb"></div>
                                <span>Sapphire Ring</span>
                            </div>
                        </td>
                        <td>SKU-SAPH-04</td>
                        <td>1</td>
                        <td><span className="admin-badge badge-lowstock">Low Stock</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const MainContent = ({ toggleSidebar }) => (
    <main className="admin-dashboard-main">
        <TopBar toggleSidebar={toggleSidebar} />
        <DashboardOverview />
        <StatisticsCards />
        <div className="admin-content-grid">
            <RecentOrders />
            <TopSellingProducts />
        </div>
        <LowStockProducts />
    </main>
);

const AdminDashboard = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleSidebar = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    return (
        <div className="admin-dashboard-wrapper">
            <Sidebar isMobileOpen={isMobileOpen} />
            <MainContent toggleSidebar={toggleSidebar} />
        </div>
    );
};

export default AdminDashboard;
