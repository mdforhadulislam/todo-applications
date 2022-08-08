const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Task is required"],
    },
    username: String,
    email: {
      type: String,
      trim: true,
      required: [true, "Task is required"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Task is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
