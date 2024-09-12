module.exports = (req,res,next)=>{
    if (req.isAuthenticated()) {
        req.flash("success_msg", "You are still logged in");
        return res.redirect("/places");
      } else {
        next();
      }
}