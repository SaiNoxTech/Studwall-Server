const Order = require("../models/Order");
const Vendor = require("../models/Vendor");
const PrimeVendor = require("../models/PrimeVendor");

const { verifychecksum } = require("../config/checksum");
const generateTXNMessage = require("../helpers/generateTXNMessage");
const fetch = require("node-fetch");
const keys = require("../config/keys");
exports.postHandleTransaction = async (req, res, next) => {
  const responseBody = req.body;
  // verify checksum
  if (verifychecksum(responseBody, keys.PAYTM_MERCHANT_KEY)) {
    // Checksum is not tempered
    console.log("Verified Checksum");
    // Reverify status with Transaction Status API
    try {
      const statusObj = await fetch(keys.PAYTM_STATUS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          MID: keys.MID,
          ORDERID: responseBody.ORDERID,
          CHECKSUMHASH: responseBody.CHECKSUMHASH
        })
      }).then(res => res.json());
      const { TXNID, BANKTXNID, TXNDATE, STATUS } = statusObj;

      // Update the order's details.
      const foundOrder = await Order.findOne({
        orderId: statusObj.ORDERID
      });
      if (!foundOrder) {
        const error = new Error("Order not found!");
        error.statusCode = 500;
        return next(error);
      }
      foundOrder.TXNID = TXNID;
      foundOrder.BANKTXNID = BANKTXNID;
      foundOrder.TXNDATE = new Date(TXNDATE);
      foundOrder.STATUS = STATUS;
      await foundOrder.save();

      const txnResultObj = generateTXNMessage(statusObj);
      if (txnResultObj.error) {
        return res.json(txnResultObj);
      }

      // Save order with the vendor's order list. Only if txnResultObj.success = true
      // Check whether the vendor is Prime Vendor.
      const isPrimeVendor = await PrimeVendor.findOne({
        vendorId: foundOrder.receiver
      });
      if (!isPrimeVendor) {
        // If not Prime Vendor then update the order list of the vendor.
        const foundVendor = await Vendor.findOne({
          vendorId: foundOrder.receiver
        });
        if (!foundVendor) {
          const error = new Error(
            "Vendor with the provided vendorId not found."
          );
          error.statusCode = 404;
          return next(error);
        }
        foundVendor.orders.push(statusObj.ORDERID);
        await foundVendor.save();
      }

      // Send response to client based on RESPCODE
      res.json(txnResultObj);
    } catch (error) {
      next(error);
    }
  } else {
    // Checksum is tempered
    console.log("Checksum not verified");
    const error = new Error("Checksum not verified");
    error.statusCode = 400;
    next(error);
  }
};
