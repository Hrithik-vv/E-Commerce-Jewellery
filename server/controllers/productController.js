const Product = require('../models/ProductSchema');
const cloudinary = require('../config/cloudinary');

const addProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      category,
      price,
      compareAtPrice,
      stockQuantity,
      isBestSeller
    } = req.body;

    // Validate required fields
    if (!productName || !description || !category || !price || !stockQuantity) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate compare-at price (optional)
    if (
      compareAtPrice !== undefined &&
      compareAtPrice !== null &&
      compareAtPrice !== '' &&
      Number(compareAtPrice) <= Number(price)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Compare-at price must be greater than the selling price.'
      });
    }

    // Upload image to Cloudinary from memory buffer
    let productImage = '';
    if (req.file) {
      try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'ecommerce-jewellery/products'
        });

        productImage = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Image upload failed',
          error: uploadError.message
        });
      }
    }

    // Create the new product
    const newProduct = new Product({
      productName,
      description,
      category,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      productImage,
      stockQuantity: Number(stockQuantity),
      isBestSeller: isBestSeller === 'true' || isBestSeller === true
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product: savedProduct
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add product',
      error: error.message
    });
  }
};

// GET /api/products/allproducts
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }); // Fetch all, newest first
    
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// PUT /api/products/editproduct/:id
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productName,
      description,
      category,
      price,
      compareAtPrice,
      stockQuantity,
      isBestSeller
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Validate compare-at price if provided
    if (
      compareAtPrice !== undefined &&
      compareAtPrice !== null &&
      compareAtPrice !== '' &&
      Number(compareAtPrice) <= Number(price || product.price)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Compare-at price must be greater than the selling price.'
      });
    }

    // Handle new image upload if provided
    if (req.file) {
      try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'ecommerce-jewellery/products'
        });
        product.productImage = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Image upload failed',
          error: uploadError.message
        });
      }
    }

    // Update fields
    if (productName) product.productName = productName;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price) product.price = Number(price);
    
    if (compareAtPrice !== undefined && compareAtPrice !== null && compareAtPrice !== '') {
      product.compareAtPrice = Number(compareAtPrice);
    } else if (compareAtPrice === '') {
      product.compareAtPrice = undefined; // Allow clearing the compare price
    }
    
    if (stockQuantity !== undefined) product.stockQuantity = Number(stockQuantity);
    
    if (isBestSeller !== undefined) {
      product.isBestSeller = isBestSeller === 'true' || isBestSeller === true;
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  editProduct
};
