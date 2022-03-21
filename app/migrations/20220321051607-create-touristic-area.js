'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('touristic_areas', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      id_type_tourist_area: {
        type: Sequelize.INTEGER,
        references: {
          model: 'type_tourist_areas',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(300)
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(1024)
      },
      geom: {
        type: Sequelize.GEOMETRY("POINT")
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
    await queryInterface.dropTable('touristic_area');
  }
};
