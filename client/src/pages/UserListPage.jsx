import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import '../css/UserListPage.css';

const UserListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    
    // Modal states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/users');
            if (res.success && res.data) {
                setUsers(res.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error(error.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = useMemo(() => {
        return users.filter(u => {
            const matchesSearch = u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  u.email?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter ? u.role === roleFilter : true;
            const matchesStatus = statusFilter ? u.status === statusFilter : true;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchQuery, roleFilter, statusFilter]);

    const handleReset = () => {
        setSearchQuery('');
        setRoleFilter('');
        setStatusFilter('');
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedUser) return;
        try {
            const res = await api.delete(`/users/${selectedUser._id}`);
            if (res.success) {
                toast.success('User deleted successfully');
                setUsers(users.filter(u => u._id !== selectedUser._id));
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error(error.message || 'Failed to delete user');
        } finally {
            setShowDeleteModal(false);
            setSelectedUser(null);
        }
    };

    const handleViewClick = (user) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const closeModals = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowViewModal(false);
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="user-list-dashboard">
            {/* Sidebar */}
            <aside className="user-list-sidebar">
                <div className="user-list-sidebar-logo">Logo</div>
                <nav className="user-list-sidebar-nav">
                    <a href="#" className="user-list-nav-item">Dashboard</a>
                    <a href="#" className="user-list-nav-item active">Users</a>
                    <a href="#" className="user-list-nav-item">Roles</a>
                    <a href="#" className="user-list-nav-item">Permissions</a>
                    <a href="#" className="user-list-nav-item">Projects</a>
                    <a href="#" className="user-list-nav-item">Tasks</a>
                    <a href="#" className="user-list-nav-item">Reports</a>
                    <a href="#" className="user-list-nav-item">Settings</a>
                    <a href="#" className="user-list-nav-item">Logout</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="user-list-main-content">
                
                {/* Topbar */}
                <header className="user-list-topbar">
                    <div className="user-list-search-bar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <input type="text" placeholder="Search..." />
                    </div>
                    
                    <div className="user-list-topbar-right">
                        <div className="user-list-notification">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                        </div>
                        <div className="user-list-profile">
                            <img src="https://i.pravatar.cc/150?u=admin" alt="Admin Avatar" className="user-list-avatar" />
                            <div className="user-list-profile-info">
                                <span className="user-list-profile-name">Super Admin</span>
                                <span className="user-list-profile-role">Administrator</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="user-list-page-container">
                    
                    {/* Page Header */}
                    <div className="user-list-page-header">
                        <div className="user-list-page-title-box">
                            <h1 className="user-list-page-title">User List</h1>
                            <p className="user-list-page-description">Manage user accounts and their roles.</p>
                        </div>
                        <button className="user-list-btn-primary" onClick={handleAddClick}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            Add User
                        </button>
                    </div>

                    {/* Card Container */}
                    <div className="user-list-card">
                        
                        {/* Search & Filters */}
                        <div className="user-list-filters-row">
                            <input 
                                type="text" 
                                className="user-list-filter-input" 
                                placeholder="Search by name or email" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            
                            <select 
                                className="user-list-filter-select"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                <option value="">All Roles</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>

                            <select 
                                className="user-list-filter-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>

                            <button className="user-list-btn-reset" onClick={handleReset}>
                                Reset Filter
                            </button>
                        </div>

                        {/* Desktop / Tablet Table */}
                        <div className="user-list-table-container">
                            {loading ? (
                                <div style={{ padding: '20px', textAlign: 'center' }}>Loading users...</div>
                            ) : (
                                <table className="user-list-table">
                                    <thead>
                                        <tr>
                                            <th>Avatar</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Joined Date</th>
                                            <th>Last Login</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map(user => (
                                            <tr key={user._id}>
                                                <td>
                                                    <img src={user.profileImage || `https://i.pravatar.cc/150?u=${user._id}`} alt="Avatar" className="user-list-table-avatar" />
                                                </td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <div className={`user-list-status-badge status-${user.status?.toLowerCase()}`}>
                                                        {user.status}
                                                    </div>
                                                </td>
                                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                                <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</td>
                                                <td>
                                                    <div className="user-list-action-btns">
                                                        <button className="user-list-action-btn" title="View" onClick={() => handleViewClick(user)}>
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                                        </button>
                                                        <button className="user-list-action-btn" title="Edit" onClick={() => handleEditClick(user)}>
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                                        </button>
                                                        <button className="user-list-action-btn" title="Delete" onClick={() => handleDeleteClick(user)}>
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredUsers.length === 0 && (
                                            <tr>
                                                <td colSpan="8" style={{ textAlign: 'center', color: '#6B7280' }}>No users found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Mobile Stacked Cards */}
                        {!loading && (
                            <div className="user-list-mobile-cards">
                                {filteredUsers.map(user => (
                                    <div className="user-list-mobile-card" key={`mobile-${user._id}`}>
                                        <div className="user-list-mobile-card-row">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <img src={user.profileImage || `https://i.pravatar.cc/150?u=${user._id}`} alt="Avatar" className="user-list-table-avatar" />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span className="user-list-mobile-value">{user.name}</span>
                                                    <span className="user-list-mobile-label">{user.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="user-list-mobile-card-row">
                                            <span className="user-list-mobile-label">Role</span>
                                            <span className="user-list-mobile-value">{user.role}</span>
                                        </div>

                                        <div className="user-list-mobile-card-row">
                                            <span className="user-list-mobile-label">Status</span>
                                            <div className={`user-list-status-badge status-${user.status?.toLowerCase()}`}>
                                                {user.status}
                                            </div>
                                        </div>

                                        <div className="user-list-mobile-card-row">
                                            <span className="user-list-mobile-label">Joined Date</span>
                                            <span className="user-list-mobile-value">{new Date(user.createdAt).toLocaleDateString()}</span>
                                        </div>

                                        <div className="user-list-mobile-card-row">
                                            <span className="user-list-mobile-label">Last Login</span>
                                            <span className="user-list-mobile-value">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</span>
                                        </div>

                                        <div className="user-list-mobile-card-row" style={{ marginTop: '8px' }}>
                                            <div className="user-list-action-btns">
                                                <button className="user-list-action-btn" title="View" onClick={() => handleViewClick(user)}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                                </button>
                                                <button className="user-list-action-btn" title="Edit" onClick={() => handleEditClick(user)}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                                </button>
                                                <button className="user-list-action-btn" title="Delete" onClick={() => handleDeleteClick(user)}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && filteredUsers.length > 0 && (
                            <div className="user-list-pagination">
                                <span className="user-list-page-info">Showing 1 to {filteredUsers.length} of {filteredUsers.length} users</span>
                                <div className="user-list-page-controls">
                                    <button className="user-list-page-btn">Previous</button>
                                    <button className="user-list-page-btn active">1</button>
                                    <button className="user-list-page-btn">Next</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>

            {/* Modals for Functional Mocking */}
            {showDeleteModal && (
                <div className="user-list-dialog-overlay">
                    <div className="user-list-dialog">
                        <h3 className="user-list-dialog-title">Delete User</h3>
                        <p className="user-list-dialog-body">Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.</p>
                        <div className="user-list-dialog-actions">
                            <button className="user-list-btn-cancel" onClick={closeModals}>Cancel</button>
                            <button className="user-list-btn-primary" style={{ background: '#EF4444' }} onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {showAddModal && (
                <div className="user-list-dialog-overlay">
                    <div className="user-list-dialog">
                        <h3 className="user-list-dialog-title">Add User</h3>
                        <p className="user-list-dialog-body">Add a new user form would go here.</p>
                        <div className="user-list-dialog-actions">
                            <button className="user-list-btn-cancel" onClick={closeModals}>Cancel</button>
                            <button className="user-list-btn-primary" onClick={closeModals}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="user-list-dialog-overlay">
                    <div className="user-list-dialog">
                        <h3 className="user-list-dialog-title">Edit User</h3>
                        <p className="user-list-dialog-body">Edit form for {selectedUser?.name} would go here.</p>
                        <div className="user-list-dialog-actions">
                            <button className="user-list-btn-cancel" onClick={closeModals}>Cancel</button>
                            <button className="user-list-btn-primary" onClick={closeModals}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showViewModal && (
                <div className="user-list-dialog-overlay">
                    <div className="user-list-dialog">
                        <h3 className="user-list-dialog-title">View User</h3>
                        <p className="user-list-dialog-body">Viewing details for {selectedUser?.name}.</p>
                        <div className="user-list-dialog-actions">
                            <button className="user-list-btn-primary" onClick={closeModals}>Close</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UserListPage;
