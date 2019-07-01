const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IlN0dWRlbnQiLCJzdHVkZW50SWQiOiJIMnNvMGNweDh3SUMzNkVzIiwiaWF0IjoxNTYxOTg0MDk0fQ.hNkKv4T2gsl0kCGL0V_bmicbh6vta1StpFMPOxxWpLg";

fetch("/order?addMoney=True", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization: authToken
  },
  body: JSON.stringify({
    // items: [{ itemId: "kmcAjcrvqOycKLbvEzeTgrHw1PpVQ5uJ", qty: 4 }],
    // vendorId: "DPj5I6ryowFjxGLR"
    items: [{ itemId: "KBmXkIkoiqG6k90PXkhcwQ4PmlS9KlmM", qty: 80 }]
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
