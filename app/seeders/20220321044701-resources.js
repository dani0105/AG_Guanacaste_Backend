'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // Create Basic Resources
    return queryInterface.bulkInsert('resources', [
      { name: "Touristic Areas" }, // id: 1
      { name: "Users" } // id: 2
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
