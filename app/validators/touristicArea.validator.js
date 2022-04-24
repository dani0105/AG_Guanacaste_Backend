const check = require('express-validator').check;
const geoValidator = require("geojson-validation");
const TypeTouristArea = require('../models').type_tourist_area;

validateGeom = (value, { req }) => {
  return geoValidator.valid(value);
}

validateIdTypeTouristArea = (value) => {

  return TypeTouristArea.findOne({
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
  check('id_type_tourist_area')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric')
    .custom(validateIdTypeTouristArea).withMessage('notFound'),
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
  check('id_type_tourist_area')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
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

exports.createComment = [
  check('id_touristic_area')
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
  check('id_touristic_area')
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