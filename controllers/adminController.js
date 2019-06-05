const Vendor = require("../models/Vendor");
const bcrypt = require("bcrypt-nodejs");

const generateRandomToken = require("../helpers/generateRandomToken");

exports.postAddVendor = async (req, res, next) => {
  // Validate req.body
  try {
    const vendorObj = {
      name: req.body.name,
      email: req.body.email,
      password: generateRandomToken(6),
      phone: req.body.phone
    };
    const foundVendor = await Vendor.findOne({
      $or: [{ email: vendorObj.email }, { phone: vendorObj.phone }]
    });
    if (foundVendor) {
      const error = new Error(
        "Vendor with the given email/phone already exists"
      );
      error.statusCode = 403;
      return next(error);
    }
    bcrypt.genSalt(12, async (err, salt) => {
      if (err) {
        throw err;
      }
      bcrypt.hash(vendorObj.password, salt, null, async (err, hash) => {
        if (err) {
          throw err;
        }
        vendorObj.password = hash;
        const newVendor = new Vendor(vendorObj);
        await newVendor.save();
        // Send mail to the vendor with the created password
        res.json({
          success: true,
          password: vendorObj.password
        });
      });
    });
  } catch (error) {
    next(error);
  }
};
