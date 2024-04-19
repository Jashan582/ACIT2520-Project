// const Database = require("../database");
const { database} = require("../models/userModel");
const remindersController = {
  list: (req, res) => {
    if (req.isAuthenticated()) {
      const userReminders = database.users.find(user => user.id === req.user.id).reminders;
      res.render("reminder/index", { reminders: userReminders });
    } else {
      res.redirect("/auth/login");
    }
  },

  new: (req, res) => {
    if (req.isAuthenticated()) {
      res.render("reminder/create");
    } else {
      res.redirect("/auth/login");
    }
  },

  listOne: (req, res) => {
    if (req.isAuthenticated()) {
      const userReminder = database.users.find(user => user.id === req.user.id)
        .reminders.find(reminder => reminder.id == req.params.id);
      if (userReminder) {
        res.render("reminder/single-reminder", { reminderItem: userReminder });
      } else {
        res.redirect("/reminders");
      }
    } else {
      res.redirect("/auth/login");
    }
  },

  create: (req, res) => {
    if (req.isAuthenticated()) {
      const userId = req.user.id;
      const newReminder = {
        id: Database.users[userId - 1].reminders.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
      };
      database.users[userId - 1].reminders.push(newReminder);
      res.redirect("/reminders");
    } else {
      res.redirect("/auth/login");
    }
  },

  edit: (req, res) => {
    if (req.isAuthenticated()) {
      const userReminder = database.users.find(user => user.id === req.user.id)
        .reminders.find(reminder => reminder.id == req.params.id);
      if (userReminder) {
        res.render("reminder/edit", { reminderItem: userReminder });
      } else {
        res.redirect("/reminders");
      }
    } else {
      res.redirect("/auth/login");
    }
  },

  update: (req, res) => {
    if (req.isAuthenticated()) {
      const userId = req.user.id;
      const reminders = database.users[userId - 1].reminders;
      const reminderToUpdate = reminders.find(reminder => reminder.id === Number(req.params.id));
      if (reminderToUpdate) {
        reminderToUpdate.title = req.body.title;
        reminderToUpdate.description = req.body.description;
        reminderToUpdate.completed = Boolean(req.body.completed);
      }
      res.redirect("/reminders");
    } else {
      res.redirect("/auth/login");
    }
  },

  delete: (req, res) => {
    if (req.isAuthenticated()) {
      const userId = req.user.id;
      const reminders =dDatabase.users[userId - 1].reminders;
      const index = reminders.findIndex(reminder => reminder.id.toString() === req.params.id);
      if (index !== -1) {
        reminders.splice(index, 1);
        res.redirect("/reminders");
      } else {
        res.status(403).send("You can't delete a reminder that you did not create");
      }
    } else {
      res.redirect("/auth/login");
    }
  },
};

module.exports = remindersController;

