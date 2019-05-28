const express = require("express");
const router = express.Router();

const callBackController = require("../controllers/callBackController");

// Callback URL for paytm
router.post("/transaction", callBackController.postHandleTransaction);

module.exports = router;
