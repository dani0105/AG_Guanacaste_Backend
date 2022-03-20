'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Touristic_areas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Touristic_areas.belongsTo(models.types_tourist_area,{foreignKey:"id_types_tourist_area"})
    }
  }
  Touristic_areas.init({
    id:{
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull:false,
      type:DataTypes.STRING(300)
    },
    description: {
      allowNull:false,
      type:DataTypes.STRING(1024)
    },
    geom: {
      type:DataTypes.GEOMETRY("POINT")
    }
  }, {
    sequelize,
    underscored:true,
    modelName: 'touristic_areas',
  });
  return Touristic_areas;
};