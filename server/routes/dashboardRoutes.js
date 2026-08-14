const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Dashboard routes are protected and require Admin role
router.use(protect);
router.use(authorize('Admin'));

router.route('/')
    .get(getDashboardStats);

module.exports = router;
