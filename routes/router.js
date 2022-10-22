const express = require('express');
const router = express.Router();
const path = require('path');
const Controller = require(path.resolve('controllers/controllers.js'));

// Porter [ login ]
router.get('/', Controller.home);
router.post('/check-user', Controller.checkUser);

// Register
router.get('/register', Controller.newAccount);

// Dasboard
router.get('/dashboard', Controller.dashboard);
router.post('/evaluate', Controller.evaluate);

module.exports = router;
