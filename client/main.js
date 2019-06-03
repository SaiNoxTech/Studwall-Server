const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IlN0dWRlbnQiLCJzdHVkZW50SWQiOiJHNm9kV0NVRFJKR2J5YkY4IiwiaWF0IjoxNTU4ODA5NjYwfQ.e-12ZhH9g2I-YY4kb3otnQ48WgNc7EAvqU77FH2GP6k";

fetch("/order?addMoney=True", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization: authToken
  },
  body: JSON.stringify({
    items: [{ itemId: "MFnHLXc3uLahEmdf79K5nY55TeXV6mpn", qty: 5 }]
  })
})
  .then(res => res.json())
  .then(({ orderObj }) => {
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
