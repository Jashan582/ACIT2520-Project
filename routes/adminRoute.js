const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/checkAdmin");
const {ensureAuthenticated} = require("../middleware/checkAuth")
const {database} = require("../models/userModel")
// router.get("/", (req, res) => {
//     res.send("welcome");
//   });
router.get("/", ensureAuthenticated, (req, res) => {
    const sessions = database.sessions
    res.render("admin/dashboard",{user: req.user, sessions: sessions})
});

module.exports = router;