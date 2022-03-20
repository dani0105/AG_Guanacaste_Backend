const check = require('express-validator').check;

exports.login = [
  check('email')
    .exists().withMessage('emailRequiredField')
    .isEmail().withMessage('emailIsEmail'),
  check('password')
    .exists().withMessage('passwordRequiredField')
    .isLength({ min: 8 }).withMessage('passwordMinLength')
]

exports.register = [
  check('email')
    .exists().withMessage('emailRequiredField')
    .isEmail().withMessage('emailIsEmail'),
  check('password')
    .exists().withMessage('passwordRequiredField')
    .isLength({ min: 8 }).withMessage('passwordMinLength'),
  check('name')
    .exists().withMessage('passwordRequiredField')
]

module.exports