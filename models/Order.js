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
      default: generateToken(64)
    },
    sender: {
      type: String,
      required: true
    },
    receiver: {
      type: String,
      required: true
    },
    transactionId: {
      type: String
    },
    items: [
      {
        id: {
          type: String,
          ref: "Item"
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
