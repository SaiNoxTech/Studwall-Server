module.exports = (req, res, next) => {
  if (!req.user) {
    const error = new Error("User not logged in.");
    return next(error);
  }
  if (req.user.userType === "Student") {
    next();
  } else {
    const error = new Error("Only student can add money");
    error.statusCode = 403;
    next(error);
  }
};
