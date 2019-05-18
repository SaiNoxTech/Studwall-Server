const mongoose = require("mongoose");
const generateToken = require("../helpers/generateToken");
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    transactionId: {
      type: String,
      default: generateToken(32)
    },
    status: {
      type: Boolean,
      default: false
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "Student"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
