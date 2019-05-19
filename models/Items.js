const mongoose = require("mongoose");
const generateToken = require("../helpers/generateRandomToken");
const { Schema } = mongoose;

const itemSchema = new Schema({
  price: {
    type: Number,
    required: true
  },
  qty: {
    type: Number,
    default: 0
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Vendor"
  },
  itemId: {
    type: String,
    default: generateToken(32)
  }
});

module.exports = mongoose.model("Item", itemSchema);
