const randToken = require("rand-token");

module.exports = function generateToken(size) {
  size = size || 16;
  return randToken.generate(size);
};