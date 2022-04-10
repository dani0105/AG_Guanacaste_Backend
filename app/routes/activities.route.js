const validatorMiddleware = require('../middlewares/validator.middleware');
const authMiddleware = require("../middlewares/auth.middleware");
const controller = require('../controllers/activity.controller');
const validator = require('../validators/activity.validator');
const resourceMiddleware = require("../middlewares/resource.middleware");

const express = require('express');
const router = express.Router();

// create
router.post('', resourceMiddleware("Activities"), authMiddleware, validator.create, validatorMiddleware, controller.create);
// update
router.put('/:id', resourceMiddleware("Activities"), authMiddleware, validator.update, validatorMiddleware, controller.update);
// get list
router.get('', resourceMiddleware("Activities"), authMiddleware, validator.list, validatorMiddleware, controller.list);
// find
router.get('/:id', resourceMiddleware("Activities"), authMiddleware, validator.find, validatorMiddleware, controller.find);
// delete
router.delete('/:id', resourceMiddleware("Activities"), authMiddleware, validator.delete, validatorMiddleware, controller.delete);

//comments
router.post('/:id_activity/comments', resourceMiddleware("Comments"), authMiddleware, validator.createComment, validatorMiddleware, controller.createComment);
router.get('/:id_activity/comments', resourceMiddleware("Comments"), authMiddleware, validator.listComment, validatorMiddleware, controller.listComment);


module.exports = router;