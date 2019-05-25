const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const keys = require("./config/keys");
const app = express();
const PORT = process.env.PORT || 5000;

const { setPrimeVendor, setSCoin } = require("./helpers/primeVendorSeed");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/order", orderRoutes);
app.use("/admin", adminRoutes);

app.use((error, req, res, next) => {
  if (typeof error === "string") {
    error = new Error(error);
  }
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode).json({
    error: true,
    message: error.message
  });
});
mongoose.set("useCreateIndex", true);
mongoose.connect(keys.DB_URI, { useNewUrlParser: true }, async err => {
  if (err) {
    throw err;
  } else {
    console.log("DB Connected");
    try {
      await setPrimeVendor();
      await setSCoin();
      app.listen(PORT, () => {
        console.log("Server has connected");
      });
    } catch (error) {
      throw error;
    }
  }
});
