import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import '../css/AdminDashboard.css';

const DashboardOverview = () => (
    <div className="admin-overview">
        <h2 className="admin-overview-heading">Dashboard Overview</h2>
        <p className="admin-overview-desc">Here is the information about all your orders, revenue and products.</p>
    </div>
);

const StatisticsCards = ({ stats }) => (
    <div className="admin-stats-grid">
        <div className="admin-stat-card">
            <div className="admin-stat-icon bg-orders"><span style={{ fontSize: '24px' }}>📦</span></div>
            <div className="admin-stat-info">
                <span className="admin-stat-label">Total Orders</span>
                <span className="admin-stat-value">{stats?.totalOrders || 0}</span>
            </div>
        </div>
        <div className="admin-stat-card">
            <div className="admin-stat-icon bg-revenue"><span style={{ fontSize: '24px' }}>💰</span></div>
            <div className="admin-stat-info">
                <span className="admin-stat-label">Total Revenue</span>
                <span className="admin-stat-value">₹{stats?.totalRevenue?.toLocaleString('en-IN') || 0}</span>
            </div>
        </div>
        <div className="admin-stat-card">
            <div className="admin-stat-icon bg-products"><span style={{ fontSize: '24px' }}>💎</span></div>
            <div className="admin-stat-info">
                <span className="admin-stat-label">Total Products</span>
                <span className="admin-stat-value">{stats?.totalProducts || 0}</span>
            </div>
        </div>
        <div className="admin-stat-card">
            <div className="admin-stat-icon bg-users"><span style={{ fontSize: '24px' }}>👥</span></div>
            <div className="admin-stat-info">
                <span className="admin-stat-label">Total Users</span>
                <span className="admin-stat-value">{stats?.totalUsers || 0}</span>
            </div>
        </div>
    </div>
);

const RecentOrders = ({ orders }) => (
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
                    {orders && orders.length > 0 ? orders.map((order, index) => (
                        <tr key={index}>
                            <td>#{order.orderId ? order.orderId.substring(order.orderId.length - 6).toUpperCase() : 'N/A'}</td>
                            <td>{order.customer}</td>
                            <td>{new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                            <td>₹{order.amount?.toLocaleString('en-IN')}</td>
                            <td>
                                <span className={`admin-badge badge-${order.status?.toLowerCase() || 'pending'}`}>
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="5">No recent orders</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

const TopSellingProducts = ({ products }) => (
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
                    {products && products.length > 0 ? products.map((product, index) => (
                        <tr key={index}>
                            <td>
                                <div className="admin-product-cell">
                                    <div className="admin-product-thumb">
                                        {product.image && <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />}
                                    </div>
                                    <span>{product.name}</span>
                                </div>
                            </td>
                            <td>{product.sold}</td>
                            <td>₹{product.revenue?.toLocaleString('en-IN')}</td>
                        </tr>
                    )) : (
                        <tr><td colSpan="3">No top selling products data available</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

const LowStockProducts = ({ products }) => (
    <div className="admin-card admin-low-stock-card">
        <div className="admin-card-header">
            <h3 className="admin-card-title">Low Stock Products</h3>
            <Link to="/products" className="admin-card-link">View All</Link>
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
                    {products && products.length > 0 ? products.map((product, index) => (
                        <tr key={index}>
                            <td>
                                <div className="admin-product-cell">
                                    <div className="admin-product-thumb"></div>
                                    <span>{product.productName}</span>
                                </div>
                            </td>
                            <td>{product.sku}</td>
                            <td>{product.stock}</td>
                            <td><span className="admin-badge badge-lowstock">Low Stock</span></td>
                        </tr>
                    )) : (
                        <tr><td colSpan="4">No low stock products</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        overview: {},
        recentOrders: [],
        topSellingProducts: [],
        lowStockProducts: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get('/dashboard');
                if (response.success) {
                    setDashboardData(response.data);
                } else {
                    setError('Failed to fetch dashboard data');
                }
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                setError(err.message || 'Error fetching dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading Dashboard...</div>;
    }

    if (error) {
        return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
    }

    return (
        <>
            <DashboardOverview />
            <StatisticsCards stats={dashboardData.overview} />
            <div className="admin-content-grid">
                <RecentOrders orders={dashboardData.recentOrders} />
                <TopSellingProducts products={dashboardData.topSellingProducts} />
            </div>
            <LowStockProducts products={dashboardData.lowStockProducts} />
        </>
    );
};

export default AdminDashboard;
