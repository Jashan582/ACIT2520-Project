const passport = require("passport");
const userController = require('./userController'); // Make sure this path is correct

let authController = {
  login: (req, res) => {
    res.render("login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/reminders',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  },

  registerSubmit: (req, res, next) => { // Don't forget to add 'next' if you're going to use it
    const { name, email, password } = req.body;
    userController.createUser(req.body, (err, user) => {
      if (err) {
        res.status(409).send("An account with this email already exists.");
        return;
      }
      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect('/reminders');
      });
    });
  },
};

module.exports = authController;

