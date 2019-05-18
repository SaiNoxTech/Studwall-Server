const Student = require("../models/Student");
const Vendor = require("../models/Vendor");
const { verifyToken } = require("../helpers/jwtToken");

module.exports = async (req, res, next) => {
  try {
    const payload = verifyToken(req.headers.authorization);
    if (payload.error) {
      return next(payload.errorMessage);
    }
    // Find which type of user
    let model;
    let toFindId;
    if (payload.userType === "Vendor") {
      model = Vendor;
      toFindId = "vendorId";
    } else if (payload.userType === "Student") {
      model = Student;
      toFindId = "studentId";
    } else {
      const error = new Error("Invalid user type");
      error.statusCode = 400;
      return next(error);
    }
    const user = await model.findOne({ [toFindId]: payload[toFindId] });
    if (!user) {
      const error = new Error("User with the authorization token not found");
      error.statusCode = 404;
      return next(error);
    }
    // set the current user(vendor/student) as req.user
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
