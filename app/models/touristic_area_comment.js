'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TouristicAreaComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TouristicAreaComments.belongsTo(models.touristic_area,{
        foreignKey: {
          name: 'id_touristic_area',
          allowNull: false
        }
      });
      TouristicAreaComments.belongsTo(models.user,{
        foreignKey: {
          name: 'id_user',
          allowNull: false
        }
      })
    }
  }
  TouristicAreaComments.init({
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

    modelName: 'touristic_area_comment',
  });

  return TouristicAreaComments;
};