'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('type_tourist_areas', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      is_active: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('type_tourist_areas');
  }
};
