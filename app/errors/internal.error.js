const BaseError = require('./base.error');

module.exports = class InternalError extends BaseError {

  constructor(name, description) {
    super(name,500,description,false);
    Object.setPrototypeOf(this, new.target.prototype);
    BaseError.captureStackTrace(this);
  }

}