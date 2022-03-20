const validationResult = require('express-validator').validationResult;
const HttpStatus = require('http-status-codes').StatusCodes;
const fromEntries = require('object.fromentries');

translateMessages = (errObj, req) => {
  // Convert the errObj to an Array
  const error = Object.entries(errObj)[0];

  let paramName = req.polyglot.t(`param.${error[0]}`);
  let message = req.polyglot.t(`validation.${error[1].msg}`, { param: paramName });

  return {
    success: false,
    error: {
      message: message
    }
  };
}

module.exports = (req, res, next) => {

  // Verifies if there were validation errors added to the request
  const validationErrors = validationResult(req)

  // If there were errors in the validation
  if (!validationErrors.isEmpty()) {
    // Return the result of the function below
    return res.status(HttpStatus.BAD_REQUEST).send(translateMessages(validationErrors.mapped(), req))
  } else {
    // If no errors, go!
    next()
  }
}
