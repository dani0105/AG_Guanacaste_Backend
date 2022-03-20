const Sequelize = require('sequelize');
const HttpStatus = require('http-status-codes').StatusCodes;
const createError = require("http-errors");
const model = require('../models').user;
const TOKEN = require('../config/config').token;
const crypto = require('crypto');
const JWT = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  const user = await model.findOne({
    where: {
      email: req.body.email,
      is_active: true
    }
  });

  if (user) {
    let hash = crypto.createHash("sha256");
    let password = hash.update(req.body.password).digest('hex');

    if (password.localeCompare(user.password) == 0) {
      //generate acces_token

      const access_token = JWT.sign(
        {
          id: user.id,
          id_rol: user.id_rol
        },
        TOKEN.secret,
        {
          expiresIn: TOKEN.lifetime,
          subject: req.body.email
        }
      );

      delete user.dataValues.password;
      return res.status(HttpStatus.OK).json({
        success: true,
        data: {
          access_token: access_token,
          user: user
        }

      })
    }

  }

  next(createError(HttpStatus.OK, "Contraseña or correo invalido"))
}

exports.register = async (req, res, next) => {

  let another = await model.findOne({
    where: {
      email: req.body.email
    }
  });
  if (!another) {
    let hash = crypto.createHash("sha256");
    let password = hash.update(req.body.password).digest('hex');

    const newUser = model.build({
      name: req.body.name,
      email: req.body.email,
      password: password
    });
    
    newUser.save().then(user => {
      res.status(HttpStatus.OK).json({
        success: true
      });
    }).catch(error => {
      console.log(error);
      next(error)
    });
  }else{
    next(createError(HttpStatus.BAD_REQUEST,"Correo en uso"))
  }

}


module.exports