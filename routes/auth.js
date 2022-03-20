const controller = require('../controllers/authController');
let express = require('express');
let router = express.Router();

router.post('/login', controller.login);

router.post('/register', controller.register);

module.exports = router;