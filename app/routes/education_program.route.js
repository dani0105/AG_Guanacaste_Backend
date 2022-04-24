const validatorMiddleware = require('../middlewares/validator.middleware');
const authMiddleware = require("../middlewares/auth.middleware");
const controller = require('../controllers/educationProgram.controller');
const validator = require('../validators/educationProgram.validator');
const resourceMiddleware = require("../middlewares/resource.middleware");

const express = require('express');
const router = express.Router();

// create
router.post('', resourceMiddleware("Education Programs"), authMiddleware, validator.create, validatorMiddleware, controller.create);
// update
router.put('/:id', resourceMiddleware("Education Programs"), authMiddleware, validator.update, validatorMiddleware, controller.update);
// get list
router.get('', validator.list, validatorMiddleware, controller.list);
// find
router.get('/:id', validator.find, validatorMiddleware, controller.find);
// delete
router.delete('/:id', resourceMiddleware("Education Programs"), authMiddleware, validator.delete, validatorMiddleware, controller.delete);

//comments
router.post('/:id_education_program/comments', resourceMiddleware("Comments"), authMiddleware, validator.createComment, validatorMiddleware, controller.createComment);
router.get('/:id_education_program/comments', validator.listComment, validatorMiddleware, controller.listComment);


module.exports = router;