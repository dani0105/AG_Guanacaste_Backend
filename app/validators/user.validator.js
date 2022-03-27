const check = require('express-validator').check;
const Sequelize = require('sequelize');
const Rol = require('../models').rol;
const User = require('../models').user;

validateIdRol = (value) => {
  return Rol.findOne({
    where: {
      id: value
    }
  }).then(result => {
    if (!result) {
      return Promise.reject();
    }
  });
}


validUniqueEmail = (value, { req }) => {
  let where = { email: value };
  if (req.params.id) {
    where.id = { [Sequelize.Op.ne]: req.params.id }
  }
  return User.findOne({
    where: where
  }).then(result => {
    if (result) {
      return Promise.reject();
    }
  });
}


exports.create = [
  check('name')
    .exists().withMessage('exists')
    .isLength({ max: 250 }).withMessage('isLengthMax'),
  check('email')
    .exists().withMessage('exists')
    .isEmail().normalizeEmail().withMessage('isEmail')
    .custom(validUniqueEmail).withMessage('isUnique'),
  check('password')
    .exists().withMessage('exists')
    .isLength({ min: 8 }).withMessage('isLengthMin'),
  check('id_rol')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric')
    .custom(validateIdRol).withMessage('notFound'),
]

exports.update = [
  check('id')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
  check('name')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isLength({ max: 250 }).withMessage('isLengthMax'),
  check('email')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isEmail().normalizeEmail().withMessage('isEmail')
    .custom(validUniqueEmail).withMessage('isUnique'),
  check('password')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isLength({ min: 8 }).withMessage('isLengthMin'),
  check('id_rol')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric')
    .custom(validateIdRol).withMessage('notFound'),
]

exports.list = [
  check('page')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
  check('size')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
  check('filter')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isString().withMessage("isString")
]

exports.find = [
  check('id')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
]

exports.delete = [
  check('id')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric')
]

module.exports