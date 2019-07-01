const mongoose = require("mongoose");
const generateToken = require("../helpers/generateRandomToken");
const { Schema } = mongoose;

const vendorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    vendorId: {
      type: String,
      index: true,
      default: "V-"+generateToken(8)
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    items: [
      {
        _id: false,
        type: String,
        ref: "Item"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Vendor", vendorSchema);
