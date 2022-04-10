'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.belongsTo(models.activity_type, {
        foreignKey: {
          name: 'id_activity_type',
          allowNull: false
        }
      });

      Activity.belongsTo(models.difficulty, {
        foreignKey: {
          name: 'id_difficulty',
          allowNull: false
        }
      });

      Activity.belongsTo(models.accessibility, {
        foreignKey: {
          name: 'id_accessibility',
          allowNull: false
        }
      });

      Activity.hasMany(models.activity_image, {
        foreignKey: {
          name: 'id_activity',
          allowNull: false
        }
      })

    }
  }
  Activity.init({
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
      type: DataTypes.STRING(500)
    },
    direction: {
      allowNull: false,
      type: DataTypes.STRING(1024)
    },
    requirement: {
      allowNull: false,
      type: DataTypes.STRING(1024)
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
    modelName: 'activity',
  });
  return Activity;
};