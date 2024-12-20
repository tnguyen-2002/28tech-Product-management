const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require('path');

const flash = require("express-flash");  //Flash - https://github.com/RGBboy/express-flash
const cookieParser = require("cookie-parser"); // - https://github.com/expressjs/cookie-parser
const session = require("express-session"); //- https://github.com/expressjs/session
const systemConfig = require("./config/system");

const app = express();
const port = process.env.PORT;

const database = require("./config/database");
database.connect();

const routeAdmin = require("./routes/admin/index.route.js");
const routeClient = require("./routes/client/index.route.js");
const methodOverride = require("method-override");

app.set("views", `${__dirname}/views`); //Set views directory
app.set("view engine", "pug"); //Set views engine is 'pug'

app.use(express.static(`${__dirname}/public`)); //Set static folder

// New Route to the TinyMCE Node module
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

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
