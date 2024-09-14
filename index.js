const express = require("express");
require("dotenv").config();
const systemConfig = require("./config/system")
const app = express();
const port = process.env.PORT;

const database = require("./config/database");
database.connect();

const routeAdmin = require("./routes/admin/index.route.js");
const routeClient = require("./routes/client/index.route.js");

app.set("views", "./views"); //Set views directory
app.set("view engine", "pug"); //Set views engine is 'pug'

app.use(express.static('public')); //Set static folder

//local variable for *.pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeAdmin(app);
routeClient(app);

app.listen(port, () => {
  console.log(`App lstening on port ${port}`);
});
