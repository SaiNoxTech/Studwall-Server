const PrimeVendor = require("../models/PrimeVendor");

module.exports = async (req, res, next) => {
  // Find if logged in user is Prime Vendor
  try {
    const primeVendor = await PrimeVendor.findOne({
      vendorId: req.user.vendorId
    });
    if (!primeVendor) {
      const error = new Error("Unauthorized");
      error.statusCode = 403;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
