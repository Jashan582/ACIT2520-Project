let Database = require("../database");
// use const user = req.user and change database.cindy
const remindersController = {
  list: (req,res) => {
    if(req.session.user){
      res.render("reminder/index",{reminders: req.session.user.reminders});
    }else{
      res.redirect("/login");
    }
  },

  new:(req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    if(!req.session.user){
      return res.redirect("/login")
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
      return res.redirect("/login");
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
      return res.redirect("/login");
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
      return res.redirect("/login");
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
  
    const index = req.session.user.reminders.findIndex(reminder => reminder.id == req.params.id);
    if (index !== -1) {
      req.session.user.reminders.splice(index, 1);
    }
  
    res.redirect("/reminders");
  },
};  

module.exports = remindersController;
