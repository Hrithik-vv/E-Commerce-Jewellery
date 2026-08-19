const express = require('express');
const router = express.Router();
const { addReview, getProductReviews, deleteReview } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');

// GET /api/products/:id/reviews
router.get('/:id/reviews', getProductReviews);

// POST /api/products/:id/reviews (authenticated users)
router.post('/:id/reviews', protect, addReview);

// DELETE /api/products/reviews/:id (admin only)
router.delete('/reviews/:id', protect, authorize('Admin'), deleteReview);

module.exports = router;
