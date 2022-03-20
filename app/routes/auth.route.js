const validatorMiddleware = require('../middlewares/validator.middleware');
const controller = require('../controllers/auth.controller');
const validator = require('../validators/auth.validator');
const express = require('express');
const router = express.Router();

router.post('/login', validator.login, validatorMiddleware, controller.login);
router.post('/register', validator.register, validatorMiddleware, controller.register);

module.exports = router;