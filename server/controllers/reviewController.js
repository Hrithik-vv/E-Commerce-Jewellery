const Review = require('../models/ReviewSchema');
const Product = require('../models/ProductSchema');

// @desc    Add a product review
// @route   POST /api/products/:id/reviews
// @access  Private
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'Rating and comment are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    if (comment.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Comment must be at least 5 characters' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check for existing review
    const existing = await Review.findOne({ user: req.user._id, product: productId });
    if (existing) {
      return res.status(409).json({ success: false, message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating: Number(rating),
      comment: comment.trim(),
      userName: req.user.name
    });

    res.status(201).json({ success: true, message: 'Review added successfully', review });
  } catch (error) {
    console.error('Add Review Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get reviews for a product
// @route   GET /api/products/:id/reviews
// @access  Public
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id })
      .sort({ createdAt: -1 })
      .populate('user', 'name profileImage');

    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => { ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1; });

    res.status(200).json({
      success: true,
      count: reviews.length,
      avgRating: parseFloat(avgRating),
      ratingCounts,
      reviews
    });
  } catch (error) {
    console.error('Get Reviews Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a review (Admin)
// @route   DELETE /api/products/reviews/:id
// @access  Private/Admin
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete Review Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { addReview, getProductReviews, deleteReview };
