const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/signup', authLimiter, authController.signup);
router.post('/signin', authLimiter, authController.signin);
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/verify-otp', authLimiter, authController.verifyOTP);
router.post('/reset-password', authLimiter, authController.resetPassword);

module.exports = router;
