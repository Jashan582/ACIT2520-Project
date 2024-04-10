function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
      return next();
    }
    res.status(403).send("your not admin you can't access this");
  }
  
  module.exports = isAdmin;
  