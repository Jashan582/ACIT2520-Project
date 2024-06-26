const { database, userModel } = require("../models/userModel");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    const{email, password} = req.body;
    const user = database.users.find(user => user.email === email && user.password === password);
    if(user){
      req.session.user = { ...user};
      res.redirect("/reminders");
    }else{
      res.redirect("/login");

    }
    // implement later
  },

  registerSubmit: (req, res) => {
    //implement later
    const { email, password, name } = req.body; // Destructure email along with any other needed properties

    if (!email || !password || !name) { // Check for the existence of email, password, and name
      return res.status(400).send("All fields are required.");
    }
    const existingUser = userModel.findOne(email);
    if (existingUser) {
      req.flash('error', 'Email is already registered.');
      return res.redirect('/auth/register');
    }

    const newUser = {
      id: database.users.length+1,
      name: name,
      email: email,
      password: password,
      role: 'user',
      reminders: []
    };
    database.users.push(newUser)
    // userModel.addUserToDatabase(newUser);

    res.redirect('/auth/login');
  },

  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error("Error occurred during logout:", err);
      }
      res.redirect("/login");
    });
  },
}
module.exports = authController;

