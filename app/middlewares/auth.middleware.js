const HttpStatus = require('http-status-codes').StatusCodes;
const createError = require("http-errors");

const model = require('../models').rol_resource;
const enviroment = require('../config/config').enviroment;

module.exports = (req, res, next) => {

  if(enviroment == 'development'){
    return next();
  }
  
  if (req.user) {
    model.findOne({
      where: {
        id_rol: req.user.id_rol,
        id_resource: req.resource.id
      }
    }).then(result => {

      if (result) {
        if (req.method == "POST" && result.create) {
          return next()
        } else if (req.method == "GET" && result.read) {
          return next()
        } else if (req.method == "PUT" && result.update) {
          return next()
        } else if (req.method == "DELETE" && result.delete) {
          return next()
        }
      }
      return res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        error: {
          message: req.polyglot.t('message.invalidPermission')
        }
      })
    });
  } else {
    return res.status(HttpStatus.FORBIDDEN).json({
      success: false,
      error: {
        message: req.polyglot.t('message.invalidAccessToken')
      }
    })
  }
}