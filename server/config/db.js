const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  if (!process.env.MONGODB_URL) {
    console.warn("MONGODB_URL is not defined in the environment variables!");
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;
