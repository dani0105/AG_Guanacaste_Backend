const HttpStatus = require('http-status-codes').StatusCodes;
const Sequelize = require('sequelize');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models').user;
const Rol = require('../models').rol;
const TOKEN = require('../config/config').token;

exports.login = async (req, res, next) => {
  const user = await User.findOne({
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

      });

    }
  }

  return res.status(HttpStatus.OK).json({
    success: false,
    error: {
      message: req.polyglot.t("message.invalidCredentials")
    }
  });
}

exports.register = async (req, res, next) => {

  let another = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if (!another) {
    let hash = crypto.createHash("sha256");
    let password = hash.update(req.body.password).digest('hex');

    const [rol, created] = await Rol.findOrCreate({
      where: {
        name: 'User'
      }
    });

    const newUser = User.build({
      name: req.body.name,
      email: req.body.email,
      password: password,
      id_rol: rol.id
    });

    newUser.save().then(user => {
      res.status(HttpStatus.OK).json({
        success: true
      });
    }).catch(error => {
      next(error)
    });

  } else {
    let param = req.polyglot.t('param.email');
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      error: {
        message: req.polyglot.t("validation.isUnique", { param: param })
      }
    })
  }

}


module.exports