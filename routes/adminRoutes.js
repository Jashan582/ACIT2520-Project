const express = require('express');
const router = express.Router();
const adminController = require("../controller/admin_controller");
const isAdmin = require('../middleware/isAdmin');  // Adjust the path as necessary


console.log('Dashboard function:', adminController.dashboard);
console.log('RevokeSession function:', adminController.revokeSession);

router.get('/dashboard', isAdmin, adminController.dashboard);
router.post('/revoke', isAdmin, adminController.revokeSession);

module.exports = router;
