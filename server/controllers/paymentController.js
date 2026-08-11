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

    // 1. Verify the signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      
      // 2. Save order to DB
      const newOrder = new Order({
        user: user || null,
        contactEmail,
        shippingAddress,
        billingAddress,
        orderItems,
        pricing,
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
        const purchasedProductIds = orderItems.map(item => item.product);
        
        await Cart.findOneAndUpdate(
          { user: user },
          { $pull: { items: { product: { $in: purchasedProductIds } } } }
        );
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
