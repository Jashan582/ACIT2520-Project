let Database = require("../database");

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
        
        const { sessionId } = req.body;
        const index = Database.sessions.findIndex(s => s.sessionId === sessionId);
        if (index > -1) {
            Database.sessions.splice(index, 1); 
        }
        
        res.redirect('/admin/dashboard');
    }
};
        
        module.exports = adminController;
