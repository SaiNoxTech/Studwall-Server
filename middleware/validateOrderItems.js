const Item = require("../models/Item");

module.exports = (req, res, next) => {
  // Validate all the items in req.body.items[] and populate them
  const promiseArr = [];
  let promise;
  req.body.items.map(item => {
    promise = Item.findOne({ itemId: item.id });
    promiseArr.push(promise);
  });
  Promise.all(promiseArr).then(resultItemsArr => {
    console.log(resultItemsArr);
    resultItemsArr.forEach(item => {
      // item is falsy thus id of an element in req.body.items[] does not exists.
      if (!item) {
        const error = new Error("One or more items does not exists!");
        error.statusCode = 404;
        next(error);
      } else {
        // Find the fetched(resultItemsArr) item's itemId in req.body.items[]
        const foundItem = req.body.items.find(bodyItem => {
          return bodyItem.id === item.itemId;
        });
        // Add the qty attribute from it to the item in resultItemsArr
        item.qty = foundItem.qty;
      }
    });
    // Put resultItemsArr in req.items.
    // It will contain an item with its price and qty.
    // To be used in calculateTotal helper.
    req.items = resultItemsArr;
    next();
  });
};
