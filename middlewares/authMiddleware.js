const HttpStatus = require('http-status-codes').StatusCodes;
const model = require('../models').rol_resource;
const createError = require("http-errors");

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
      next(createError(HttpStatus.FORBIDDEN),"Access token invalid!");
    });
  } else {
    next(createError(HttpStatus.BAD_REQUEST),"Invalid token");
  }
}