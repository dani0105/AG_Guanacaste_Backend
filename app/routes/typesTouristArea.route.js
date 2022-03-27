const validatorMiddleware = require('../middlewares/validator.middleware');
const controller = require('../controllers/typesTouristArea.controller');
const validator = require('../validators/typesTouristArea.validator');

const express = require('express');
const router = express.Router();


// get list
router.get('', validator.list, validatorMiddleware, controller.list);
// find
router.get('/:id', validator.find, validatorMiddleware, controller.find);


module.exports = router;