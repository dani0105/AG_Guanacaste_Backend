'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let date = new Date();
    return queryInterface.bulkInsert('type_tourist_areas', [
      { name: "Área de Conservación", created_at: date, updated_at: date },
      { name: "Refugio de vida silvestre", created_at: date, updated_at: date }
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
