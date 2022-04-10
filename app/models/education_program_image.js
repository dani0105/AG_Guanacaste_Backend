'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EducationProgramImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EducationProgramImage.belongsTo(models.education_program,{
        foreignKey: {
          name: 'id_education_program',
          allowNull: false
        }
      })
    }
  }
  EducationProgramImage.init({
    url: {
      allowNull: false,
      type: DataTypes.STRING(500)
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(500)
    },
    is_active: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    underscored: true,

    modelName: 'education_program_image',
  });

  return EducationProgramImage;
};