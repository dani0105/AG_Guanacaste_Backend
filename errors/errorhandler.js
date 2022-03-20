const BaseError = require('./baseError');
const logger = require('../utils/winstionLogger');
const createError = require("http-errors");
const Sequelize = require("sequelize");
const HttpStatus = require('http-status-codes').StatusCodes;

class ErrorHandler {

  async handleError(err) {
    await logger.error(
      'Fatal Error',
      err,
    );
    
    //await sendMailToAdminIfCritical();
    //await sendEventsToSentry();
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }

    if(error instanceof createError.HttpError){
      return true;
    }
    
    if(error instanceof Sequelize.ValidationError){
      return true;
    }
    
    return false;
  }

  convertBaseError(error){
    
    if(error instanceof createError.HttpError){
      return new BaseError("HTTP Error",HttpStatus.BAD_REQUEST,error.message,true)
    }
    
    if(error instanceof Sequelize.ValidationError){
      let message = [];
      error.errors.forEach(value =>{
        message.push(value.message);
      });

      return new BaseError("Validation Error",HttpStatus.BAD_REQUEST,message.join(','),true);
    }
    
    return error;
  }
}

module.exports = new ErrorHandler();