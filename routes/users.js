const controller = require('../controllers/usersController');
let express = require('express');
let router = express.Router();

router.post('', controller.create);

router.put('/:id', controller.update);

router.get('', controller.list);

router.get('/:id', controller.find);

router.delete('/:id', controller.delete);

module.exports = router;