const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/OrderSchema');
const Cart = require('../models/CartSchema');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Public (or Private depending on your auth)
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    const options = {
      amount: amount * 100, // Razorpay amount is in paise
      currency,
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1, // Auto capture
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error in createOrder:', error);
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
};

// @desc    Verify Payment and Save Order
// @route   POST /api/payment/verify-payment
// @access  Public (or Private depending on your auth)
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      contactEmail,
      shippingAddress,
      billingAddress,
      orderItems,
      pricing,
      user
    } = req.body;

    // Check for duplicate order verification
    const existingOrder = await Order.findOne({ 'paymentDetails.razorpay_order_id': razorpay_order_id });
    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: 'Order already verified',
        order: existingOrder
      });
    }

    // 1. Verify the signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      const mongoose = require('mongoose');

      const sanitizeAddr = (addr) => ({
        country: addr?.country || '',
        firstName: addr?.firstName || '',
        lastName: addr?.lastName || '',
        address: addr?.address || '',
        city: addr?.city || '',
        state: addr?.state || '',
        pinCode: addr?.pinCode || '',
        phone: addr?.phone || ''
      });

      const sanitizedOrderItems = (orderItems || []).map(item => ({
        product: mongoose.Types.ObjectId.isValid(item.product) ? item.product : undefined,
        name: item.name || 'Jewellery Item',
        quantity: item.quantity || 1,
        price: item.price || 0,
        image: item.image || ''
      }));

      // 2. Save order to DB
      const newOrder = new Order({
        user: user || null,
        contactEmail: contactEmail || 'customer@example.com',
        shippingAddress: sanitizeAddr(shippingAddress),
        billingAddress: sanitizeAddr(billingAddress),
        orderItems: sanitizedOrderItems,
        pricing: {
          subtotal: pricing?.subtotal || 0,
          shipping: pricing?.shipping || 0,
          tax: pricing?.tax || 0,
          discount: pricing?.discount || 0,
          total: pricing?.total || 0
        },
        paymentDetails: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          payment_method: 'Razorpay'
        },
        paymentStatus: 'Paid',
      });

      await newOrder.save();

      // Clear only the purchased items from the user's cart after successful checkout
      if (user && orderItems && orderItems.length > 0) {
        const purchasedProductIds = orderItems.map(item => item.product).filter(Boolean);
        
        if (purchasedProductIds.length > 0) {
          await Cart.findOneAndUpdate(
            { user: user },
            { $pull: { items: { product: { $in: purchasedProductIds } } } }
          );
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully and order saved',
        order: newOrder
      });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid signature sent!' });
    }
  } catch (error) {
    console.error('Error in verifyPayment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};
