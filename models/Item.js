const mongoose = require("mongoose");
const generateToken = require("../helpers/generateRandomToken");
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    price: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },
    itemId: {
      type: String,
      default: generateToken(32),
      index: true
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    strict: false
  }
);

itemSchema.virtual("ownerDocument", {
  ref: "Vendor",
  localField: "owner",
  foreignField: "vendorId",
  justOne: true
});
module.exports = mongoose.model("Item", itemSchema);
