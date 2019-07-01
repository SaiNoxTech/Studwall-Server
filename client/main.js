const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IlN0dWRlbnQiLCJzdHVkZW50SWQiOiJTLWtrZlUwZ2Z1IiwiaWF0IjoxNTYxOTg2MTA3fQ.IAOXn6jdqrIoBYxaTDHxF7JI6xBm_W61s6urPANWqwQ";

fetch("/order?addMoney=True", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization: authToken
  },
  body: JSON.stringify({
    // items: [{ itemId: "I-2pPPawJD", qty: 4 }],
    // vendorId: "V-Gc595gaK"
    items: [{ itemId: "I-u1atrHb6", qty: 80 }]
  })
})
  .then(res => res.json())
  .then(res => {
    if (res.error) {
      return console.log(res);
    } else if (res.success && !res.orderObj) {
      return console.log(res);
    }
    const { orderObj } = res;
    let form = document.createElement("form");
    form.action = "https://securegw-stage.paytm.in/theia/processTransaction";
    form.method = "POST";
    Object.keys(orderObj).forEach(key => {
      const i = document.createElement("input");
      i.type = "hidden";
      i.name = key;
      i.value = orderObj[key];
      form.appendChild(i);
    });
    document.body.appendChild(form);
    form.submit();
  })
  .catch(console.log);
