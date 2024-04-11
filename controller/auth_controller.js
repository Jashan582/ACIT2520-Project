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
    const{name, email, password} = req.body
    const existingUser = Database.users.some(user => user.email === email);
    if (existingUser) {
      // Handle the case where the user tries to register with an existing email
      res.status(409).send("An account with this email already exists.");
      return; // Stop further execution in this callback
    }
    const id = Database.users.length
    const user = {
      id:id,
      name: name,
      email: email,
      password: password,
      isAdmin: false,
      reminders:[
      ],
    }
    console.log(user)
    Database.users.push(user)
    if(user){
      req.session.user = { ...user};
      res.redirect("/reminders");
    }else{
      res.redirect("/login");

    }
  },
};

module.exports = authController;
