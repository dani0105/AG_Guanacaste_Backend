const HttpStatus = require('http-status-codes').StatusCodes;
const Sequelize = require('sequelize');
const BaseError = require('../errors/base.error');
const fs = require('fs')

const TouristicArea = require('../models').touristic_area;
const TypeTouristArea = require('../models').type_tourist_area;
const TouristicAreaImage = require('../models').touristic_area_image;
const TouristicAreaComment = require('../models').touristic_area_comment;
const User = require('../models').user;


createTouristicAreaImage = async (id_touristic_area, image) => {
  let tempPath = image.url;
  let publicPath = `storage/public/${image.filename}`;

  //create image
  let result = await TouristicAreaImage.create({
    url: publicPath,
    name: image.name,
    id_touristic_area: id_touristic_area
  });

  //move image

  fs.renameSync(tempPath, publicPath);

  return result;
}

exports.create = async (req, res, next) => {
  try {
    const newTouristicArea = TouristicArea.build({
      name: req.body.name,
      id_type_tourist_area: req.body.id_type_tourist_area,
      description: req.body.description,
      geom: req.body.geom
    });
    await newTouristicArea.save();

    let objectResult = newTouristicArea.toJSON();
    objectResult.images = [];
    for (let i = 0; i < req.body.images.length; i++) {
      const image = req.body.images[i];

      if (!image.is_active) {
        continue;
      }

      let result = createTouristicAreaImage(newTouristicArea.id, image);

      objectResult.images.push(result);
    }

    res.status(HttpStatus.OK).json({
      success: true,
      data: objectResult
    })
  } catch (error) {
    console.log(error);
    next(new BaseError('Invalid', HttpStatus.BAD_REQUEST, req.polyglot.t("message.creationError"), true))
  }
}

exports.update = async (req, res, next) => {
  try {
    await TouristicArea.update({
      name: req.body.name,
      id_type_tourist_area: req.body.id_type_tourist_area,
      description: req.body.description,
      geom: req.body.geom
    }, {
      where: {
        id: req.params.id
      }
    });

    for (let i = 0; i < req.body.images.length; i++) {
      const image = req.body.images[i];

      if (image.is_new) {
        let result = await createTouristicAreaImage(req.params.id, image);
      } else {
        let result = await TouristicAreaImage.update({
          is_active: image.is_active
        }, {
          where: {
            id_touristic_area: req.params.id,
            url: image.url
          }
        });
      }
    }

    return res.status(HttpStatus.OK).json({
      success: true
    })
  } catch (error) {
    console.log(error);
    next(new BaseError('Invalid', HttpStatus.BAD_REQUEST, req.polyglot.t("message.creationError"), true))

  }
}

exports.list = async (req, res, next) => {
  let where = {
    is_active: true,
  };

  if (req.query.filter) {
    where.name = {
      [Sequelize.Op.iLike]: `%${req.query.filter}%`
    };
  }

  if (req.query.id_type_tourist_area) {
    where.id_type_tourist_area = req.query.id_type_tourist_area;
  }

  const { count, rows } = await TouristicArea.findAndCountAll({
    include: [
      {
        model: TypeTouristArea,
        require: true,
        where: { is_active: true }
      },
      {
        model: TouristicAreaImage,
        require: false,
      }
    ],
    distinct: true,
    where: where,
    offset: req.query.page * req.query.size,
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
  const result = await TouristicArea.findOne({
    include: [
      {
        model: TypeTouristArea,
        require: true,
        where: { is_active: true }
      },
      {
        model: TouristicAreaImage,
        require: true,
        where: { is_active: true }
      }
    ],
    where: {
      id: req.params.id,
      is_active: true
    }
  });
  res.status(HttpStatus.OK).json({
    success: true,
    data: result
  })
}

exports.delete = async (req, res, next) => {
  TouristicArea.update({ is_active: false }, {
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

exports.createComment = async (req, res, next) => {
  TouristicAreaComment.create({
    id_touristic_area: req.params.id_touristic_area,
    comment: req.body.comment,
    id_user: req.body.id_user
  }).then(result => {
    res.status(HttpStatus.OK).json({
      success: true
    })
  }).catch(error => {
    next(new BaseError('Invalid', HttpStatus.BAD_REQUEST, req.polyglot.t("message.creationError"), true))
  })
}

exports.listComment = async (req, res, next) => {
  TouristicAreaComment.findAndCountAll({
    include: [{
      model: User,
      attributes: ['name', 'email', 'id'],
      require: true
    }],
    attributes: ['id', 'comment', 'createdAt'],
    where: {
      is_active: true,
      id_touristic_area: req.params.id_touristic_area
    },
    offset: req.query.page * req.query.size,
    limit: req.query.size
  }).then(result => {
    res.status(HttpStatus.OK).json({
      success: true,
      data: result.rows,
      metadata: {
        page: req.query.page,
        size: req.query.size,
        count: result.count,
      }
    })
  }).catch(error => {
    next(new BaseError('Invalid', HttpStatus.BAD_REQUEST, req.polyglot.t("message.creationError"), true))
  })
}

module.exports