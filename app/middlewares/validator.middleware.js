const validationResult = require('express-validator').validationResult;
const HttpStatus = require('http-status-codes').StatusCodes;
const fromEntries = require('object.fromentries');

translateMessages = (errObj, req) => {
  // Convert the errObj to an Array
  const errArr = Object.entries(errObj)
  // only get the first error
  return {
    success:false,
    error:{
      message:req.polyglot.t(errArr[0][1].msg)
    }
  }
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
