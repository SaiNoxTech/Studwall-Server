const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/add-vendor", adminController.postAddVendor);

module.exports = router;
