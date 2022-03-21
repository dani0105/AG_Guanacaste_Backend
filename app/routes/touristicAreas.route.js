const validatorMiddleware = require('../middlewares/validator.middleware');
const authMiddleware = require("../middlewares/auth.middleware");
const controller = require('../controllers/touristicAreas.controller');
const validator = require('../validators/touristicArea.validator');

const express = require('express');
const router = express.Router();

// create
router.post('', authMiddleware, validator.create, validatorMiddleware, controller.create);
// update
router.put('/:id', authMiddleware, validator.update, validatorMiddleware, controller.update);
// get list
router.get('', validator.list, validatorMiddleware, controller.list);
// find
router.get('/:id', validator.find, validatorMiddleware, controller.find);
// delete
router.delete('/:id', authMiddleware, validator.delete, validatorMiddleware, controller.delete);

module.exports = router;