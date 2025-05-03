const mongoose = require("mongoose");
const { trim } = require("validator");

const logSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    actions: {
      type: String,
      required: true,
      trim: true,
      maxlenggth: 50,
      minLength: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Logs", logSchema);
