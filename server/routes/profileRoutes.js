const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { getMyOrders } = require('../controllers/orderController');
const { getWishlist, toggleWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

// All profile routes must be protected so the user is logged in
router.use(protect);

router.route('/')
    .get(getUserProfile)
    .put(updateUserProfile);

router.route('/orders')
    .get(getMyOrders);

// Wishlist routes
router.get('/wishlist', getWishlist);
router.post('/wishlist/:productId', toggleWishlist);

module.exports = router;

