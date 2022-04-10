'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ActivityComments.belongsTo(models.activity,{
        foreignKey: {
          name: 'id_activity',
          allowNull: false
        }
      });

      ActivityComments.belongsTo(models.user,{
        foreignKey: {
          name: 'id_user',
          allowNull: false
        }
      })
    }
  }
  ActivityComments.init({
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

    modelName: 'activity_comment',
  });

  return ActivityComments;
};