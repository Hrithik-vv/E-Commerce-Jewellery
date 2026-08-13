import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import '../css/OrderListPage.css';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [paymentFilter, setPaymentFilter] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders/allorders');
      if (res.success) {
        setOrders(res.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(error.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.put(`/orders/updatestatus/${id}`, { orderStatus: newStatus });
      if (res.success) {
        toast.success(`Order status updated to ${newStatus}`);
        setOrders(orders.map(order => 
          order._id === id ? { ...order, orderStatus: newStatus } : order
        ));
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error(error.message || 'Failed to update order status');
    }
  };

  // Filter orders based on search, status and payment
  const displayedOrders = orders.filter(order => {
    const customerName = order.user ? order.user.name : (order.contactEmail || 'Guest');
    const matchesSearch = customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order._id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || order.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === 'All' || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <>
      <div className="order-list-main-container">
        
        <div className="order-list-page-header">
          <h1 className="order-list-page-title">Orders</h1>
          <p className="order-list-page-description">Manage, track, and update the status of customer orders.</p>
        </div>

        <div className="order-list-filter-container">
          <input 
            type="text" 
            className="order-list-search-input" 
            placeholder="Search by Order ID or Customer Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="order-list-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select 
            className="order-list-payment-filter"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="order-list-table-container">
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>Loading orders...</div>
          ) : (
            <table className="order-list-table">
              <thead>
                <tr className="order-list-table-header-row">
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Order Date</th>
                  <th>Total Amount</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedOrders.length > 0 ? (
                  displayedOrders.map(order => {
                    const customerName = order.user ? order.user.name : (order.contactEmail || 'Guest');
                    const amount = order.pricing?.total || 0;
                    const paymentStatusClass = order.paymentStatus === 'Paid' ? 'order-list-payment-paid' : 
                                              order.paymentStatus === 'Failed' ? 'order-list-payment-failed' : 'order-list-payment-pending';
                    
                    return (
                      <tr key={order._id} className="order-list-table-row">
                        <td className="order-list-col-id">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                        <td className="order-list-col-customer">{customerName}</td>
                        <td className="order-list-col-date">
                          {new Date(order.createdAt).toLocaleString('en-IN', { 
                            day: '2-digit', month: 'short', year: 'numeric', 
                            hour: '2-digit', minute: '2-digit' 
                          })}
                        </td>
                        <td className="order-list-col-amount">₹{amount.toLocaleString('en-IN')}</td>
                        <td>
                          <div className={`order-list-payment-badge ${paymentStatusClass}`}>
                            <span className="order-list-payment-dot"></span> {order.paymentStatus}
                          </div>
                        </td>
                        <td>
                          <select 
                            className="order-list-status-control" 
                            value={order.orderStatus}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <Link to={`/orders/${order._id}`} className="order-list-btn-action" title="View Order Details">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                      No orders found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {!loading && displayedOrders.length > 0 && (
          <div className="order-list-pagination-container">
            <div className="order-list-records-count">
              Showing {displayedOrders.length} order(s)
            </div>
          </div>
        )}
        
      </div>
    </>
  );
};

export default OrderListPage;
