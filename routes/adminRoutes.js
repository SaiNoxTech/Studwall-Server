const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/add-vendor", adminController.postAddVendor);
router.post("/generatepass", adminController.postGenerateNewVendorPass);

module.exports = router;
