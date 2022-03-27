const HttpStatus = require('http-status-codes').StatusCodes;
const Sequelize = require('sequelize');
const BaseError = require('../errors/base.error');
const formidable = require('formidable');

const TEMP = 'storage/temp/';
const PUBLIC = 'storage/public/';

exports.upload = async (req, res, next) => {
  try {
    if(req.method == "OPTIONS"){
      return res.status(200).send();
    }
    const form = formidable({
      multiples: true,
      uploadDir: TEMP,
      keepExtensions: true
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          error: {
            message: req.polyglot.t("message.fileUpload")
          }
        })
      } else {
        res.status(HttpStatus.OK).json({
          success: true,
          data: {
            temp: `${TEMP}${files.upload.newFilename}`,
            filename: files.upload.newFilename
          }
        });
      }
    });

  } catch (error) {
    next(error);
  }
}

module.exports