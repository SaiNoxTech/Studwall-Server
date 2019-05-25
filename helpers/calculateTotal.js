module.exports = items => {
  // calculate the totalPrice of the items in items[]
  let total = 0;
  items.forEach(item => {
    total = total + item.price * item.qty;
  });
  return total;
};
