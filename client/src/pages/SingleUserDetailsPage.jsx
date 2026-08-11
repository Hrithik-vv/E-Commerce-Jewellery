import React, { useState } from 'react';
import '../css/SingleUserDetailsPage.css';

const SingleUserDetailsPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setDeleted(true);
        }
    };

    if (deleted) {
        return <div className="user-details-wrapper"><div className="user-details-main"><div className="user-details-content"><h1 className="user-details-title">User deleted</h1></div></div></div>;
    }

    return (
        <div className="user-details-wrapper">
            <aside className={`user-details-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <span className="user-details-body">Navigation menu</span>
            </aside>
            <main className="user-details-main">
                <header className="user-details-top-header">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: 'none', background: 'transparent', color: '#fff', border: 'none' }} className="mobile-toggle">Menu</button>
                    <div style={{ display: 'flex' }}>
                        <input type="text" className="user-details-search" placeholder="Search..." />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <span className="user-details-notification">🔔</span>
                        <span className="user-details-profile">Admin Profile</span>
                    </div>
                </header>

                <div className="user-details-content">
                    <div className="user-details-header-actions">
                        <div>
                            <div className="user-details-breadcrumb">Dashboard &gt; Users &gt; User Details</div>
                            <h1 className="user-details-title">John Doe</h1>
                        </div>
                        <div className="user-details-header-actions">
                            <button className="user-details-btn-secondary">Edit User</button>
                            <button className="user-details-btn-danger" onClick={handleDelete}>Delete User</button>
                            <button className="user-details-btn-secondary">More Options</button>
                        </div>
                    </div>

                    <div className="user-details-two-column">
                        <div className="user-details-left-column">
                            {/* SECTION 4 — USER PROFILE */}
                            <div className="user-details-card">
                                <img src="https://i.pravatar.cc/150?u=johndoe" alt="Profile" className="user-details-avatar" />
                                <div className="user-details-body">John Doe</div>
                                <div className="user-details-body-secondary">Role: Administrator</div>
                                <div className="user-details-status-badge">Active</div>
                                <div className="user-details-user-id">User ID: USR-001</div>
                            </div>

                            {/* SECTION 5 — CONTACT INFORMATION */}
                            <div className="user-details-card">
                                <h2 className="user-details-heading">Contact Information</h2>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Email</span>
                                    <span className="user-details-body">john.doe@example.com</span>
                                </div>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Phone</span>
                                    <span className="user-details-body">+1 234 567 8900</span>
                                </div>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Address</span>
                                    <span className="user-details-body">123 Main St</span>
                                </div>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">City</span>
                                    <span className="user-details-body">New York</span>
                                </div>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Country</span>
                                    <span className="user-details-body">USA</span>
                                </div>
                            </div>

                            {/* SECTION 7 — USER STATISTICS */}
                            <div className="user-details-card">
                                <h2 className="user-details-heading">User Statistics</h2>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Projects</span>
                                    <span className="user-details-body">5</span>
                                </div>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Tasks</span>
                                    <span className="user-details-body">12 Completed, 3 Pending</span>
                                </div>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Login Count</span>
                                    <span className="user-details-body">42</span>
                                </div>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Last Activity</span>
                                    <span className="user-details-body">11 Aug 2026, 10:00 AM</span>
                                </div>
                            </div>
                        </div>

                        <div className="user-details-right-column">
                            {/* SECTION 6 — ACCOUNT INFORMATION */}
                            <div className="user-details-card">
                                <h2 className="user-details-heading">Account Information</h2>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Username</span>
                                    <span className="user-details-body">johndoe123</span>
                                </div>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Registration Date</span>
                                    <span className="user-details-body">01 Jan 2026</span>
                                </div>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Last Login</span>
                                    <span className="user-details-body">11 Aug 2026, 10:00 AM</span>
                                </div>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Email Verification</span>
                                    <span className="user-details-text-success">Verified</span>
                                </div>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Phone Verification</span>
                                    <span className="user-details-text-danger">Unverified</span>
                                </div>
                                <div className="user-details-info-row">
                                    <span className="user-details-label">Two Factor Authentication</span>
                                    <span className="user-details-text-success">Enabled</span>
                                </div>
                            </div>

                            {/* SECTION 8 — RECENT ACTIVITY */}
                            <div className="user-details-card">
                                <h2 className="user-details-heading">Recent Activity</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div className="user-details-timeline-item">
                                        <span className="user-details-label">Login</span>
                                        <span className="user-details-body">Logged into the system</span>
                                        <span className="user-details-body-secondary">11 Aug 2026, 10:00 AM</span>
                                    </div>
                                    <div style={{ borderTop: '1px solid #2A2F3A' }}></div>
                                    <div className="user-details-timeline-item">
                                        <span className="user-details-label">Update</span>
                                        <span className="user-details-body">Updated profile details</span>
                                        <span className="user-details-body-secondary">10 Aug 2026, 03:00 PM</span>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 9 — ACTION BUTTONS */}
                            <div className="user-details-card">
                                <h2 className="user-details-heading">Actions</h2>
                                <div className="user-details-action-buttons-row">
                                    <button className="user-details-btn-primary">Edit User</button>
                                    <button className="user-details-btn-secondary">Deactivate Account</button>
                                    <button className="user-details-btn-secondary">Reset Password</button>
                                    <button className="user-details-btn-danger" onClick={handleDelete}>Delete User</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SingleUserDetailsPage;
