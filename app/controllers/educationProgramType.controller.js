const HttpStatus = require('http-status-codes').StatusCodes;
const Sequelize = require('sequelize');
const BaseError = require('../errors/base.error');

const EducationProgramType = require('../models').education_program_type;


exports.list = async (req, res, next) => {
  EducationProgramType.findAll({
    where: {
      is_active: true
    }
  }).then(result => {
    return res.status(HttpStatus.OK).json({
      success: true,
      data: result
    })
  })
}

exports.find = async (req, res, next) => {
  EducationProgramType.findOne({
    where: {
      id: req.params.id
    }
  }).then(result => {
    return res.status(HttpStatus.OK).json({
      success: true,
      data: result
    })
  })
}


module.exports