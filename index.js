const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const url = require("url");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const allowedUsers = {
  name: "John Doe",
  email: "tada@wala.com",
  password: '123'
};

app.use(cookieParser());

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");

app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({ extended: false}));


app.use(
  session({
    secret: "aabbccddeeff",
    resave: false,
    saveUninitialized: false
  })
);

app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = 0;
  }
  req.session.views += 1;
  next();
})

app.use((req,res, next) => {
  if (req.body.email === allowedUsers.email) {
    if(req.body.password === allowedUsers.password) {
      req.session.login = true;
      req.session.name = allowedUsers.name;
    }
  }
  next();
});

app.use(require("./loginRoute"));

app.listen(3000);
