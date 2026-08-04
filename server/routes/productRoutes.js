const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, editProduct } = require('../controllers/productController');
const upload = require('../middleware/ImageUploadMiddleware');

// POST /api/products/addproduct
// Add a new product (handles multipart/form-data for image upload)
router.post('/addproduct', upload.single('productImage'), addProduct);

// GET /api/products/allproducts
// Fetch all products
router.get('/allproducts', getAllProducts);

// PUT /api/products/editproduct/:id
// Edit an existing product (handles optional image upload)
router.put('/editproduct/:id', upload.single('productImage'), editProduct);

module.exports = router;
