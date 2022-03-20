'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resources', {
      id: {
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
      },
      name: {
        allowNull:false,
        type:DataTypes.STRING(50)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('resources');
  }
};