const mongoose = require("mongoose");
const Cart = require("../models/CartSchema");
const Product = require("../models/ProductSchema");

// @desc    Get cart for current user
// @route   GET /api/cart/getcart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });

      await cart.populate("items.product");
    }

    // Optional: Calculate cart total
    const total = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    res.status(200).json({
      success: true,
      cart,
      total,
    });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/addcart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, specialInstructions } = req.body;

    const qty = Number(quantity);

    if (!productId || isNaN(qty) || qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid product or quantity",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check stock
    if (qty > product.stockQuantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stockQuantity} item(s) available in stock`,
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.equals(productId)
    );

    if (itemIndex > -1) {
      const newQty = cart.items[itemIndex].quantity + qty;

      if (newQty > product.stockQuantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stockQuantity} item(s) available in stock`,
        });
      }

      cart.items[itemIndex].quantity = newQty;
    } else {
      cart.items.push({
        product: productId,
        quantity: qty,
      });
    }

    if (specialInstructions !== undefined) {
      cart.specialInstructions = specialInstructions;
    }

    await cart.save();
    await cart.populate("items.product");

    const total = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
      total,
    });
  } catch (error) {
    console.error("Add To Cart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Update item quantity
// @route   PUT /api/cart/updatecart
// @access  Private
const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const qty = Number(quantity);

    if (!productId || isNaN(qty) || qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid product or quantity",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (qty > product.stockQuantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stockQuantity} item(s) available in stock`,
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.equals(productId)
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    cart.items[itemIndex].quantity = qty;

    await cart.save();
    await cart.populate("items.product");

    const total = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
      total,
    });
  } catch (error) {
    console.error("Update Quantity Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/removecart/:productId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const originalLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => !item.product.equals(productId)
    );

    if (originalLength === cart.items.length) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    await cart.save();
    await cart.populate("items.product");

    const total = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
      total,
    });
  } catch (error) {
    console.error("Remove From Cart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Update cart notes
// @route   PUT /api/cart/notes
// @access  Private
const updateNotes = async (req, res) => {
  try {
    const { specialInstructions } = req.body;

    if (
      specialInstructions &&
      specialInstructions.length > 500
    ) {
      return res.status(400).json({
        success: false,
        message: "Special instructions cannot exceed 500 characters",
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.specialInstructions = specialInstructions || "";

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart notes updated",
      cart,
    });
  } catch (error) {
    console.error("Update Notes Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  updateNotes,
};