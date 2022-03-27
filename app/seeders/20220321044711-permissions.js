'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // Adding rol permissions
    return queryInterface.bulkInsert('rol_resources', [
      { id_rol: 1, id_resource: 1, create: true, read: true, delete: true, update: true },
      { id_rol: 1, id_resource: 2, create: true, read: true, delete: true, update: true },
      { id_rol: 1, id_resource: 3, create: true, read: true, delete: true, update: true },
      { id_rol: 2, id_resource: 1, create: false, read: true, delete: false, update: false },
      { id_rol: 2, id_resource: 2, create: false, read: true, delete: false, update: false },
      { id_rol: 2, id_resource: 3, create: false, read: true, delete: false, update: false },
    ]);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
