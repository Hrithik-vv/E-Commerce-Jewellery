const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const createAdmin = require("./config/createAdmin");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));





const startServer = async () => {
  try {
    await connectDB();
    await createAdmin();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();