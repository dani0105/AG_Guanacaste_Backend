'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TouristicArea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      TouristicArea.belongsTo(models.type_tourist_area, {
        foreignKey: {
          name: 'id_type_tourist_area',
          allowNull: false
        }
      });


      TouristicArea.hasMany(models.touristic_area_image, {
        foreignKey: {
          name: 'id_touristic_area',
          allowNull: false
        }
      });
    }
  }
  TouristicArea.init({
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
    modelName: 'touristic_area',
  });
  /*TouristicArea.findOne({
    include: {
      all:true
    }
  })*/
  return TouristicArea;
};