import mongoose from "mongoose";
export const connectDB = async () => {
  try {
 await mongoose.connect(process.env.MONGO_URI); 
  console.error("mongodb connected successfully");}
  catch (error) {
    console.error(error.message);
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};