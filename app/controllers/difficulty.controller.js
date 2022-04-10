const HttpStatus = require('http-status-codes').StatusCodes;
const Sequelize = require('sequelize');
const BaseError = require('../errors/base.error');

const Difficulty = require('../models').difficulty;


exports.list = async (req, res, next) => {
  Difficulty.findAll({
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
  Difficulty.findOne({
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