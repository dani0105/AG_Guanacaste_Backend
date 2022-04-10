'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // Adding rol permissions
    return queryInterface.bulkInsert('rol_resources', [
      { id_rol: 1, id_resource: 1, create: true, read: true, delete: true, update: true },
      { id_rol: 1, id_resource: 2, create: true, read: true, delete: true, update: true },
      { id_rol: 1, id_resource: 3, create: true, read: true, delete: true, update: true },
      { id_rol: 1, id_resource: 4, create: true, read: true, delete: true, update: true },
      { id_rol: 1, id_resource: 5, create: true, read: true, delete: true, update: true },
      { id_rol: 1, id_resource: 6, create: true, read: true, delete: true, update: true },
      { id_rol: 1, id_resource: 7, create: true, read: true, delete: true, update: true },
      { id_rol: 1, id_resource: 8, create: true, read: true, delete: true, update: true },
      { id_rol: 1, id_resource: 9, create: true, read: true, delete: true, update: true },
      { id_rol: 1, id_resource: 10, create: true, read: true, delete: true, update: true },

      { id_rol: 2, id_resource: 1, create: false, read: true, delete: false, update: false },
      { id_rol: 2, id_resource: 2, create: false, read: false, delete: false, update: false },
      { id_rol: 2, id_resource: 3, create: false, read: true, delete: false, update: false },
      { id_rol: 2, id_resource: 4, create: false, read: true, delete: false, update: false },
      { id_rol: 2, id_resource: 5, create: false, read: true, delete: false, update: false },
      { id_rol: 2, id_resource: 6, create: false, read: true, delete: false, update: false },
      { id_rol: 2, id_resource: 7, create: false, read: true, delete: false, update: false },
      { id_rol: 2, id_resource: 8, create: false, read: true, delete: false, update: false },
      { id_rol: 2, id_resource: 9, create: true, read: true, delete: false, update: false },
      { id_rol: 2, id_resource: 10, create: false, read: false, delete: false, update: false },
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
