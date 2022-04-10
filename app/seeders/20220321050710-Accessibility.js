'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let date = new Date();
    return queryInterface.bulkInsert('accessibilities', [
      { name: "Automóvil", created_at: date, updated_at: date },
      { name: "Parqueo", created_at: date, updated_at: date },
      { name: "Entrada gratis", created_at: date, updated_at: date },
      { name: "Entrada paga", created_at: date, updated_at: date },
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
