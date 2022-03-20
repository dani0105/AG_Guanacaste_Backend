'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol_Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rol_Resource.init({
    create: DataTypes.BOOLEAN,
    read: DataTypes.BOOLEAN,
    delete: DataTypes.BOOLEAN,
    update: DataTypes.BOOLEAN,
  }, {
    sequelize,
    underscored:true,
    modelName: 'rol_resource',
  });
  return Rol_Resource;
};