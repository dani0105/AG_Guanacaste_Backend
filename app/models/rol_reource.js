'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolResource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RolResource.init({
    create: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    read: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    delete: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    update: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    modelName: 'rol_resource',
  });
  return RolResource;
};