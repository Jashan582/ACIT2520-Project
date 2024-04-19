const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const {database} = require("../models/userModel")
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    if(user){
        database.sessions.push({user: {userId: user.id, email: user.email, name: user.name, password: user.password,
        isAdmin: user.isAdmin},
        reminders:[user.reminders],
        // sessionId: req.sessions.id
        })
        console.log(database.sessions.reminders)
    }
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);
