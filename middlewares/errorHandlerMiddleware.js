const HttpStatus = require('http-status-codes').StatusCodes;
const { Console } = require('winston/lib/winston/transports');
const errorHandler = require('../errors/errorhandler');

module.exports = async (err, req, res, next) => {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  error = errorHandler.convertBaseError(err);
  await errorHandler.handleError(error);

  res.status(error.httpCode).send({
    success:false,
    message: error.message
  });
}