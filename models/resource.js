'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Resource.belongsToMany(models.rol,{through: models.rol_resource, foreignKey:"id_resource" })
    }
  }
  Resource.init({
    id: {
      primaryKey:true,
      autoIncrement:true,
      type:DataTypes.INTEGER
    },
    name: {
      allowNull:false,
      type:DataTypes.STRING(50)
    }
  }, {
    sequelize,
    underscored:true,
    modelName: 'resource',
    createdAt:false,
    updatedAt:false
  });
  return Resource;
};