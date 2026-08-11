const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  country: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  phone: { type: String, required: true },
});

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  image: { type: String },
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Optional for guest checkout
  },
  contactEmail: {
    type: String,
    required: true,
  },
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  orderItems: [orderItemSchema],
  pricing: {
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    tax: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
  },
  paymentDetails: {
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    razorpay_signature: { type: String },
    payment_method: { type: String, default: 'Razorpay' },
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  deliveryMethod: {
    type: String,
    enum: ['Standard', 'Express'],
    default: 'Standard',
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
