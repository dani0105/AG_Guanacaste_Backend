const check = require('express-validator').check;

exports.list = [
]

exports.find = [
  check('id')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
]


module.exports