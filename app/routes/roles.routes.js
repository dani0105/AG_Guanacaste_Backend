const controller = require('../controllers/roles.controller');
const express = require('express');
const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.find);

module.exports = router;