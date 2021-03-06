'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeTouristAreas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TypeTouristAreas.hasMany(models.touristic_area, {
        foreignKey: {
          name: "id_type_tourist_area",
          allowNull: false
        }
      });
    }
  }
  TypeTouristAreas.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    is_active: {
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'type_tourist_area',
  });
  return TypeTouristAreas;
};