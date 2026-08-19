const express = require('express');
const router = express.Router();
const {
  addProduct, getAllProducts, editProduct, getProductById,
  getRelatedProducts, getBestSellers, getProductsByCategory,
  deleteProduct, getCategories, searchProducts
} = require('../controllers/productController');
const { addReview, getProductReviews, deleteReview } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/ImageUploadMiddleware');

// GET /api/products/search?q=...
router.get('/search', searchProducts);

// GET /api/products/allproducts
router.get('/allproducts', getAllProducts);

// GET /api/products/categories
router.get('/categories', getCategories);

// GET /api/products/getbestsellers
router.get('/getbestsellers', getBestSellers);

// GET /api/products/getproductsbycategory/:category
router.get('/getproductsbycategory/:category', getProductsByCategory);

// POST /api/products/addproduct
router.post('/addproduct', protect, authorize('Admin'), upload.single('productImage'), addProduct);

// PUT /api/products/editproduct/:id
router.put('/editproduct/:id', protect, authorize('Admin'), upload.single('productImage'), editProduct);

// DELETE /api/products/reviews/:id (admin)
router.delete('/reviews/:id', protect, authorize('Admin'), deleteReview);

// GET /api/products/getsingleproductdetails/:id
router.get('/getsingleproductdetails/:id', getProductById);

// GET /api/products/getrelatedproducts/:id
router.get('/getrelatedproducts/:id', getRelatedProducts);

// DELETE /api/products/deleteproduct/:id
router.delete('/deleteproduct/:id', protect, authorize('Admin'), deleteProduct);

// GET  /api/products/:id/reviews
// POST /api/products/:id/reviews
router.get('/:id/reviews', getProductReviews);
router.post('/:id/reviews', protect, addReview);

module.exports = router;
