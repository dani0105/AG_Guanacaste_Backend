'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rols', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_active: {
        allowNull: false,
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
    await queryInterface.dropTable('rols');
  }
};
