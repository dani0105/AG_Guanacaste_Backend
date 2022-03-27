const HttpStatus = require('http-status-codes').StatusCodes;
const Sequelize = require('sequelize');
const BaseError = require('../errors/base.error');

const TypeTouristArea = require('../models').type_tourist_area;


exports.list = async (req, res, next) => {
  TypeTouristArea.findAll({
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
  TypeTouristArea.findOne({
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