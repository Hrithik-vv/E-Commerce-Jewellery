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

// Connect to database and create admin
connectDB()
  .then(() => createAdmin())
  .catch((err) => console.error("Database connection failed:", err));

// Start server locally if not in production
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless functions
module.exports = app;