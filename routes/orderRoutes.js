const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const isAuth = require("../middleware/isAuth");
const isStudent = require("../middleware/isStudent");
const validateOrderItems = require("../middleware/validateOrderItems");

// IMPLEMENT CSRF TOKEN!!!!

router.post(
  "/",
  isAuth,
  isStudent,
  validateOrderItems,
  orderController.postGenerateOrder
);

module.exports = router;
