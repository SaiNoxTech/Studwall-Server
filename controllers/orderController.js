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
      CHANNEL_ID: keys.CHANNEL_ID,
      WEBSITE: keys.WEBSITE,
      MOBILE_NO: req.user.phone,
      EMAIL: req.user.email,
      INDUSTRY_TYPE_ID: keys.INDUSTRY_TYPE_ID,
      VEN_ID: order.receiver,
      PAYTM_MERCHANT_KEY: keys.PAYTM_MERCHANT_KEY
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
  } catch (error) {
    next(error);
  }
};
