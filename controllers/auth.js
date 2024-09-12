const User = require("../models/user");

module.exports.register = (req, res) => {
  res.render("auth/register.ejs");
};

module.exports.postRegister = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);
    req.flash("success_msg", "You're registered and can login");
    res.redirect("/login");
  } catch (error) {
    req.flash("error_msg", error.message);
    res.redirect("/register");
  }
};

module.exports.login = (req, res) => {
  res.render("auth/login.ejs");
};

module.exports.postLogin = (req, res) => {
  req.flash("success_msg", "You are logged in");
  res.redirect("/places");
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You are logged out");
    res.redirect("/login");
  });
};
