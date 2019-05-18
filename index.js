const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const keys = require("./config/keys");
const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode).json({
    error: true,
    message: error.message
  });
});

mongoose.connect(keys.DB_URI, err => {
  if (err) {
    throw err;
  } else {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log("Server has connected");
    });
  }
});
