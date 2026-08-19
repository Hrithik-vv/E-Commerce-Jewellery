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
        <div className="mb-4">
            {/* Header Navigation */}
            <div className="mb-3">
                <a href="/admin" onClick={(e) => { e.preventDefault(); window.history.back(); }} style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--admin-text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                        <path d="M15 18L9 12L15 6"/>
                    </svg>
                    Back to Users
                </a>
            </div>

            {/* Main Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div className="d-flex align-items-center gap-3">
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden' }}>
                        <img src="https://i.pravatar.cc/150?u=johndoe" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--admin-text-main)', margin: 0 }}>John Doe</h1>
                        <p style={{ color: 'var(--admin-text-muted)', margin: '4px 0 0 0', fontSize: '0.95rem' }}>
                            User ID: USR-001 · Administrator
                        </p>
                    </div>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                    <button className="admin-btn admin-btn-outline">Edit User</button>
                    <button className="admin-btn admin-btn-outline">More Options</button>
                    <button className="admin-btn admin-btn-danger" onClick={handleDelete}>Delete User</button>
                </div>
            </div>

            {/* Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Status Card */}
                    <div className="admin-card" style={{ marginBottom: 0 }}>
                        <div className="admin-card-header">
                            <h2 className="admin-card-title">User Status</h2>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span style={{ color: 'var(--admin-text-muted)' }}>Account Status</span>
                            <span className="admin-badge admin-badge-success">Active</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span style={{ color: 'var(--admin-text-muted)' }}>Email Verification</span>
                            <span style={{ color: 'var(--admin-text-success)', fontWeight: 500 }}>Verified</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span style={{ color: 'var(--admin-text-muted)' }}>Phone Verification</span>
                            <span style={{ color: 'var(--admin-text-danger)', fontWeight: 500 }}>Unverified</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <span style={{ color: 'var(--admin-text-muted)' }}>Two Factor Authentication</span>
                            <span style={{ color: 'var(--admin-text-success)', fontWeight: 500 }}>Enabled</span>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="admin-card" style={{ marginBottom: 0 }}>
                        <div className="admin-card-header">
                            <h2 className="admin-card-title">Contact Information</h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Email Address</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>john.doe@example.com</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Phone Number</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>+1 234 567 8900</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Address</div>
                                <div style={{ color: 'var(--admin-text-main)', lineHeight: 1.4 }}>
                                    123 Main St<br/>
                                    New York, USA
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                {/* Right Column (takes more space) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', gridColumn: 'span 2' }}>
                    
                    {/* Account Information & Statistics */}
                    <div className="admin-card" style={{ marginBottom: 0 }}>
                        <div className="admin-card-header">
                            <h2 className="admin-card-title">Account Information & Stats</h2>
                        </div>
                        
                        <div className="admin-grid-2 mb-4">
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Username</div>
                                <div style={{ fontWeight: 500, color: 'var(--admin-text-main)' }}>johndoe123</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Registration Date</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>01 Jan 2026</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Last Login</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>11 Aug 2026, 10:00 AM</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Login Count</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>42 times</div>
                            </div>
                        </div>

                        <div className="admin-grid-2 pt-4" style={{ borderTop: '1px solid var(--admin-border)' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Projects</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>5 Active</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Tasks</div>
                                <div style={{ color: 'var(--admin-text-main)' }}>12 Completed, 3 Pending</div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="admin-card" style={{ marginBottom: 0 }}>
                        <div className="admin-card-header">
                            <h2 className="admin-card-title">Recent Activity</h2>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="d-flex align-items-start gap-3">
                                <div style={{ marginTop: '2px' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--admin-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 500, color: 'var(--admin-text-main)' }}>Logged into the system</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)' }}>11 Aug 2026, 10:00 AM</div>
                                </div>
                            </div>
                            
                            <div style={{ borderLeft: '1px solid var(--admin-border)', margin: '0 9px', height: '16px' }}></div>
                            
                            <div className="d-flex align-items-start gap-3">
                                <div style={{ marginTop: '2px' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--admin-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 500, color: 'var(--admin-text-main)' }}>Updated profile details</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)' }}>10 Aug 2026, 03:00 PM</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="admin-card" style={{ marginBottom: 0 }}>
                        <div className="admin-card-header">
                            <h2 className="admin-card-title">Quick Actions</h2>
                        </div>
                        <div className="d-flex flex-wrap gap-3">
                            <button className="admin-btn admin-btn-primary">Edit User Profile</button>
                            <button className="admin-btn admin-btn-outline">Deactivate Account</button>
                            <button className="admin-btn admin-btn-outline">Reset Password</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default SingleUserDetailsPage;
