const HttpStatus = require('http-status-codes').StatusCodes;
const createError = require("http-errors");
const JWT = require('jsonwebtoken');
const TOKEN = require("../config/config").token;

// En este archivo se configura el middleware encargado de validar los schemas de las APi's
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    JWT.verify(token, TOKEN.secret, (err, data) => {
      if (err) {
        next(createError(HttpStatus.FORBIDDEN),"Access token invalid!");
      }
      req.user = data;
      next()
    });
  }else{
    next();
  }
}


