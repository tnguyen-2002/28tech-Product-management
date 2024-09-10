const express = require("express");
const app = express();
const port = 3000;

const routeClient = require("./routes/client/index.route");

app.set("views", "./views"); //Set views directory
app.set("view engine", "pug"); //Set views engine is 'pug'

routeClient(app);

app.listen(port, () => {
  console.log(`App lstening on port ${port}`);
});
