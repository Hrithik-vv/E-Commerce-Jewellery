const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');

// Route to create a new Razorpay order
router.post('/create-order', createOrder);

// Route to verify the payment and save the order
router.post('/verify-payment', verifyPayment);

module.exports = router;
