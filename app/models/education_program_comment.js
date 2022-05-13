'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EducationProgramComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EducationProgramComments.belongsTo(models.education_program,{
        foreignKey: {
          name: 'id_education_program',
          allowNull: false
        }
      });

      EducationProgramComments.belongsTo(models.user,{
        foreignKey: {
          name: 'id_user',
          allowNull: false
        }
      })
    }
  }
  EducationProgramComments.init({
    comment: {
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

    modelName: 'education_program_comment',
  });

  return EducationProgramComments;
};