const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const { isAdmin } = require('../middleware/isAdmin');

router.get('/dashboard', isAdmin, adminController.dashboard);
router.post('/revoke', isAdmin, adminController.revokeSession);

module.exports = router;