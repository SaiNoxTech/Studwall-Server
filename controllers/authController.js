const Student = require("../models/Student");
const Vendor = require("../models/Vendor");
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

exports.postLogin = async (req, res, next) => {
  // Validate req.body
  try {
    const { email, password } = req.body;
    // select which model is to be used for login based on query string (userType)
    let model, userId;
    const { userType } = req.query;
    if (userType === "Vendor") {
      model = Vendor;
      userId = "vendorId";
    } else if (userType === "Student") {
      model = Student;
      userId = "studentId";
    } else {
      const error = new Error("Invalid userType");
      error.statusCode = 400;
      next(error);
    }
    const user = await model.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email/password");
      error.statusCode = 401;
      return next(error);
    }
    bcrypt.compare(password, user.password, async (err, isMatch) => {
      if (err) {
        const error = new Error("An error occurred");
        return next(error);
      }
      if (!isMatch) {
        const error = new Error("Invalid email/password");
        error.statusCode = 401;
        return next(error);
      }
      const token = await genToken({ userType, [userId]: user[userId] });
      res.json({ success: true, token });
    });
  } catch (error) {
    next(error);
  }
};
