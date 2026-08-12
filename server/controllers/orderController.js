const Order = require('../models/OrderSchema');

// @desc    Get all orders (with pagination, search, and filters)
// @route   GET /api/orders/allorders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const { search, orderStatus, paymentStatus, page = 1, limit = 10 } = req.query;
    
    let query = {};

    // Search by Order ID or Customer Name
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      const searchConditions = [
        { 'shippingAddress.firstName': searchRegex },
        { 'shippingAddress.lastName': searchRegex },
        { contactEmail: searchRegex }
      ];

      // If search string is a valid MongoDB ObjectId, add it to the search conditions
      const mongoose = require('mongoose');
      if (mongoose.Types.ObjectId.isValid(search)) {
        searchConditions.push({ _id: search });
      }

      query.$or = searchConditions;
    }

    // Filter by Order Status
    if (orderStatus && orderStatus !== 'All Status' && orderStatus !== 'All' && orderStatus !== '') {
      query.orderStatus = orderStatus;
    }

    // Filter by Payment Status
    if (paymentStatus && paymentStatus !== 'All' && paymentStatus !== '') {
      query.paymentStatus = paymentStatus;
    }

    // Pagination
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .populate('user', 'name email');

    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / limitNumber);

    res.status(200).json({ 
      success: true, 
      count: orders.length,
      totalOrders,
      totalPages,
      currentPage: pageNumber,
      orders 
    });
  } catch (error) {
    console.error('Error in getAllOrders:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/getorder/:id
// @access  Private/Admin
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Error in getOrderById:', error);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/updatestatus/:id
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status provided' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // UI requirement: Orders with Delivered or Cancelled status cannot be updated further.
    if (order.orderStatus === 'Delivered' || order.orderStatus === 'Cancelled') {
        return res.status(400).json({ success: false, message: `Cannot update a ${order.orderStatus} order` });
    }

    order.orderStatus = status;

    // Update tracking dates
    if (!order.tracking) {
        order.tracking = { orderedAt: order.createdAt || Date.now() };
    }
    
    if (status === 'Processing') order.tracking.processedAt = Date.now();
    else if (status === 'Shipped') order.tracking.shippedAt = Date.now();
    else if (status === 'Out for Delivery') order.tracking.outForDeliveryAt = Date.now();
    else if (status === 'Delivered') order.tracking.deliveredAt = Date.now();
    else if (status === 'Cancelled') order.tracking.cancelledAt = Date.now();

    await order.save();

    res.status(200).json({ success: true, message: `Order status updated to ${status}`, order });
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/profile/orders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Error in getMyOrders:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getMyOrders
};
