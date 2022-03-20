const check = require('express-validator').check;

exports.login = [
  check('email')
    .exists().withMessage('exists')
    .isEmail().withMessage('isEmail'),
  check('password')
    .exists().withMessage('exists')
    .isLength({ min: 8 }).withMessage('isLengthMin')
]

exports.register = [
  check('email')
    .exists().withMessage('exists')
    .isEmail().withMessage('isEmail'),
  check('password')
    .exists().withMessage('exists')
    .isLength({ min: 8 }).withMessage('isLengthMin'),
  check('name')
    .exists().withMessage('exists')
]

module.exports