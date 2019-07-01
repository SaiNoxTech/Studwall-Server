const mongoose = require("mongoose");
const { Schema } = mongoose;
const generateRandomToken = require("../helpers/generateRandomToken");

const primeVendorSchema = new Schema({
  vendorId: {
    type: String,
    default: "PV-"+generateRandomToken(8)
  }
});

module.exports = mongoose.model("PrimeVendor", primeVendorSchema);
