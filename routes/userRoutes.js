const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");

router.get("/orders", isAuth, userController.getOrders);

module.exports = router;
