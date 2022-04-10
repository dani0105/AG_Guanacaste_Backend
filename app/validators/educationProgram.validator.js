const check = require('express-validator').check;
const geoValidator = require("geojson-validation");
const EducationProgram = require('../models').education_program;
const EducationProgramType = require('../models').education_program_type;

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
  check('id_education_program_type')
    .exists().withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric')
    .custom(value => validateId(EducationProgramType, value)).withMessage('notFound'),
  check('goal')
    .exists().withMessage('exists')
    .isLength({ max: 1024 }).withMessage('isLengthMax'),
  check('inscription_link')
    .exists().withMessage('exists')
    .isLength({ max: 1024 }).withMessage('isLengthMax'),
  check('requirement')
    .exists().withMessage('exists')
    .isLength({ max: 1024 }).withMessage('isLengthMax'),
  check('direction')
    .exists().withMessage('exists')
    .isLength({ max: 300 }).withMessage('isLengthMax'),
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
  check('id_education_program_type')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isNumeric().toInt().withMessage('isNumeric')
    .custom(value => validateId(EducationProgramType, value)).withMessage('notFound'),
  check('goal')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isLength({ max: 1024 }).withMessage('isLengthMax'),
  check('inscription_link')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isLength({ max: 1024 }).withMessage('isLengthMax'),
  check('requirement')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isLength({ max: 1024 }).withMessage('isLengthMax'),
  check('direction')
    .exists().optional({ checkFalsy: true }).withMessage('exists')
    .isLength({ max: 300 }).withMessage('isLengthMax'),
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
  check('id_education_program')
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
  check('id_education_program')
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