const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

const authController = require("../controllers/authController");

// Get current logged in user
router.get("/current", isAuth, authController.getCurrentUser);

// Registeration
router.post("/register", authController.postRegister);

module.exports = router;
