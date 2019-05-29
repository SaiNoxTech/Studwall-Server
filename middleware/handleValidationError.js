const { validationResult } = require("express-validator/check");

module.exports = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
  const errorArray = errors.array();
  let errorString = errorArray[0].msg;
  const error = new Error(errorString);
  error.statusCode = 422;
  next(error);
}

else 
{
 next();
}
};