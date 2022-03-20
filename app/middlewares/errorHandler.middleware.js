const HttpStatus = require('http-status-codes').StatusCodes;
const errorHandler = require('../errors/handler');

module.exports = async (err, req, res, next) => {

  //internal error
  if (!errorHandler.isTrustedError(err)) { 
    next(err);
  }
  
  await errorHandler.handleError(err);
  
  return res.status(error.httpCode).send({
    success:false,
    message: error.message
  });
}