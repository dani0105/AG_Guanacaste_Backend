'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rol_resources', {
      id_rol: {
        type: Sequelize.INTEGER,
        references: {
          model: 'rols',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      id_resource: {
        type: Sequelize.INTEGER,
        references: {
          model: 'resources',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      create: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      read: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      delete: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      update: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rol_resources');
  }
};
