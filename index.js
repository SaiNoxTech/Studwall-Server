const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const keys = require("./config/keys");
const app = express();
const PORT = process.env.PORT || 5000;

const PrimeVendor = require("./models/PrimeVendor");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");


app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/order", orderRoutes);
app.use("/admin", adminRoutes);

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode).json({
    error: true,
    message: error.message
  });
});

mongoose.connect(keys.DB_URI, async err => {
  if (err) {
    throw err;
  } else {
    console.log("DB Connected");
    try {
      // Create a PrimeVendor if it doesn't exists.
      let primeVendor = await PrimeVendor.findOne();
      if (!primeVendor) {
        primeVendor = new PrimeVendor();
        await primeVendor.save();
        console.log("PrimeVendor Created");
      }
      // Set the vendorId of PrimeVendor in env variable.
      process.env.PRIME_VENDOR_ID = primeVendor.vendorId;
      app.listen(PORT, () => {
        console.log("Server has connected");
      });
    } catch (error) {
      throw error;
    }
  }
});
