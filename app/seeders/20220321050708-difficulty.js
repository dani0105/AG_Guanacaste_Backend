'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let date = new Date();
    return queryInterface.bulkInsert('difficulties', [
      { name: "Bajo", created_at: date, updated_at: date },
      { name: "Itermedio", created_at: date, updated_at: date },
      { name: "Alto", created_at: date, updated_at: date },
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
