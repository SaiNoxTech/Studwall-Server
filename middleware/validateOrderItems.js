const Item = require("../models/Item");

module.exports = async (req, res, next) => {
  // Validate all the items in req.body.items[] and populate them
  const promiseArr = [];
  let promise;
  req.body.items.map(item => {
    promise = Item.findOne({ itemId: item.itemId });
    promiseArr.push(promise);
  });
  try {
    // Handle the case for adding money
    // If addMoney=True then check if the item id matched id of SCoin
    if (req.query.addMoney) {
      const [item] = await Promise.all(promiseArr);
      if (item.itemId != process.env.SCOIN_ITEM_ID) {
        const error = new Error("Invalid item id for SCoin");
        error.statusCode = 404;
        next(error);
      }
    }
    const resultItemsArr = await Promise.all(promiseArr);
    for (let i = 0; i < resultItemsArr.length; i++) {
      let item = resultItemsArr[i];
      // item is falsy thus id of an element in req.body.items[] does not exists.
      if (!item) {
        const error = new Error("One or more items does not exists!");
        error.statusCode = 404;
        return next(error);
      } else if (!item.isAvailable) {
        // If an item is currently unavailable , stop the order
        const error = new Error("One or more item is currently not available!");
        error.statusCode = 403;
        return next(error);
      } else {
        // Find the fetched(resultItemsArr) item's itemId in req.body.items[]
        const foundItem = req.body.items.find(bodyItem => {
          return bodyItem.itemId === item.itemId;
        });
        // Add the qty attribute from it to the item in resultItemsArr
        item.qty = foundItem.qty;
      }
    }

    // Put resultItemsArr in req.items.
    // It will contain an item with its price and qty.
    // To be used in calculateTotal helper.
    req.items = resultItemsArr;
    next();
  } catch (error) {
    next(error);
  }
};
