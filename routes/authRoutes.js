const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const ifUserExists = require("../middleware/ifUserExists");
const handleValidationError = require("../middleware/handleValidationError");

const {body} = require("express-validator/check");
const authController = require("../controllers/authController");

// Get current logged in user
router.get("/current", isAuth, authController.getCurrentUser);

// Registeration of Student only
router.post("/register" ,[
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and atleast 5 characters." // default error message for all validators
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim() ,
    body("phone")
    .isString()
    .isLength({min : 10})
    .isNumeric()
    .withMessage("Please enter a valid phone number") ,
    body("usn")
    .isString()
    .isLength({min : 3})
    .withMessage("Please enter a valid university roll number"),
    body("name")
    .isString()
    .isLength({min : 3})
    .withMessage("Please enter a valid name")
  ],handleValidationError, ifUserExists, authController.postRegister);


// Login(Vendor and Student)
router.post(
    "/login",
    [
      body("email")
        .isEmail()
        .withMessage("Enter a valid email")
        .normalizeEmail(),
      body(
        "password",
        "Please enter a password with only numbers and text and atleast 5 characters."
      )
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim()
    ],
    handleValidationError,authController.postLogin
  );

  
  
module.exports = router;
