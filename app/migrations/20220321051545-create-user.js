'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      id_rol: {
        type: Sequelize.INTEGER,
        references: {
          model: 'rols',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(250)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(250),
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(65),
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
    await queryInterface.dropTable('users');
  }
};
