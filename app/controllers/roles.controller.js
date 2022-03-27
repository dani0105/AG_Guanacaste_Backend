const HttpStatus = require('http-status-codes').StatusCodes;
const Sequelize = require('sequelize');
const BaseError = require('../errors/base.error');
const Rol = require('../models').rol;


exports.list = (req, res, next) => {
  Rol.findAll({
    where: {
      is_active: true
    }
  }).then(result => {
    res.status(HttpStatus.OK).json({ success: true, data: result });
  }).catch(error => next(error))
}


exports.find = async (req, res, next) => {
  Rol.findOne({
    where: {
      is_active: true,
      id: req.params.id
    }
  }).then(result => {
    res.status(HttpStatus.OK).json({ success: true, data: result });
  }).catch(error => next(error))
}

module.exports