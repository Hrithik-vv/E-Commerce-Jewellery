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
  await connectDB();
  next();
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/newsletter", require("./routes/newsletterRoutes"));

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