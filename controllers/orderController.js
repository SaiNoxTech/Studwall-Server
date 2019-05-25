const keys = require("../config/keys");
const checksum = require("../config/checksum");
const Order = require("../models/Order");
const calculateTotal = require("../helpers/calculateTotal");

exports.postGenerateOrder = async (req, res, next) => {
  // VALIDATE USER INPUT
  try {
    const totalPrice = calculateTotal(req.body.items);
    const vendorId = req.query.addMoney
      ? process.env.PRIME_VENDOR_ID
      : req.body.vendorId;
    const order = new Order({
      totalPrice,
      sender: req.user.studentId,
      receiver: vendorId,
      items: req.body.items
    });
    const TXN_AMOUNT = req.body.TXN_AMOUNT;

    console.log(order);

    const orderObj = {
      ORDER_ID: order.orderId,
      CUST_ID: order.sender,
      TXN_AMOUNT,
      CHANNEL_ID: keys.CHANNEL_ID,
      WEBSITE: keys.WEBSITE,
      MOBILE_NO: req.user.phone,
      EMAIL: req.user.email,
      INDUSTRY_TYPE_ID: keys.INDUSTRY_TYPE_ID,
      VEN_ID: order.receiver
    };

    checksum.genchecksum(
      orderObj,
      keys.PAYTM_MERCHANT_KEY,
      (err, checksumHash) => {
        if (err) {
          return next(err);
        }
        orderObj.CHECKSUMHASH = checksumHash;
        res.json({
          success: true,
          orderObj
        });
      }
    );
  } catch (error) {
    next(error);
  }
};
