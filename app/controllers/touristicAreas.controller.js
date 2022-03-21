const HttpStatus = require('http-status-codes').StatusCodes;
const Sequelize = require('sequelize');
const BaseError = require('../errors/base.error');

const TouristicArea = require('../models').touristic_area;


exports.create = async (req, res, next) => {

  const newTouristicArea = TouristicArea.build(req.body);

  return newTouristicArea.save().then(data => {
    return res.status(HttpStatus.OK).json({
      success: true,
      data: data
    });
  }).catch(error => {
    next(new BaseError('Invalid', HttpStatus.BAD_REQUEST, req.polyglot.t("message.creationError"), true))
  });

}

exports.update = (req, res, next) => {
  TouristicArea.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.status(HttpStatus.OK).json({
      success: true
    })
  }).catch(error => {
    next(new BaseError('Invalid', HttpStatus.BAD_REQUEST, req.polyglot.t("message.creationError"), true))
  })
}

exports.list = async (req, res, next) => {
  const { count, rows } = await TouristicArea.findAndCountAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${req.query.filter}%`
      },
      is_active:true
    },
    offset: req.query.page,
    limit: req.query.size
  });

  res.status(HttpStatus.OK).json({
    success: true,
    data: rows,
    metadata: {
      page: req.query.page,
      size: req.query.size,
      count: count
    }
  })
}

exports.find = async (req, res, next) => {
  const result  = await TouristicArea.findOne({
    where: {
      id: req.params.id,
      is_active:true
    }
  });
  
  res.status(HttpStatus.OK).json({
    success: true,
    data: result
  })
}

exports.delete = async (req, res, next) => {
  TouristicArea.update({is_active:false}, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.status(HttpStatus.OK).json({
      success: true
    })
  }).catch(error => {
    next(new BaseError('Invalid', HttpStatus.BAD_REQUEST, req.polyglot.t("message.deletingError"), true))
  })
}

module.exports