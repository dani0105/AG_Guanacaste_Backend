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
]

exports.update = [
  check('id')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
  check('name')
    .isLength({ max: 300 }).withMessage('isLengthMax'),
  check('description')
    .isLength({ max: 1024 }).withMessage('isLengthMax'),
  check('id_type_tourist_area')
    .isNumeric().toInt().withMessage('isNumeric'),
]

exports.list = [
  check('page')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
  check('size')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric'),
  check('filter')
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