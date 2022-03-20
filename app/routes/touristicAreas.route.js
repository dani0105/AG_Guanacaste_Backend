const controller = require('../controllers/touristicAreas.controller');
const authMiddleware = require("../middlewares/auth.middleware");

let express = require('express');
let router = express.Router();

router.post('', authMiddleware, controller.create);

router.put('/:id', authMiddleware, controller.update);

router.get('', controller.list);

router.get('/:id', controller.find);

router.delete('/:id', authMiddleware, controller.delete);

module.exports = router;