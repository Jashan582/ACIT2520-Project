// let Database = require("../database");
const { Database} = require("../models/userModel");
const isAdmin = require("../middleware/checkAdmin")
const session = require('express-session');
const adminController = {
    dashboard: (req, res) => {
        if (!req.user.isAdmin) {
          return res.status(403).send("No");
        }
        
        const sessions = Database.sessions.map(session => {
            const user = Database.users.find(user => user.id === session.userId);
            return {
              sessionId: session.sessionId,
              user: { name: user.name, id: user.id }
            };
          });

          res.render('admin/dashboard', { user: req.user, sessions });
        },
    revokeSession: (req, res) => {
        if (!req.user.isAdmin) {
            return res.status(403).send("you are not the admin");
        }
        const sessionId = req.params.sessionId;
        // console.log(sessionId)
        // console.log(req.sessionStore)
        req.sessionStore.destroy(sessionId, (err) => {
          if (err) {
            console.error("Error deleting session:", err);
            req.flash("error", "Failed to delete session");
          } else {
            req.flash("success", "Session deleted successfully");
          }
          res.redirect("/admin");
        });
      
    }
};
        
        module.exports = adminController;


