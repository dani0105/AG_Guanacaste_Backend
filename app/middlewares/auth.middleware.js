const HttpStatus = require('http-status-codes').StatusCodes;
const createError = require("http-errors");

const model = require('../models').rol_resource;

module.exports = (req, res, next) => {
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
        } else if (req.method == "GET" && result.create) {
          return next()
        } else if (req.method == "PUT" && result.create) {
          return next()
        } else if (req.method == "DELETE" && result.create) {
          return next()
        }
      }
      return res.status(HttpStatus.FORBIDDEN).json({
        success: true,
        error: {
          message: req.polyglot.t('invalidPermission')
        }
      })
    });
  } else {
    return res.status(HttpStatus.FORBIDDEN).json({
      success: true,
      error: {
        message: req.polyglot.t('invalidAccessToken')
      }
    })
  }
}