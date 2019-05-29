const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IlN0dWRlbnQiLCJzdHVkZW50SWQiOiJiM2I4MldjUDBzUXJRV1YwIiwiaWF0IjoxNTU5MTM3OTQzfQ.R1cE30YxA0zMkKKgt1tO96yBMYzAd3_IabYS1mi0phU";

fetch("/order?addMoney=True", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization: authToken
  },
  body: JSON.stringify({
    items: [{ itemId: "6jvHU94hviLvF8uqXEHLlKXFr2OXfo2f", qty: 1 }]
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
