const validatorMiddleware = require('../middlewares/validator.middleware');
const authMiddleware = require("../middlewares/auth.middleware");
const controller = require('../controllers/touristicAreas.controller');
const validator = require('../validators/touristicArea.validator');
const resourceMiddleware = require("../middlewares/resource.middleware");

const express = require('express');
const router = express.Router();

// create
router.post('', resourceMiddleware("Touristic Areas"), authMiddleware, validator.create, validatorMiddleware, controller.create);
// update
router.put('/:id', resourceMiddleware("Touristic Areas"), authMiddleware, validator.update, validatorMiddleware, controller.update);
// get list
router.get('', validator.list, validatorMiddleware, controller.list);
// find
router.get('/:id', validator.find, validatorMiddleware, controller.find);
// delete
router.delete('/:id', resourceMiddleware("Touristic Areas"), authMiddleware, validator.delete, validatorMiddleware, controller.delete);

//comments
router.post('/:id_touristic_area/comments', resourceMiddleware("Comments"), authMiddleware, validator.createComment, validatorMiddleware, controller.createComment);

router.get('/:id_touristic_area/comments', validator.listComment, validatorMiddleware, controller.listComment);

module.exports = router;