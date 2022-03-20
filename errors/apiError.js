const BaseError = require('./baseError');
const HttpStatus = require('http-status-codes').StatusCodes;

//free to extend the BaseError
module.exports = class APIError extends BaseError {
  constructor(name, httpCode = HttpStatus.INTERNAL_SERVER, isOperational = true, description = 'Internal server error') {
    super(name, httpCode, isOperational, description);
  }
}