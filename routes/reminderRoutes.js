const express = require('express');
const router = express.Router();
const reminderController = require('../controller/reminder_controller'); // Adjust path if necessary

// Define your routes here, for example:
router.get('/', reminderController.list);

module.exports = router;
