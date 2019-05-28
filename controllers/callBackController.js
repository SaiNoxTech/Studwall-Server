const { verifychecksum } = require("../config/checksum");
const keys = require("../config/keys");
exports.postHandleTransaction = (req, res, next) => {
  const responseBody = req.body;
  // verify checksum
  if (verifychecksum(responseBody, keys.PAYTM_MERCHANT_KEY)) {
    // Checksum is not tempered
    console.log("Verified Checksum");
    res.json(responseBody);
  } else {
    // Checksum is tempered
    console.log("Checksum not verified");
    const error = new Error("Checksum not verified");
    error.statusCode = 400;
    next(error);
  }
};
