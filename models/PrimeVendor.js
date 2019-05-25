const mongoose = require("mongoose");
const { Schema } = mongoose;
const generateRandomToken = require("../helpers/generateRandomToken");

const primeVendorSchema = new Schema({
  vendorId: {
    type: String,
    default: generateRandomToken(16)
  }
});

module.exports = mongoose.model("PrimeVendor", primeVendorSchema);
