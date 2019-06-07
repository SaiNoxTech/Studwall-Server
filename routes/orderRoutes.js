const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const isAuth = require("../middleware/isAuth");
const {isStudent} = require("../middleware/typeOfUser");
const validateOrderItems = require("../middleware/validateOrderItems");
const handleValidationError = require("../middleware/handleValidationError");
const {body} = require("express-validator/check");
// IMPLEMENT CSRF TOKEN!!!!

router.post(
  "/",
  isAuth,
  isStudent, [
    body("items")
      .isArray()
      .isLength({min : 1})
      .withMessage("min 1 item")
     
  ],
  validateOrderItems,
  orderController.postGenerateOrder
);
//validateorderitems
module.exports = router;
