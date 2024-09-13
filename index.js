const express = require("express");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const ErrorHandler = require("./utils/ErrorHandler");
const port = process.env.PORT || 3000;
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI;


console.log('MongoDB URI:', process.env.MONGODB_URI);


//connect to mongodb
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.engine("ejs", ejsMate);
app.set("view wngine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.use("/", require("./routes/auth"));
app.use("/places", require("./routes/places"));
app.use("/places/:place_id/reviews", require("./routes/reviews"));

app.all("*", (req, res, next) => {
  next(new ErrorHandler());
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(port, () => {
  console.log(`server is running on http://127.0.0.1:${port}`);
});
