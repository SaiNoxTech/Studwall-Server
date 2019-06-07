const mongoose = require("mongoose");
const generateToken = require("../helpers/generateRandomToken");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: true
    },
    STATUS: {
      type: String,
      default: "PENDING"
    },
    orderId: {
      type: String,
      default: generateToken(32),
      index: true
    },
    sender: {
      type: String,
      required: true,
      index: true
    },
    receiver: {
      type: String,
      required: true,
      index: true
    },
    TXNID: {
      type: String
    },
    BANKTXNID: {
      type: String
    },
    TXNDATE: {
      type: Date
    },
    items: [
      {
        _id: false,
        itemId: {
          type: String,
          required: true
        },
        qty: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
