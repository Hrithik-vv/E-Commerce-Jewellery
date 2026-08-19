import React from 'react';
import '../css/AdminProfilePage.css';

export default function AdminProfilePage() {
  return (
    <div className="mb-4">
      {/* Page Header */}
      <div className="mb-4">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--admin-text-main)', margin: '0 0 8px 0' }}>Admin Profile</h1>
        <p style={{ color: 'var(--admin-text-muted)', margin: 0, fontSize: '0.95rem' }}>Manage your personal information and preferences.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        
        {/* Left Column (Profile & Personal Info) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Profile Banner */}
          <div className="admin-card text-center" style={{ marginBottom: 0, padding: '32px 24px' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 16px' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--admin-bg)' }}>
                <img src="https://i.pravatar.cc/150?u=admin" alt="Admin Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <button className="admin-btn admin-btn-primary" style={{ position: 'absolute', bottom: '0', right: '0', width: '36px', height: '36px', padding: '0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </button>
            </div>
            <h2 style={{ fontSize: '1.25rem', margin: '0 0 8px', color: 'var(--admin-text-main)' }}>John Doe</h2>
            <div className="d-flex justify-content-center gap-2">
              <span className="admin-badge admin-badge-primary">Administrator</span>
              <span className="admin-badge admin-badge-success">Active</span>
            </div>
          </div>

          {/* Personal Information */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card-header">
              <h3 className="admin-card-title">Personal Information</h3>
            </div>
            <div className="admin-grid-2 mb-3">
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--admin-text-main)' }}>Full Name</label>
                <input type="text" className="admin-input" defaultValue="John Doe" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--admin-text-main)' }}>Username</label>
                <input type="text" className="admin-input" defaultValue="johndoe_admin" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--admin-text-main)' }}>Email</label>
                <input type="email" className="admin-input" defaultValue="john.doe@example.com" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--admin-text-main)' }}>Phone</label>
                <input type="tel" className="admin-input" defaultValue="+1 234 567 8900" />
              </div>
            </div>
            <div className="mb-3">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--admin-text-main)' }}>Address</label>
              <textarea className="admin-input" defaultValue="123 Main St" rows="2"></textarea>
            </div>
            <div className="admin-grid-2">
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--admin-text-main)' }}>City</label>
                <input type="text" className="admin-input" defaultValue="New York" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--admin-text-main)' }}>Country</label>
                <select className="admin-select">
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card-header">
              <h3 className="admin-card-title">Preferences</h3>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span style={{ fontSize: '0.875rem', color: 'var(--admin-text-main)' }}>Language</span>
              <select className="admin-select" style={{ width: '150px' }}>
                <option>English</option>
                <option>Spanish</option>
              </select>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span style={{ fontSize: '0.875rem', color: 'var(--admin-text-main)' }}>Timezone</span>
              <select className="admin-select" style={{ width: '150px' }}>
                <option>EST (GMT-5)</option>
                <option>PST (GMT-8)</option>
              </select>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span style={{ fontSize: '0.875rem', color: 'var(--admin-text-main)' }}>Email Alerts</span>
              <div style={{ width: '40px', height: '24px', backgroundColor: 'var(--admin-success)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', gridColumn: 'span 2' }}>
          
          {/* Stats */}
          <div className="admin-grid-4">
            <div className="admin-card text-center" style={{ marginBottom: 0, padding: '24px 16px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--admin-primary)', marginBottom: '4px' }}>1,234</div>
              <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>Total Users</div>
            </div>
            <div className="admin-card text-center" style={{ marginBottom: 0, padding: '24px 16px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--admin-secondary)', marginBottom: '4px' }}>8,492</div>
              <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>Orders Managed</div>
            </div>
            <div className="admin-card text-center" style={{ marginBottom: 0, padding: '24px 16px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--admin-text-success)', marginBottom: '4px' }}>$45K</div>
              <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>Revenue</div>
            </div>
            <div className="admin-card text-center" style={{ marginBottom: 0, padding: '24px 16px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--admin-text-warning)', marginBottom: '4px' }}>128</div>
              <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>Reports</div>
            </div>
          </div>

          {/* Account Information */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card-header">
              <h3 className="admin-card-title">Account Information</h3>
            </div>
            <div className="admin-grid-2">
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Employee ID</div>
                <div style={{ fontWeight: 500, color: 'var(--admin-text-main)' }}>EMP-10293</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Department</div>
                <div style={{ color: 'var(--admin-text-main)' }}>IT Administration</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Created Date</div>
                <div style={{ color: 'var(--admin-text-main)' }}>15 Jan 2023</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginBottom: '4px' }}>Last Updated</div>
                <div style={{ color: 'var(--admin-text-main)' }}>01 Oct 2023</div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card-header">
              <h3 className="admin-card-title">Security</h3>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4 pb-4" style={{ borderBottom: '1px solid var(--admin-border)' }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--admin-text-main)', marginBottom: '4px' }}>Password</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)' }}>Last changed 3 months ago</div>
              </div>
              <button className="admin-btn admin-btn-outline">Change Password</button>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4 pb-4" style={{ borderBottom: '1px solid var(--admin-border)' }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--admin-text-main)', marginBottom: '4px' }}>Two-Factor Authentication</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)' }}>Enable 2FA for enhanced security</div>
              </div>
              <div style={{ width: '40px', height: '24px', backgroundColor: 'var(--admin-success)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--admin-text-main)', marginBottom: '4px' }}>Active Sessions</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)' }}>Manage your logged-in devices</div>
              </div>
              <button className="admin-btn admin-btn-outline">View Sessions</button>
            </div>
          </div>

          {/* Actions */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <button className="admin-btn admin-btn-outline">Cancel</button>
            <button className="admin-btn admin-btn-primary">Save Changes</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
