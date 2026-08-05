const Product = require('../models/ProductSchema');

// Helper function for reusable filtering, sorting, and pagination
const fetchProductsWithFilters = async (baseQuery, queryParams) => {
  const { page = 1, limit = 24, sort, minPrice, maxPrice } = queryParams;

  // Build query
  const query = { ...baseQuery };

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Sort options
  let sortObj = { createdAt: -1 };
  if (sort === 'price-low-high') {
    sortObj = { price: 1 };
  } else if (sort === 'date-new-old') {
    sortObj = { createdAt: -1 };
  }

  // Pagination
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 24;
  const skip = (pageNumber - 1) * limitNumber;

  const products = await Product.find(query)
    .sort(sortObj)
    .skip(skip)
    .limit(limitNumber);

  const totalCount = await Product.countDocuments(query);

  // Calculate highest price among the base set to help the frontend set max slider bounds
  const highestPriceProduct = await Product.findOne(baseQuery).sort({ price: -1 });
  const highestPrice = highestPriceProduct ? highestPriceProduct.price : 0;

  return {
    success: true,
    count: products.length,
    totalCount,
    highestPrice,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalCount / limitNumber) || 1,
    products
  };
};

module.exports = {
  fetchProductsWithFilters
};
