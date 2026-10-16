import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true, // Removes accidental extra spaces
    },
    age: {
      type: Number,
      required: [true, "Please provide an age"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true, // Prevents duplicate employee emails
      lowercase: true, // Saves email as lowercase (e.g., TEST@xyz.com -> test@xyz.com)
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Please provide a position"],
      trim: true,
    },
    salary: {
      type: Number,
      required: [true, "Please provide a salary"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);