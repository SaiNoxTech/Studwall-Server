const PrimeVendor = require("../models/PrimeVendor");
const Item = require("../models/Item");

exports.setPrimeVendor = async () => {
  try {
    // Create a PrimeVendor if it doesn't exists.
    let primeVendor = await PrimeVendor.findOne();
    if (!primeVendor) {
      primeVendor = new PrimeVendor();
      await primeVendor.save();
      console.log("PrimeVendor Created");
    }
    // Set the vendorId of PrimeVendor in env variable.
    process.env.PRIME_VENDOR_ID = primeVendor.vendorId;
  } catch (error) {
    throw error;
  }
};

exports.setSCoin = async () => {
  try {
    let sCoinItemId = "";
    const foundSCoin = await Item.findOne({ isSCoin: true });
    if (!foundSCoin) {
      const SCoin = new Item({
        price: 1,
        name: "S Coin",
        owner: process.env.PRIME_VENDOR_ID,
        isSCoin: true
      });
      sCoinItemId = SCoin.itemId;
      await SCoin.save();
      console.log("SCoin created");
    } else {
      sCoinItemId = foundSCoin.itemId;
    }
    process.env.SCOIN_ITEM_ID = sCoinItemId;
  } catch (error) {
    throw error;
  }
};
