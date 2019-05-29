module.exports = {
  SECRET: process.env.SECRET,
  DB_URI: process.env.DB_URI,
  MID: process.env.PAYTM_MID,
  PAYTM_ENVIORMENT: "PROD",
  PAYTM_MERCHANT_KEY: process.env.PAYTM_MERCHANT_KEY,
  PAYTM_FINAL_URL: "https://securegw.paytm.in/theia/processTransaction",
  PAYTM_STATUS_URL: "https://securegw.paytm.in/order/status",
  CHANNEL_ID: process.env.CHANNEL_ID,
  INDUSTRY_TYPE_ID: process.env.INDUSTRY_TYPE_ID,
  WEBSITE: process.env.WEBSITE,
  CALLBACK_URL: process.env.CALLBACK_URL
};
