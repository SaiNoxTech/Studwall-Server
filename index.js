const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: error.message
  });
});

app.listen(PORT, () => {
  console.log("Server has connected");
});
