const check = require('express-validator').check;
const User = require('../models').user;


validUniqueEmail = (value) => {
  return User.findOne({
    where: {
      email: value
    }
  }).then(result => {
    if (result) {
      return Promise.reject();
    }
  });
}

exports.login = [
  check('email')
    .exists().withMessage('exists')
    .isEmail().normalizeEmail().withMessage('isEmail'),
  check('password')
    .exists().withMessage('exists')
    .isLength({ min: 8 }).trim().withMessage('isLengthMin')
]

exports.register = [
  check('email')
    .exists().withMessage('exists')
    .isEmail().normalizeEmail().withMessage('isEmail')
    .custom(validUniqueEmail).withMessage('isUnique'),
  check('password')
    .exists().withMessage('exists')
    .isLength({ min: 8 }).trim().withMessage('isLengthMin'),
  check('name')
    .exists().withMessage('exists')
    .not().isEmpty().trim()
]

module.exports