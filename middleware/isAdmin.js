function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    res.status(403).send("you cannot access");
  }
  
  module.exports = isAdmin;
  