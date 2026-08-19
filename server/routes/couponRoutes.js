const express = require('express');
const router = express.Router();
const { applyCoupon, createCoupon, getAllCoupons, toggleCoupon, deleteCoupon } = require('../controllers/couponController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public
router.post('/apply', applyCoupon);

// Admin only
router.post('/', protect, authorize('Admin'), createCoupon);
router.get('/', protect, authorize('Admin'), getAllCoupons);
router.put('/:id/toggle', protect, authorize('Admin'), toggleCoupon);
router.delete('/:id', protect, authorize('Admin'), deleteCoupon);

module.exports = router;
