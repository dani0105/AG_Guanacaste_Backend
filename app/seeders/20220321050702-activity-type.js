'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let date = new Date();
    return queryInterface.bulkInsert('activity_types', [
      { name: "Monumentos", created_at: date, updated_at: date },
      { name: "Montaña", created_at: date, updated_at: date },
      { name: "Río/Catarata", created_at: date, updated_at: date },
      { name: "Playa", created_at: date, updated_at: date },
      { name: "Acampar", created_at: date, updated_at: date },
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
