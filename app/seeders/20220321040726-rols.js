'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let date = new Date();
    // Create Basic Roles
    return queryInterface.bulkInsert('rols', [
      { name: "Admin", created_at: date, updated_at: date }, // id: 1
      { name: "User", created_at: date, updated_at: date } // id: 2
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
