const mongoose = require("mongoose");
const generateToken = require("../helpers/generateToken");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    price: {
      type: Number,
      required: true
    },
    qty: {
      type: Number,
      default: 1
    },
    status: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: String,
      default: generateToken(32)
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "Student"
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor"
    },
    transactionId: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
