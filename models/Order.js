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
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

orderSchema.virtual("senderDocument", {
  ref: "Student",
  localField: "sender",
  foreignField: "studentId",
  justOne: true
});
orderSchema.virtual("receiverDocument", {
  ref: "Vendor",
  localField: "receiver",
  foreignField: "vendorId",
  justOne: true
});

module.exports = mongoose.model("Order", orderSchema);
