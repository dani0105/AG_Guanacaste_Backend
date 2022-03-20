'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rol.belongsToMany(models.resource,{through: models.rol_resource, foreignKey:"id_rol" });
      Rol.hasMany(models.user,{foreignKey:"id_rol" });
    }
  }
  Rol.init({
    id:{
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull:false,
      type:DataTypes.STRING
    },
    is_active:{
      allowNull:false,
      defaultValue:true,
      type:DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    underscored:true,
    modelName: 'rol',
  });
  return Rol;
};