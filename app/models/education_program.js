'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EducationProgram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      EducationProgram.belongsTo(models.education_program_type, {
        foreignKey: {
          name: 'id_education_program_type',
          allowNull: false
        }
      });


      EducationProgram.hasMany(models.education_program_image, {
        foreignKey: {
          name: 'id_education_program',
          allowNull: false
        }
      });
    }
  }
  EducationProgram.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(300)
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(1024)
    },
    goal: {
      allowNull: false,
      type: DataTypes.STRING(1024)
    },
    inscription_link: {
      allowNull: false,
      type: DataTypes.STRING(1024)
    },
    requirement: {
      allowNull: false,
      type: DataTypes.STRING(1024)
    },
    direction: {
      allowNull: false,
      type: DataTypes.STRING(300)
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT")
    },
    is_active: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'education_program',
  });
  return EducationProgram;
};