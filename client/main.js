const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IlN0dWRlbnQiLCJzdHVkZW50SWQiOiJ3bkNPSjluNFoyZGd5aEs4IiwiaWF0IjoxNTU5OTI0OTg3fQ.TehWQTkB2IqAH1oSrgeqiLxCsIAQx4ysaKEV89PO1rE";

fetch("/order?addMoney=True", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization: authToken
  },
  body: JSON.stringify({
    items: [{ itemId: "Ms0ZyAlStLjyOoj6p6zH6UZK8AuFTyQN", qty: 5 }]
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
