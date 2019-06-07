function checkForUser(typeOfUser,req,next){
  if (!req.user) {
    const error = new Error("User not logged in.");
    return next(error);
  }
  if (req.user.userType === typeOfUser) {
    next();
  } else {
    const error = new Error("Only student can add money");
    error.statusCode = 403;
    next(error);
  }
}

exports.isStudent = (req, res, next) => {
  return checkForUser("Student", req,next);
};
exports.isVendor = (req, res, next) => {
  return checkForUser("Vendor", req, next);
};
