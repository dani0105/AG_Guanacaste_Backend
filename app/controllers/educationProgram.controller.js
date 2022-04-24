const HttpStatus = require('http-status-codes').StatusCodes;
const Sequelize = require('sequelize');
const BaseError = require('../errors/base.error');
const fs = require('fs')

const EducationProgram = require('../models').education_program;
const EducationProgramType = require('../models').education_program_type;
const EducationProgramImage = require('../models').education_program_image;
const EducationProgramComment = require('../models').education_program_comment;
const User = require('../models').user;

createEducationProgramImage = async (id_education_program, image) => {
  let tempPath = image.url;
  let publicPath = `storage/public/${image.filename}`;

  //create image
  let result = await EducationProgramImage.create({
    url: publicPath,
    name: image.name,
    id_education_program: id_education_program
  });

  //move image

  fs.renameSync(tempPath, publicPath);

  return result;
}

exports.create = async (req, res, next) => {
  try {
    const newObject = EducationProgram.build({
      name: req.body.name,
      id_education_program_type: req.body.id_education_program_type,
      description: req.body.description,
      goal: req.body.goal,
      inscription_link: req.body.inscription_link,
      requirement: req.body.requirement,
      direction: req.body.direction,
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

      let result = createEducationProgramImage(newObject.id, image);

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
    await EducationProgram.update({
      name: req.body.name,
      id_education_program_type: req.body.id_education_program_type,
      description: req.body.description,
      goal: req.body.goal,
      inscription_link: req.body.inscription_link,
      requirement: req.body.requirement,
      direction: req.body.direction,
      geom: req.body.geom
    }, {
      where: {
        id: req.params.id
      }
    });

    for (let i = 0; i < req.body.images.length; i++) {
      const image = req.body.images[i];

      if (image.is_new) {
        let result = await createEducationProgramImage(req.params.id, image);
      } else {
        let result = await EducationProgramImage.update({
          is_active: image.is_active
        }, {
          where: {
            id_education_program: req.params.id,
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

  const { count, rows } = await EducationProgram.findAndCountAll({
    include: [
      {
        model: EducationProgramType,
        require: true,
        where: { is_active: true }
      },
      {
        model: EducationProgramImage,
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
  const result = await EducationProgram.findOne({
    include: [
      {
        model: EducationProgramType,
        require: true,
        where: { is_active: true }
      },
      {
        model: EducationProgramImage,
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
  EducationProgram.update({ is_active: false }, {
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
  EducationProgramComment.create({
    id_education_program: req.params.id_education_program,
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
  EducationProgramComment.findAndCountAll({
    include: [{
      model: User,
      attributes: ['name', 'email', 'id'],
      require: true
    }],
    attributes: ['id', 'comment', 'createdAt'],
    where: {
      is_active: true
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