const HttpStatus = require('http-status-codes').StatusCodes;
const Sequelize = require('sequelize');
const BaseError = require('../errors/base.error');
const fs = require('fs')

const Activity = require('../models').activity;
const ActivityType = require('../models').activity_type;
const Difficulty = require('../models').difficulty;
const Accessibility = require('../models').accessibility;
const ActivityImage = require('../models').activity_image;
const ActivityComment = require('../models').activity_comment;
const User = require('../models').user;

createActivityImage = async (id_activity, image) => {
  let tempPath = image.url;
  let publicPath = `storage/public/${image.filename}`;

  //create image
  let result = await ActivityImage.create({
    url: publicPath,
    name: image.name,
    id_activity: id_activity
  });

  //move image

  fs.renameSync(tempPath, publicPath);

  return result;
}

exports.create = async (req, res, next) => {
  try {
    const newObject = Activity.build({
      name: req.body.name,
      id_difficulty: req.body.id_difficulty,
      id_accessibility: req.body.id_accessibility,
      id_activity_type: req.body.id_activity_type,
      description: req.body.description,
      direction: req.body.direction,
      requirement: req.body.requirement,
      geom: req.body.geom
    });
    await newObject.save();

    let objectResult = newObject.toJSON();
    objectResult.images = [];
    for (let i = 0; i < req.body.images.length; i++) {
      const image = req.body.images[i];

      if (!image.is_active) {
        continue;
      }

      let result = createActivityImage(newObject.id, image);

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
    await Activity.update({
      name: req.body.name,
      id_difficulty: req.body.id_difficulty,
      id_accessibility: req.body.id_accessibility,
      id_activity_type: req.body.id_activity_type,
      description: req.body.description,
      direction: req.body.direction,
      requirement: req.body.requirement,
      geom: req.body.geom
    }, {
      where: {
        id: req.params.id
      }
    });

    for (let i = 0; i < req.body.images.length; i++) {
      const image = req.body.images[i];

      if (image.is_new) {
        let result = await createActivityImage(req.params.id, image);
      } else {
        let result = await ActivityImage.update({
          is_active: image.is_active
        }, {
          where: {
            id_activity: req.params.id,
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
  let where = { is_active: true };

  if (req.query.filter) {
    where.name = {
      [Sequelize.Op.iLike]: `%${req.query.filter}%`
    };
  }

  if (req.query.id_activity_type) {
    where.id_activity_type = req.query.id_activity_type;
  }

  if (req.query.id_difficulty) {
    where.id_difficulty = req.query.id_difficulty;
  }

  if (req.query.id_accessibility) {
    where.id_accessibility = req.query.id_accessibility;
  }

  const { count, rows } = await Activity.findAndCountAll({
    include: [
      {
        model: ActivityType,
        require: true,
        where: { is_active: true }
      },
      {
        model: Difficulty,
        require: true,
        where: { is_active: true }
      },
      {
        model: Accessibility,
        require: true,
        where: { is_active: true }
      },
      {
        model: ActivityImage,
        require: true,
        where: { is_active: true }
      }
    ],
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
  const result = await Activity.findOne({
    include: [
      {
        model: ActivityType,
        require: true,
        where: { is_active: true }
      },
      {
        model: Difficulty,
        require: true,
        where: { is_active: true }
      },
      {
        model: Accessibility,
        require: true,
        where: { is_active: true }
      },
      {
        model: ActivityImage,
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
  Activity.update({ is_active: false }, {
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
  ActivityComment.create({
    id_activity: req.params.id_activity,
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
  ActivityComment.findAndCountAll({
    include: [{
      model: User,
      attributes: ['name', 'email', 'id'],
      require: true
    }],
    where: {
      is_active: true
    },
    attributes: ['id', 'comment', 'createdAt'],
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