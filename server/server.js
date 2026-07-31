const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./config/db");

connectDB();




const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});