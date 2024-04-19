let Database = require("../database");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    const{email, password} = req.body;
    const user = Database.users.find(user => user.email === email && user.password === password);
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
    const existingUser = userModel.findOne(email);
    if (existingUser) {
      req.flash('error', 'Email is already registered.');
      return res.redirect('/register');
    }

    const newUser = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      email: email,
      password: password,
      role: 'user',
      reminders: []
    };

    userModel.addUserToDatabase(newUser);

    res.redirect('/login');
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
