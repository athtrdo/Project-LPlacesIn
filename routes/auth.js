const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const isAuthIn = require("../middlewares/isAuthIn");
const AuthController = require("../controllers/auth");

router.route('/register')
.get(isAuthIn, AuthController.register)
.post(wrapAsync(AuthController.postRegister));

router.route('/login')
.get(isAuthIn, AuthController.login)
.post(passport.authenticate ('local',

  {
    failureRedirect: "/login",
    failureFlash: {
      type: "error_msg",
      msg: "Invalid username or password",
    },
  }),
  AuthController.postLogin);

router.post("/logout", AuthController.logout);

module.exports = router;
