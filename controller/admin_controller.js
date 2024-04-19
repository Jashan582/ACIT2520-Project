let Database = require("../database");
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
          console.log("Im here")
          if (err) {
            console.log("Error deleting session:", err);
            req.flash("error", "fail to delete session");
          }
            else {
              req.flash("success", "session revoked");
            }
            res.redirect('/admin');
        })
    }
};
        
        module.exports = adminController;


