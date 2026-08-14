const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const createAdmin = require("./config/createAdmin");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure DB connection for all API routes (Serverless Best Practice)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Database connection failed", error: err.message });
  }
});

// Function to mount routes on a specific base path
const mountRoutes = (basePath) => {
  app.use(`${basePath}/auth`, require("./routes/authRoutes"));
  app.use(`${basePath}/users`, require("./routes/userRoutes"));
  app.use(`${basePath}/products`, require("./routes/productRoutes"));
  app.use(`${basePath}/cart`, require("./routes/cartRoutes"));
  app.use(`${basePath}/payment`, require("./routes/paymentRoutes"));
  app.use(`${basePath}/orders`, require("./routes/orderRoutes"));
  app.use(`${basePath}/profile`, require("./routes/profileRoutes"));
  app.use(`${basePath}/dashboard`, require("./routes/dashboardRoutes"));
  app.use(`${basePath}/newsletter`, require("./routes/newsletterRoutes"));
};

// Mount routes for both environments (Vercel strips /api in some configurations)
mountRoutes("/api");
mountRoutes("");

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Create admin user once DB is connected (in background)
connectDB().then(() => createAdmin()).catch(() => {});

// Start server locally if not in production
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless functions
module.exports = app;