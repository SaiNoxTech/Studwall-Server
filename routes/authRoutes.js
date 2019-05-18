const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const ifUserExists = require("../middleware/ifUserExists");

const authController = require("../controllers/authController");

// Get current logged in user
router.get("/current", isAuth, authController.getCurrentUser);

// Registeration of Student only
router.post("/register", ifUserExists, authController.postRegister);

// Login(Vendor and Student)
router.post("/login", authController.postLogin);

module.exports = router;
