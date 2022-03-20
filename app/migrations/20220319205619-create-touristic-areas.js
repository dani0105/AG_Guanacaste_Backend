'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('touristic_areas', {
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
      id_types_tourist_areas: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(1024)
      },
      geom: {
        type: DataTypes.GEOMETRY("POINT")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('touristic_areas');
  }
};