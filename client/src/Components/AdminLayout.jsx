import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import '../css/AdminDashboard.css';

const AdminLayout = ({ children }) => {
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

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', display: 'flex', flexDirection: 'column' }}>
            <AdminNavbar />
            <main style={{ padding: '32px 80px', width: '100%', boxSizing: 'border-box', flex: 1 }}>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
