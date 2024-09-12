const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

const routeClient = require("./routes/client/index.route.js");

app.set("views", "./views"); //Set views directory
app.set("view engine", "pug"); //Set views engine is 'pug'

routeClient(app);

app.listen(port, () => {
  console.log(`App lstening on port ${port}`);
});
