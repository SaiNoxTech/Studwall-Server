const mongoose = require("mongoose");
const generateToken = require("../helpers/generateRandomToken");
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    price: {
      type: Number,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Vendor"
    },
    itemId: {
      type: String,
      default: generateToken(32)
    }
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("Item", itemSchema);
