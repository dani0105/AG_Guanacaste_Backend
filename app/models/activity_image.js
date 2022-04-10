'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ActivityImage.belongsTo(models.activity,{
        foreignKey: {
          name: 'id_activity',
          allowNull: false
        }
      })
    }
  }
  ActivityImage.init({
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

    modelName: 'activity_image',
  });

  return ActivityImage;
};