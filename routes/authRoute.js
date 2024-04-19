const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const userController = require("../controller/userController");
const authController = require("../controller/auth_controller");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login.ejs"));


router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/auth/register");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/reminders");
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle error
      console.error("Error logging out:", err);
      return res.status(500).send("Error logging out");
    }
    // Redirect the user to the login page after successful logout
    res.redirect("/auth/login");
  });
});
router.get("/register", forwardAuthenticated, (req, res) => {
  res.render("auth/register"); // Assuming you have a view template named 'register.ejs'
});

// Route to handle the registration form submission
router.post("/register", (req, res) => {
  authController.registerSubmit(req, res); // Assuming your authController has a method registerSubmit for handling registration
});
module.exports = router;

