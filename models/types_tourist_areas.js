'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Types_tourist_areas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  Types_tourist_areas.init({
    id: {
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
      type:DataTypes.INTEGER
    },
    name: {
      allowNull:false,
      type:DataTypes.STRING(50)
    },
    is_active: {
      defaultValue:true,
      type:DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    underscored:true,
    modelName: 'types_tourist_area',
  });
  return Types_tourist_areas;
};