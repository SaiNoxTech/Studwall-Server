module.exports = {
  SECRET: process.env.SECRET,
  DB_URI: process.env.DB_URI,
  MID: process.env.PAYTM_MID,
  PAYTM_ENVIORMENT: "PROD",
  PAYTM_MERCHANT_KEY: process.env.PAYTM_MERCHANT_KEY,
  PAYTM_FINAL_URL: "https://securegw.paytm.in/theia/processTransaction"
};
