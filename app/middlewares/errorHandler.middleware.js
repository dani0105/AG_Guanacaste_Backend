const HttpStatus = require('http-status-codes').StatusCodes;
const errorHandler = require('../errors/handler');

module.exports = async (err, req, res, next) => {
  
  if (!errorHandler.isTrustedError(err)) { 
    next(err);
  }
  
  await errorHandler.handleError(err);
  
  return res.status(err.httpCode).send({
    success:false,
    error:{
      message: err.message
    }
  });
}