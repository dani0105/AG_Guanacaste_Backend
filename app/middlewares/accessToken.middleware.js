const HttpStatus = require('http-status-codes').StatusCodes;
const JWT = require('jsonwebtoken');

const TOKEN = require("../config/config").token;


module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    JWT.verify(token, TOKEN.secret, (err, data) => {
      if (err) {
        return res.status(HttpStatus.FORBIDDEN).json({
          success:false,
          error:{
            message: req.polyglot.t('invalidAccessToken')
          }
        })
      }
      req.user = data;
      next()
    });
  } else {
    next();
  }
}


