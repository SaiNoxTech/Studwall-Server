module.exports = (req, res, next) => {
  if (req.user.items.length >= 60) {
    const error = new Error("You can add max 60 items only.");
    error.statusCode = 403;
    next(error);
  } else {
    next();
  }
};
