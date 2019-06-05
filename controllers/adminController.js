const Vendor = require("../models/Vendor");
const bcrypt = require("bcrypt-nodejs");

const generateRandomToken = require("../helpers/generateRandomToken");

exports.postAddVendor = async (req, res, next) => {
  // Validate req.body
  try {
    const generatedPassword = generateRandomToken(6);
    const vendorObj = {
      name: req.body.name,
      email: req.body.email,
      password: generatedPassword,
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
          password: generatedPassword
        });
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.postGenerateNewVendorPass = async (req, res, next) => {
  try {
    const vendorObj = {};
    if (req.body.email) {
      vendorObj.email = req.body.email;
    }
    if (req.body.phone) {
      vendorObj.phone = req.body.phone;
    }

    // Find a vendor based on provided email and password.
    const foundVendor = await Vendor.findOne({
      $or: [{ email: vendorObj.email }, { phone: vendorObj.phone }]
    });
    if (!foundVendor) {
      const error = new Error("No vendor found with given credentials.");
      error.statusCode = 404;
      return next(error);
    }
    // Generate new password
    const generatedPassword = generateRandomToken(6);
    bcrypt.genSalt(12, async (err, salt) => {
      if (err) {
        throw err;
      }
      bcrypt.hash(generatedPassword, salt, null, async (err, hash) => {
        if (err) {
          throw err;
        }
        foundVendor.password = hash;
        await foundVendor.save();
        // Send mail to the vendor with the created password
        res.json({
          success: true,
          password: generatedPassword
        });
      });
    });
  } catch (error) {
    next(error);
  }
};
