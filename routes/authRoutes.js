const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

const authController = require("../controllers/authController");

// Get current logged in user
router.get("/current", isAuth, authController.getCurrentUser);

module.exports = router;
