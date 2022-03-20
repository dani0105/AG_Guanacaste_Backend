'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  User.init({
    id: {
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
      type:DataTypes.INTEGER
    },
    name: {
      allowNull:false,
      type:DataTypes.STRING(250),
      validate: {
        max:250,
        notNull:{
          msg:"Nombre vacío"
        }
      }
    },
    email: {
      allowNull:false,
      type:DataTypes.STRING(250),
      unique: true,
      validate: {
        isEmail:true
      }
    },
    password: {
      allowNull:false,
      type:DataTypes.STRING(65),
    },
    is_active:{
      defaultValue:true,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    underscored:true,
    modelName: 'user',
  });
  return User;
};