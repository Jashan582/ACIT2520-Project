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
    console.log("im here")
    const{name, email, password} = req.body
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
