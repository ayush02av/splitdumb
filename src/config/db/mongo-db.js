import mongoose from "mongoose";

const mongoDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/splitdumb");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default mongoDB;