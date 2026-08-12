import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/AdminDashboard.css';

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

const AdminDashboard = () => (
    <>
        <DashboardOverview />
        <StatisticsCards />
        <div className="admin-content-grid">
            <RecentOrders />
            <TopSellingProducts />
        </div>
        <LowStockProducts />
    </>
);

export default AdminDashboard;
