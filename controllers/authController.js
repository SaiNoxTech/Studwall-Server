const Student = require("../models/Student");
const { genToken } = require("../helpers/jwtToken");
const bcrypt = require("bcrypt-nodejs");

exports.getCurrentUser = (req, res, next) => {
  if (!req.user) {
    const error = new Error("An error occurred");
    return next(error);
  }
  res.json(req.user);
};

exports.postRegister = async (req, res, next) => {
  // Validate req.body first!

  // Extracting
  const studentObj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    usn: req.body.usn
  };
  bcrypt.genSalt(12, async (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(studentObj.password, salt, null, async (err, hash) => {
      if (err) {
        return next(err);
      }
      studentObj.password = hash;
      try {
        const student = new Student(studentObj);
        await student.save();
        res.json({
          success: true
        });
      } catch (error) {
        next(error);
      }
    });
  });
};
