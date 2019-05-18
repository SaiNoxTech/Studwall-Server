const Student = require("../models/Student");

module.exports = async (req, res, next) => {
  try {
    const { email, phone, usn } = req.body;
    const user = await Student.find({ $or: [{ email }, { phone }, { usn }] });
    if (user) {
      const error = new Error("User with email/phone/usn already exists");
      error.statusCode = 400;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
