const User = require('../models/UserSchema');

// @desc    Get user wishlist
// @route   GET /api/profile/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist', 'productName price productImage category compareAtPrice stockQuantity isBestSeller');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, wishlist: user.wishlist || [] });
  } catch (error) {
    console.error('Get Wishlist Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Toggle product in wishlist (add/remove)
// @route   POST /api/profile/wishlist/:productId
// @access  Private
const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isInWishlist = user.wishlist.includes(productId);

    if (isInWishlist) {
      user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      inWishlist: !isInWishlist,
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error('Toggle Wishlist Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getWishlist, toggleWishlist };
