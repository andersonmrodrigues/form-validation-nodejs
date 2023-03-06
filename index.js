var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var session = require("express-session");
var flash = require("express-flash");
var cookieParser = require("cookie-parser");

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cookieParser("apsidjaod1i2eji"));
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(flash());

app.get("/", (req, res) => {
  var emailError = req.flash("emailError");
  var pointsError = req.flash("pointsError");
  var nameError = req.flash("nameError");
  var name = req.flash("name");
  var email = req.flash("email");
  var points = req.flash("points");

  emailError =
    emailError === undefined || emailError.length === 0
      ? undefined
      : emailError;

  pointsError =
    pointsError === undefined || pointsError.length === 0
      ? undefined
      : pointsError;

  nameError =
    nameError === undefined || nameError.length === 0 ? undefined : nameError;

  name = name === undefined || name.length === 0 ? undefined : name;

  email = email === undefined || email.length === 0 ? undefined : email;

  points = points === undefined || points.length === 0 ? undefined : points;

  res.render("index", {
    emailError,
    nameError,
    pointsError,
    name,
    email,
    points,
  });
});

app.post("/form", (req, res) => {
  var { email, name, points } = req.body;
  var emailError;
  var pointsError;
  var nameError;

  if (email === undefined || email === "") {
    emailError = "Invalid e-mail";
  }

  if (points === undefined || points < 20) {
    pointsError = "Invalid points";
  }

  if (name === undefined || name === "") {
    nameError = "Invalid name";
  }

  if (name.length < 4) {
    nameError = "Name size is to small";
  }

  if (
    emailError != undefined ||
    pointsError != undefined ||
    nameError != undefined
  ) {
    console.log(emailError + " - " + pointsError + " - " + nameError);
    req.flash("emailError", emailError);
    req.flash("pointsError", pointsError);
    req.flash("nameError", nameError);
    req.flash("name", name);
    req.flash("email", email);
    req.flash("points", points);
    res.redirect("/");
  } else {
    res.send("Form validated");
  }
});

app.listen(8080, (req, res) => {
  console.log("Serveer UP!");
});
