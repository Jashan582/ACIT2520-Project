let database = require("../database");
// use const user = req.user and change database.cindy
let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implementation here 👈
    let newReminder = {
      id: Number(req.params.id),
      title: req.body.title,
      description: req.body.description,
      completed: Boolean(req.body.completed),
    };
    console.log(newReminder)
    database.cindy.reminders.forEach(reminder => {
      if (reminder.id === Number(req.params.id)){
        reminder.title = req.body.title;
        reminder.description = req.body.description;
        reminder.completed = Boolean(req.body.completed);
      }
    })
    res.redirect("/reminders")
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let index = database.cindy.reminders.findIndex(reminder => reminder.id == reminderToFind)

    if(index !== -1){
      database.cindy.reminders.splice(index, 1)
    }
    res.redirect("/reminders")
  },
};

module.exports = remindersController;
