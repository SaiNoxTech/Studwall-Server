const Order = require("../models/Order");
const Item = require("../models/Item");

exports.getOrders = async (req, res, next) => {
  try {
    // Check if the logged in user is student or vendor
    let toFindField, userField;
    if (req.user.userType === "Student") {
      // User is a student
      toFindField = "sender";
      userField = "studentId";
    } else if (req.user.userType === "Vendor") {
      // User is a vendor
      toFindField = "receiver";
      userField = "vendorId";
    }
    const ORDERS_PER_PAGE = 20;
    const PAGENO = +req.query.page || 1;
    // Find all orders(upto ordersPerRequest skipping pageNo*ordersPerRequest orders)
    const orders = await Order.find({
      [toFindField]: req.user[userField]
    })
      .sort({ updatedAt: -1 })
      .skip((PAGENO - 1) * ORDERS_PER_PAGE)
      .limit(ORDERS_PER_PAGE);
    res.json({
      success: true,
      orders
    });
  } catch (error) {
    next(error);
  }
};

exports.postItem = async (req, res, next) => {
  // validate req.body
  // Check value of price(should be non zero)
  // Limit length of name
  try {
    const itemObj = {
      price: Number(req.body.price),
      name: req.body.name,
      owner: req.user.vendorId
    };
    // Create a new Item and save it
    const newItem = new Item(itemObj);
    await newItem.save();
    // Push the itemId into vendor's items list.
    req.user.items.push(newItem.itemId);
    await req.user.save();
    res.status(201).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

exports.patchItem = async (req, res, next) => {
  // Validate incoming item!!
  try {
    const updatedItemObj = {};
    if (req.body.item.price) {
      updatedItemObj.price = Number(req.body.item.price);
    }
    if (req.body.item.isAvailable) {
      if (req.body.item.isAvailable.toLowerCase() === "true") {
        updatedItemObj.isAvailable = true;
      } else if (req.body.item.isAvailable.toLowerCase() === "false") {
        updatedItemObj.isAvailable = false;
      }
    }
    if (req.body.item.name) {
      updatedItemObj.name = String(req.body.item.name);
    }
    const foundItem = await Item.findOne({ itemId: req.body.item.itemId });
    if (!foundItem) {
      const error = new Error("Invalid itemId");
      error.statusCode = 404;
      return next(error);
    }
    Object.entries(updatedItemObj).forEach(([key, val]) => {
      foundItem[key] = val;
    });
    await foundItem.save();
    res.json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};
