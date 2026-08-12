const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, editProduct, getProductById, getRelatedProducts, getBestSellers, getProductsByCategory, deleteProduct, getCategories } = require('../controllers/productController');
const upload = require('../middleware/ImageUploadMiddleware');

// POST /api/products/addproduct
// Add a new product (handles multipart/form-data for image upload)
router.post('/addproduct', upload.single('productImage'), addProduct);

// GET /api/products/allproducts
// Fetch all products
router.get('/allproducts', getAllProducts);

// GET /api/products/categories
// Fetch all categories with product counts
router.get('/categories', getCategories);

// PUT /api/products/editproduct/:id
// Edit an existing product (handles optional image upload)
router.put('/editproduct/:id', upload.single('productImage'), editProduct);

// GET /api/products/getsingleproductdetails/:id
// Fetch a single product by ID
router.get('/getsingleproductdetails/:id', getProductById);

// GET /api/products/getrelatedproducts/:id
// Fetch related products
router.get('/getrelatedproducts/:id', getRelatedProducts);

// GET /api/products/getbestsellers
// Fetch best sellers with pagination, sorting, and filtering
router.get('/getbestsellers', getBestSellers);

// GET /api/products/getproductsbycategory/:category
// Fetch products by category with pagination, sorting, and filtering
router.get('/getproductsbycategory/:category', getProductsByCategory);

// DELETE /api/products/deleteproduct/:id
// Delete a single product
router.delete('/deleteproduct/:id', deleteProduct);

module.exports = router;
