const keys = require("../config/keys");
const checksum = require("../config/checksum");
const Order = require("../models/Order");
const calculateTotal = require("../helpers/calculateTotal");

exports.postGenerateOrder = async (req, res, next) => {
  // VALIDATE USER INPUT
  try {
    const totalPrice = calculateTotal(req.items);

    // For adding money, using a query param of addMoney=True
    const vendorId = req.query.addMoney
      ? process.env.PRIME_VENDOR_ID
      : req.body.vendorId;

    if (!vendorId) {
      const error = new Error("No vendorId provided");
      error.statusCode = 403;
      return next(error);
    }
    // Student is making an order(not adding money) with a vendor.
    if (!req.query.addMoney) {
      // Check if the sender(i.e. Student) has enough balance for the order.
      if (req.user.balance < totalPrice) {
        // If insufficient balance.
        const error = new Error("Insufficient balance to make this order.");
        error.statusCode = 400;
        return next(error);
      }
      const order = new Order({
        totalPrice,
        sender: req.user.studentId,
        receiver: vendorId,
        items: req.body.items,
        STATUS: "TXN_SUCCESS"
      });
      // Update the student's balance.
      let newStudentBalance = req.user.balance;
      newStudentBalance -= totalPrice;
      await req.user.updateBalance(newStudentBalance);
      await order.save();
      return res.json({
        success: true,
        totalPrice,
        remainingBalance: newStudentBalance
      });
    } else {
      const order = new Order({
        totalPrice,
        sender: req.user.studentId,
        receiver: vendorId,
        items: req.body.items
      });
      const TXN_AMOUNT = String(totalPrice);

      const orderObj = {
        ORDER_ID: order.orderId,
        CUST_ID: order.sender,
        TXN_AMOUNT,
        MID: keys.MID,
        CHANNEL_ID: keys.CHANNEL_ID,
        WEBSITE: keys.WEBSITE,
        MOBILE_NO: req.user.phone,
        EMAIL: req.user.email,
        INDUSTRY_TYPE_ID: keys.INDUSTRY_TYPE_ID,
        CALLBACK_URL: keys.CALLBACK_URL
      };

      // Convert to array with keys
      const orderArr = [];
      for (name in orderObj) {
        orderArr[name] = orderObj[name];
      }
      checksum.genchecksum(
        orderArr,
        keys.PAYTM_MERCHANT_KEY,
        async (err, params) => {
          if (err) {
            return next(err);
          }
          orderObj.CHECKSUMHASH = params.CHECKSUMHASH;
          try {
            await order.save();
            res.json({
              success: true,
              orderObj
            });
          } catch (error) {
            next(error);
          }
        }
      );
    }
  } catch (error) {
    next(error);
  }
};
