const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");
const { isVendor, isItemOwner, isStudent } = require("../middleware/userMiddlewares");
const isLimitExceeded = require("../middleware/isLimitExceeded");


// For user's orders
router.get("/orders", isAuth, userController.getOrders);


// For Vendor
router.post(
  "/item",
  isAuth,
  isVendor,
  isLimitExceeded,
  userController.postItem
);
router.patch("/item", isAuth, isVendor, isItemOwner, userController.patchItem);

// For referral
router.get("/referral", isAuth, isStudent, userController.getReferral)

module.exports = router;
