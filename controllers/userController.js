const Order = require("../models/Order");

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
