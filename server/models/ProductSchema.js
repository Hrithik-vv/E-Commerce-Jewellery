const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product Name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Bangles', 'Jhumkas'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number']
  },
  compareAtPrice: {
    type: Number,
    min: [0, 'Compare-at price must be a positive number']
  },
  productImage: {
    type: String, // Will store the file path or URL
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Stock Quantity is required'],
    min: [0, 'Stock cannot be less than 0']
  },
  isBestSeller: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
