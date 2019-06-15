const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");
const { isVendor, isItemOwner } = require("../middleware/userMiddlewares");
const isLimitExceeded = require("../middleware/isLimitExceeded");

router.get("/orders", isAuth, userController.getOrders);

router.post(
  "/item",
  isAuth,
  isVendor,
  isLimitExceeded,
  userController.postItem
);
router.patch("/item", isAuth, isVendor, isItemOwner, userController.patchItem);

module.exports = router;
