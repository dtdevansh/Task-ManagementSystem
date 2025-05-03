const mongoose = require("mongoose");

taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 60,
      minLength: 3,
    },
    description: {
      type: String,
      lowercase: true,
      maxLength: 200,
      minLength: 5,
    },
    status: {
      type: String,
      enum: ["todo", "pending", "inprogress", "done", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "low",
      required: true,
    },
    duedate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
