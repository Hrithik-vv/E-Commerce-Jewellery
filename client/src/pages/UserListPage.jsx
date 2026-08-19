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

    const userStr = localStorage.getItem("user");
    const loggedInUser = userStr ? JSON.parse(userStr) : null;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/users?limit=1000');
            if (res.success && (res.data || res.users)) {
                const allUsers = res.data || res.users || [];
                // Exclude Admin users from the user list
                const nonAdminUsers = allUsers.filter(u => u.role !== 'Admin' && u.role !== 'admin');
                setUsers(nonAdminUsers);
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
        <div className="mb-4">
            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--admin-text-main)', margin: '0 0 8px 0' }}>User List</h1>
                    <p style={{ color: 'var(--admin-text-muted)', margin: 0, fontSize: '0.95rem' }}>Manage user accounts and their roles.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleAddClick}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                        <path d="M5 12h14"/><path d="M12 5v14"/>
                    </svg>
                    Add User
                </button>
            </div>

            {/* Filter & Search Section */}
            <div className="admin-card mb-4" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <input 
                    type="text" 
                    className="admin-input" 
                    style={{ flex: '1 1 300px' }}
                    placeholder="Search by name or email" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select 
                    className="admin-select"
                    style={{ flex: '0 1 150px' }}
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <select 
                    className="admin-select"
                    style={{ flex: '0 1 150px' }}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <button className="admin-btn admin-btn-outline" onClick={handleReset}>
                    Reset
                </button>
            </div>

            {/* Users Table */}
            <div className="admin-card admin-table-container mb-4">
                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>Loading users...</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined Date</th>
                                <th>Last Login</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(user => {
                                    const statusClass = user.status?.toLowerCase() === 'active' ? 'admin-badge-success' : 'admin-badge-danger';
                                    return (
                                        <tr key={user._id}>
                                            <td>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                                                    <img src={user.profileImage || `https://i.pravatar.cc/150?u=${user._id}`} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            </td>
                                            <td style={{ fontWeight: 500, color: 'var(--admin-text-main)' }}>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <span className={`admin-badge ${user.role === 'Admin' ? 'admin-badge-warning' : 'admin-badge-success'}`} style={{ opacity: 0.8 }}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`admin-badge ${statusClass}`}>
                                                    {user.status || 'Active'}
                                                </span>
                                            </td>
                                            <td>{new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                            <td>
                                                {user.lastLogin ? (
                                                    <span style={{ fontSize: '0.875rem' }}>{new Date(user.lastLogin).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                ) : 'N/A'}
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <div className="d-flex justify-content-center gap-2" style={{ justifyContent: 'flex-end' }}>
                                                    <button className="admin-btn admin-btn-outline" style={{ padding: '6px' }} title="View" onClick={() => handleViewClick(user)}>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                                    </button>
                                                    <button className="admin-btn admin-btn-outline" style={{ padding: '6px' }} title="Edit" onClick={() => handleEditClick(user)}>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                                    </button>
                                                    <button className="admin-btn admin-btn-danger" style={{ padding: '6px' }} title="Delete" onClick={() => handleDeleteClick(user)}>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="8">
                                        <div style={{ textAlign: 'center', padding: '40px' }}>
                                            <div style={{ color: 'var(--admin-text-light)', marginBottom: '16px' }}>
                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="9" cy="7" r="4"></circle>
                                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                                </svg>
                                            </div>
                                            <h3 style={{ fontSize: '1.125rem', color: 'var(--admin-text-main)', marginBottom: '8px' }}>No users found</h3>
                                            <p style={{ color: 'var(--admin-text-muted)' }}>No users match your current criteria.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
                
                {!loading && filteredUsers.length > 0 && (
                    <div style={{ padding: '16px', borderTop: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>Showing {filteredUsers.length} of {users.length} user(s)</span>
                    </div>
                )}
            </div>

            {/* Modals for Functional Mocking */}
            {/* Keeping simple styling for modals so they look good in the new system too. Using simple fixed absolute overlays. */}
            {showDeleteModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="admin-card" style={{ width: '400px', maxWidth: '90%' }}>
                        <h3 style={{ fontSize: '1.25rem', margin: '0 0 16px 0', color: 'var(--admin-text-main)' }}>Delete User</h3>
                        <p style={{ color: 'var(--admin-text-muted)', marginBottom: '24px' }}>Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.</p>
                        <div className="d-flex gap-3 justify-content-center" style={{ justifyContent: 'flex-end' }}>
                            <button className="admin-btn admin-btn-outline" onClick={closeModals}>Cancel</button>
                            <button className="admin-btn admin-btn-danger" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {showAddModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="admin-card" style={{ width: '400px', maxWidth: '90%' }}>
                        <h3 style={{ fontSize: '1.25rem', margin: '0 0 16px 0', color: 'var(--admin-text-main)' }}>Add User</h3>
                        <p style={{ color: 'var(--admin-text-muted)', marginBottom: '24px' }}>Add a new user form would go here.</p>
                        <div className="d-flex gap-3 justify-content-center" style={{ justifyContent: 'flex-end' }}>
                            <button className="admin-btn admin-btn-outline" onClick={closeModals}>Cancel</button>
                            <button className="admin-btn admin-btn-primary" onClick={closeModals}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="admin-card" style={{ width: '400px', maxWidth: '90%' }}>
                        <h3 style={{ fontSize: '1.25rem', margin: '0 0 16px 0', color: 'var(--admin-text-main)' }}>Edit User</h3>
                        <p style={{ color: 'var(--admin-text-muted)', marginBottom: '24px' }}>Edit form for {selectedUser?.name} would go here.</p>
                        <div className="d-flex gap-3 justify-content-center" style={{ justifyContent: 'flex-end' }}>
                            <button className="admin-btn admin-btn-outline" onClick={closeModals}>Cancel</button>
                            <button className="admin-btn admin-btn-primary" onClick={closeModals}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showViewModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="admin-card" style={{ width: '400px', maxWidth: '90%' }}>
                        <h3 style={{ fontSize: '1.25rem', margin: '0 0 16px 0', color: 'var(--admin-text-main)' }}>View User</h3>
                        <p style={{ color: 'var(--admin-text-muted)', marginBottom: '24px' }}>Viewing details for {selectedUser?.name}.</p>
                        <div className="d-flex gap-3 justify-content-center" style={{ justifyContent: 'flex-end' }}>
                            <button className="admin-btn admin-btn-primary" onClick={closeModals}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserListPage;
