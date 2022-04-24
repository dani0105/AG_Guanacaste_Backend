const check = require('express-validator').check;
const geoValidator = require("geojson-validation");
const Difficulty = require('../models').difficulty;
const Accessibility = require('../models').accessibility;
const ActivityType = require('../models').activity_type;

validateGeom = (value, { req }) => {
  return geoValidator.valid(value);
}


validateId = (model, value) => {
  return model.findOne({
    where: {
      id: value
    }
  }).then(result => {
    if (!result) {
      return Promise.reject();
    }
  });
}

exports.create = [
  check('name')
    .exists().withMessage('exists')
    .isLength({ max: 300 }).withMessage('isLengthMax'),
  check('description')
    .exists().withMessage('exists')
    .isLength({ max: 1024 }).withMessage('isLengthMax'),
  check('geom')
    .exists().withMessage('exists')
    .custom(validateGeom).withMessage('isGeom'),
  check('id_activity_type')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric')
    .custom(value => validateId(ActivityType, value)).withMessage('notFound'),
  check('id_difficulty')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric')
    .custom(value => validateId(Difficulty, value)).withMessage('notFound'),
  check('id_accessibility')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric')
    .custom(value => validateId(Accessibility, value)).withMessage('notFound'),
  check('direction')
    .exists().withMessage('exists')
    .isLength({ max: 500 }).withMessage('isLengthMax'),
  check('requirement')
    .exists().withMessage('exists')
    .isLength({ max: 1024 }).withMessage('isLengthMax'),
  check('images')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isArray().toArray().withMessage('isArray')
]

exports.update = [
  check('id')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
  check('name')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isLength({ max: 300 }).withMessage('isLengthMax'),
  check('description')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isLength({ max: 1024 }).withMessage('isLengthMax'),
  check('geom')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .custom(validateGeom).withMessage('isGeom'),
  check('id_activity_type')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric')
    .custom(value => validateId(ActivityType, value)).withMessage('notFound'),
  check('id_difficulty')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric')
    .custom(value => validateId(Difficulty, value)).withMessage('notFound'),
  check('id_accessibility')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric')
    .custom(value => validateId(Accessibility, value)).withMessage('notFound'),
  check('direction')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isLength({ max: 500 }).withMessage('isLengthMax'),
  check('requirement')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isLength({ max: 1024 }).withMessage('isLengthMax'),
  check('images')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isArray().toArray().withMessage('isArray')
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
    .isString().withMessage("isString"),
  check('id_activity_type')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isNumeric().toInt().withMessage("isNumeric"),
  check('id_difficulty')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isNumeric().toInt().withMessage("isNumeric"),
  check('id_accessibility')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isNumeric().toInt().withMessage("isNumeric"),
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

exports.createComment = [
  check('id_activity')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
  check('id_user')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
  check('comment')
    .exists().withMessage('exists')
    .isString().trim().withMessage('isString'),
]

exports.listComment = [
  check('id_activity')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
  check('page')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
  check('size')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
]

module.exports