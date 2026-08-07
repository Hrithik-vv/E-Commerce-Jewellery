const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateQuantity, removeFromCart, updateNotes } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All cart routes require authentication

router.get('/getcart', getCart);
router.post('/addcart', addToCart);
router.put('/updatecart', updateQuantity);
router.delete('/removecart/:productId', removeFromCart);
router.put('/notes', updateNotes);

module.exports = router;

