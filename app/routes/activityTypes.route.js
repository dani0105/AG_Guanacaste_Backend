const validatorMiddleware = require('../middlewares/validator.middleware');
const controller = require('../controllers/activityType.controller');
const validator = require('../validators/activityType.validator');

const express = require('express');
const router = express.Router();


// get list
router.get('', validator.list, validatorMiddleware, controller.list);
// find
router.get('/:id', validator.find, validatorMiddleware, controller.find);


module.exports = router;