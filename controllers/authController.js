exports.getCurrentUser = (req, res, next) => {
  if (!req.user) {
    const error = new Error("An error occurred");
    return next(error);
  }
  res.json(req.user);
};
