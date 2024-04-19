const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require('express-session');
const passport = require("passport");

// Initialize Passport configuration
require('./middleware/passport');

// Express session setup
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
}));

// Initialize Passport and session for persistent login sessions
app.use(passport.initialize());
app.use(passport.session());

// Static files and form parsing
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Layout and view engine setup
app.use(ejsLayouts);
app.set("view engine", "ejs");

// Import routes
const reminderRoutes = require("./routes/reminderRoutes"); // Define these routes in a separate file
const authRoutes = require("./routes/authRoutes"); // Define these routes in a separate file
const adminRoutes = require("./routes/adminRoutes"); // Make sure isAdmin middleware uses Passport

// Use routes
app.use('/auth', authRoutes); // Note: I changed this to '/auth' to match the route import above
app.use('/reminders', reminderRoutes);
app.use('/admin', adminRoutes);

// Additional routes can be added below
// ...
// For handling login


// Start server
app.listen(3001, function () {
  console.log("Server running. Visit: http://localhost:3001 in your browser 🚀");
});

