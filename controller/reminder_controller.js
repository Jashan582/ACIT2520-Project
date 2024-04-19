let Database = require("../database");
// use const user = req.user and change database.cindy
const remindersController = {
  list: (req,res) => {
    if(req.user){
      res.render("reminder/index",{reminders: req.user.reminders});
    }else{
      res.redirect("/auth/login");
    }
  },

  new:(req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    if(!req.session.user){
      return res.redirect("/auth/login")
    }

    let reminderToFind = req.params.id;
    let searchResult = req.session.user.reminders.find(reminder => reminder.id == reminderToFind);

    if(searchResult != undefined){
      res.render("reminder/single-reminder", { reminderItem: searchResult});
    }else{
      res.redirect("/reminders");
    }
  },

  create: (req, res) => {
    if (!req.session.user){
      return res.redirect("/auth/login");
    }

    let newReminder = {
      id: req.session.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.session.user.reminders.push(newReminder);
    res.redirect("/reminders");
  },


  edit: (req, res) => {
    if(!req.session.user){
      return res.redirect("/auth/login");
    }

    let reminderToFind = req.params.id;
    let searchResult = req.session.user.reminders.find(reminder => reminder.id == reminderToFind);

    if(searchResult){
      res.render("reminder/edit", {reminderItem: searchResult});
    }else{
      res.redirect("/reminders")
    }
  },

  update: (req, res) => {
    if (!req.session.user) {
      return res.redirect("/auth/login");
    }
  
    let reminders = req.session.user.reminders;
    let reminderToUpdate = reminders.find(reminder => reminder.id === Number(req.params.id));
  
    if (reminderToUpdate) {
      reminderToUpdate.title = req.body.title;
      reminderToUpdate.description = req.body.description;
      reminderToUpdate.completed = Boolean(req.body.completed);
    }
  
    res.redirect("/reminders");
  },
  

  delete: (req, res) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }
  
    const index = reminders.findIndex(reminder => reminder.id.toString() === reminderId);
    const reminderId = req.params.id;
    const reminders = req.session.user.reminders;

    if (index !== -1) {
      reminders.splice(index, 1);
      res.redirect("/reminders");
    }else{
      res.status(403).send("you cant delete a reminder that you did not create");
    }
  },
}

module.exports = remindersController;
