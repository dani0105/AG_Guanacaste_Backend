'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let date = new Date();
    return queryInterface.bulkInsert('education_program_types', [
      { name: "Para niños", created_at: date, updated_at: date },
      { name: "Talleres", created_at: date, updated_at: date },
      { name: "Voluntariado", created_at: date, updated_at: date },
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
