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

exports.postAddItem = async (req, res, next) => {
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
    })
    
  } catch (error) {
    next(error);
  }

};
