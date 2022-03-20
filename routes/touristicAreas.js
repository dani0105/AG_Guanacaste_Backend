const controller = require('../controllers/touristicAreasController');
const authMiddleware = require("../middlewares/authMiddleware");

let express = require('express');
let router = express.Router();

router.post('', authMiddleware, controller.create);

router.put('/:id', authMiddleware, controller.update);

router.get('', controller.list);

router.get('/:id', controller.find);

router.delete('/:id', authMiddleware, controller.delete);

module.exports = router;