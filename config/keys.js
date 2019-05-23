let keys;

if (process.env.NODE_ENV === "production") {
  keys = require("./prod-keys");
} else {
  keys = require("./dev-keys");
}

module.exports = {
  ...keys,
  CHANNEL_ID: "WEB",
  INDUSTRY_TYPE_ID: "E-Commerce",
  WEBSITE: "studwall"
};
