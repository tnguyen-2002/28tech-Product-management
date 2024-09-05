const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/products", (req, res) => {
  res.send("Product Category");
});

app.listen(port, () => {
  console.log(`App lstening on port ${port}`);
});
