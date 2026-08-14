const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in the environment variables!");
  }
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
