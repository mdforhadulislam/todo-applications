const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      trim: true,
      required: [true, "Task is required"],
    },
    done: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      required: [true, "Task is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
