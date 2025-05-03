const mongoose = require("mongoose");
const { trim } = require("validator");

roleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      default: "user",
      required: true,
      lowercase: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", roleSchema);
