const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

//Flash - https://github.com/RGBboy/express-flash
const flash = require("express-flash");
const cookieParser = require("cookie-parser"); // - https://github.com/expressjs/cookie-parser
const session = require("express-session"); //- https://github.com/expressjs/session
const systemConfig = require("./config/system");

const app = express();
const port = process.env.PORT;

const database = require("./config/database");
database.connect();

const routeAdmin = require("./routes/admin/index.route.js");
const routeClient = require("./routes/client/index.route.js");

app.set("views", "./views"); //Set views directory
app.set("view engine", "pug"); //Set views engine is 'pug'

app.use(express.static("public")); //Set static folder

//Flash 
app.use(cookieParser("ABCZYX"));
app.use(
  session({
    // Add to disable error on Firefox
    resave: false, 
    saveUninitialized: false,
    cookie: { sameSite: 'strict' },
  })
);
app.use(flash());

//local variable for *.pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

routeAdmin(app);
routeClient(app);

app.listen(port, () => {
  console.log(`App lstening on port ${port}`);
});
