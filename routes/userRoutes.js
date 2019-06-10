const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");
const { isVendor } = require("../middleware/typeOfUser");

router.get("/orders", isAuth, userController.getOrders);

router.post("/item", isAuth, isVendor, userController.postAddItem);

module.exports = router;
