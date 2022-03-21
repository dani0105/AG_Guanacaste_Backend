'use strict';
const crypto = require('crypto');

module.exports = {
  async up(queryInterface, Sequelize) {
    let hash = crypto.createHash("sha256");
    let password = hash.update('password').digest('hex');
    let date = new Date();
    // insert initial Admin
    return queryInterface.bulkInsert('users', [
      { name: "Super Admin", email: "admin@email.com", password: password, id_rol: 1, created_at: date, updated_at: date }
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
