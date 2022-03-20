const BaseError = require('./base.error');
const logger = require('../utils/winstionLogger');

class ErrorHandler {

  async handleError(err) {
    await logger.error(
      'Fatal Error',
      err,
    );

    // do other things here
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }

}

module.exports = new ErrorHandler();