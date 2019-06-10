const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");
const { isVendor } = require("../middleware/typeOfUser");
const isLimitExceeded = require("../middleware/isLimitExceeded");

router.get("/orders", isAuth, userController.getOrders);

router.post(
  "/item",
  isAuth,
  isVendor,
  isLimitExceeded,
  userController.postAddItem
);

module.exports = router;
