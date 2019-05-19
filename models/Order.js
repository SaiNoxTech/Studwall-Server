const mongoose = require("mongoose");
const generateToken = require("../helpers/generateRandomToken");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: true
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
      type: Schema.Types.ObjectId,
      ref: "Student"
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "Vendor"
    },
    transactionId: {
      type: String,
      required: true
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
