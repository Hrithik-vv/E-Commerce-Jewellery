import React from 'react';
import '../css/AdminProfilePage.css';

export default function AdminProfilePage() {
  return (
    <div className="admin-profile-page">
      <div className="admin-profile-container">
        
        {/* Section 1: Left Sidebar */}
        <aside className="admin-sidebar">
          {/* Sidebar content intentionally left blank as per BRD */}
        </aside>

        {/* Main Content (82%) */}
        <main className="admin-main-content">
          
          {/* Section 2: Top Navigation */}
          <header className="admin-header">
            <h1 className="page-title">Admin Profile</h1>
            <div className="header-actions">
              <input type="text" className="admin-input search-bar" placeholder="Search..." />
              {/* Notification Bell Icon */}
              <svg className="notification-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {/* Profile Menu */}
              <div className="profile-menu">
                <svg className="icon-profile" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <div className="profile-dropdown"></div>
              </div>
            </div>
          </header>

          {/* Section 3: Profile Banner */}
          <section className="banner-card">
            <div className="profile-avatar-container">
              <div className="profile-avatar">
                <div className="edit-avatar">
                  {/* Camera Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
              </div>
              <div className="profile-info">
                <h2 className="admin-name">John Doe</h2>
                <div className="badges">
                  <span className="role-badge">Administrator</span>
                  <span className="status-badge">Active</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Profile Information */}
          <section className="admin-card">
            <h3 className="section-title">Personal Information</h3>
            <div className="info-grid input-gap">
              <div className="field-group">
                <label className="field-label">Full Name</label>
                <input type="text" className="admin-input input-text full-name-input" defaultValue="John Doe" />
              </div>
              <div className="field-group">
                <label className="field-label">Username</label>
                <input type="text" className="admin-input input-text username-input" defaultValue="johndoe_admin" />
              </div>
              <div className="field-group">
                <label className="field-label">Email</label>
                <input type="email" className="admin-input input-text email-input" defaultValue="john.doe@example.com" />
              </div>
              <div className="field-group">
                <label className="field-label">Phone</label>
                <input type="tel" className="admin-input input-text phone-input" defaultValue="+1 234 567 8900" />
              </div>
              <div className="field-group">
                <label className="field-label">Date of Birth</label>
                <input type="date" className="admin-input input-text dob-picker" defaultValue="1990-01-01" />
              </div>
              <div className="field-group">
                <label className="field-label">Gender</label>
                <select className="admin-input input-text gender-dropdown">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field-group">
                <label className="field-label">Address</label>
                <textarea className="admin-input input-text address-textarea" defaultValue="123 Main St"></textarea>
              </div>
              <div className="field-group">
                <label className="field-label">City</label>
                <input type="text" className="admin-input input-text city-input" defaultValue="New York" />
              </div>
              <div className="field-group">
                <label className="field-label">State</label>
                <select className="admin-input input-text state-dropdown">
                  <option>NY</option>
                  <option>CA</option>
                </select>
              </div>
              <div className="field-group">
                <label className="field-label">Country</label>
                <select className="admin-input input-text country-dropdown">
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>
              <div className="field-group">
                <label className="field-label">Postal Code</label>
                <input type="text" className="admin-input input-text postal-code-input" defaultValue="10001" />
              </div>
            </div>
          </section>

          {/* Section 5: Account Information */}
          <section className="admin-card section-gap">
            <h3 className="section-title">Account Information</h3>
            <div className="info-grid input-gap">
              <div className="field-group">
                <label className="field-label">Employee ID</label>
                <input type="text" className="admin-input input-text employee-id-field" defaultValue="EMP-10293" />
              </div>
              <div className="field-group">
                <label className="field-label">Department</label>
                <input type="text" className="admin-input input-text department-field" defaultValue="IT Administration" />
              </div>
              <div className="field-group">
                <label className="field-label">Role</label>
                <input type="text" className="admin-input input-text role-field" defaultValue="System Administrator" />
              </div>
              <div className="field-group">
                <label className="field-label">Account Status</label>
                <input type="text" className="admin-input input-text status-field" defaultValue="Active" />
              </div>
              <div className="field-group">
                <label className="field-label">Created Date</label>
                <input type="text" className="admin-input input-text created-date-field" defaultValue="2023-01-15" />
              </div>
              <div className="field-group">
                <label className="field-label">Last Updated</label>
                <input type="text" className="admin-input input-text last-updated-field" defaultValue="2023-10-01" />
              </div>
            </div>
          </section>

          {/* Section 6: Security Settings */}
          <section className="admin-card section-gap">
            <h3 className="section-title">Security</h3>
            <div className="security-row">
              <div className="security-info">
                <span className="field-label password-field">Password</span>
                <span className="body-text">Last changed 3 months ago</span>
              </div>
              <button className="btn-change-password button-text">Change Password</button>
            </div>
            <div className="security-row">
              <div className="security-info">
                <span className="field-label">Two-Factor Authentication</span>
                <span className="body-text">Enable 2FA for enhanced security</span>
              </div>
              <div className="two-fa-toggle active"></div>
            </div>
            <div className="security-row">
              <div className="security-info">
                <span className="field-label">Email Verification</span>
              </div>
              <span className="email-verification-badge">Verified</span>
            </div>
            <div className="security-row">
              <div className="security-info">
                <span className="field-label">Phone Verification</span>
              </div>
              <span className="phone-verification-badge">Not Verified</span>
            </div>
            <div className="security-row">
              <div className="security-info">
                <span className="field-label">Last Login</span>
                <span className="body-text last-login">Today, 10:30 AM</span>
              </div>
            </div>
            <div className="security-row">
              <div className="security-info">
                <span className="field-label">Login Device</span>
                <span className="body-text login-device">MacBook Pro 16"</span>
              </div>
            </div>
            <div className="security-row">
              <div className="security-info">
                <span className="field-label">IP Address</span>
                <span className="body-text ip-address">192.168.1.1</span>
              </div>
            </div>
          </section>

          {/* Section 7: Statistics */}
          <section className="stats-grid section-gap">
            <div className="stat-card total-users">
              <span className="body-text">Total Users</span>
              <span className="stat-value">1,234</span>
            </div>
            <div className="stat-card orders-managed">
              <span className="body-text">Orders Managed</span>
              <span className="stat-value">8,492</span>
            </div>
            <div className="stat-card revenue">
              <span className="body-text">Revenue</span>
              <span className="stat-value">$45K</span>
            </div>
            <div className="stat-card reports">
              <span className="body-text">Reports</span>
              <span className="stat-value">128</span>
            </div>
          </section>

          {/* Section 8: Recent Activity */}
          <section className="admin-card section-gap">
            <h3 className="section-title">Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <svg className="activity-icon icon-security" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div className="activity-content">
                  <span className="activity-title">Updated security settings</span>
                  <span className="activity-time body-text">2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <svg className="activity-icon icon-security" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div className="activity-content">
                  <span className="activity-title">Changed account password</span>
                  <span className="activity-time body-text">Yesterday</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Active Sessions */}
          <section className="admin-card section-gap">
            <h3 className="section-title">Active Sessions</h3>
            <div className="session-card">
              <div className="session-info">
                <span className="session-device">MacBook Pro 16"</span>
                <span className="session-browser">Chrome</span>
                <span className="session-location body-text">New York, USA</span>
                <span className="session-last-active body-text">Last Active: Just now</span>
              </div>
              <button className="btn-end-session button-text">End Session</button>
            </div>
            <div className="session-card">
              <div className="session-info">
                <span className="session-device">iPhone 13 Pro</span>
                <span className="session-browser">Safari</span>
                <span className="session-location body-text">New York, USA</span>
                <span className="session-last-active body-text">Last Active: 2 hours ago</span>
              </div>
              <button className="btn-end-session button-text">End Session</button>
            </div>
          </section>

          {/* Section 10: Preferences */}
          <section className="admin-card section-gap">
            <h3 className="section-title">Preferences</h3>
            <div className="pref-row">
              <span className="field-label">Theme</span>
              <select className="pref-select theme-toggle">
                <option>Light Mode</option>
                <option>Dark Mode</option>
              </select>
            </div>
            <div className="pref-row">
              <span className="field-label">Language</span>
              <select className="pref-select language-dropdown">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="pref-row">
              <span className="field-label">Timezone</span>
              <select className="pref-select timezone-dropdown">
                <option>EST (GMT-5)</option>
                <option>PST (GMT-8)</option>
              </select>
            </div>
            <div className="pref-row">
              <span className="field-label">Notification</span>
              <div className="notification-toggle active"></div>
            </div>
            <div className="pref-row">
              <span className="field-label">Email Alerts</span>
              <div className="email-alerts-toggle"></div>
            </div>
          </section>

          {/* Section 11: Action Buttons */}
          <section className="action-buttons-container section-gap">
            <button className="btn-edit-profile button-text">Edit Profile</button>
            <button className="btn-save-changes button-text">Save Changes</button>
            <button className="btn-cancel button-text">Cancel</button>
            <button className="btn-logout button-text">Logout</button>
          </section>

        </main>
      </div>
    </div>
  );
}
