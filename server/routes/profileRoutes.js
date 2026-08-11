const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/AuthMiddleware');

// All profile routes must be protected so the user is logged in
router.use(protect);

router.route('/')
    .get(getUserProfile)
    .put(updateUserProfile);

router.route('/orders')
    .get(getMyOrders);

module.exports = router;
