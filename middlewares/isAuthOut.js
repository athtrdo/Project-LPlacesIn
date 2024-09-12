module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error_msg", "You are nnot logged in");
    return res.redirect("/login");
  } else {
    next();
  }
};
