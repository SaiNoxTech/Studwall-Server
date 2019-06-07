const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IlN0dWRlbnQiLCJzdHVkZW50SWQiOiJSMTNqZklQNUUxU0dNdWdrIiwiaWF0IjoxNTU5OTE0NDMzfQ.Yx1cyyDI4AvEQrepmGTaOVfatbGvs6KbFSdoV4mUYp0";

fetch("/order?addMoney=True", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization: authToken
  },
  body: JSON.stringify({
    items: [{ itemId: "Xwmq17DvAz1RLOHZs0rs2uKsbF9feu12", qty: 5 }]
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
