const validatorMiddleware = require('../middlewares/validator.middleware');
const controller = require('../controllers/users.controller');
const validator = require('../validators/user.validator');

const express = require('express');
const router = express.Router();

// create
router.post('', validator.create, validatorMiddleware, controller.create);
// update
router.put('/:id', validator.update, validatorMiddleware, controller.update);
// get list
router.get('', validator.list, validatorMiddleware, controller.list);
// find
router.get('/:id', validator.find, validatorMiddleware, controller.find);
// delete
router.delete('/:id', validator.delete, validatorMiddleware, controller.delete);

module.exports = router;