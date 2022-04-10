'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // Create Basic Resources
    return queryInterface.bulkInsert('resources', [
      { name: "Touristic Areas" }, // id: 1
      { name: "Users" }, // id: 2
      { name: "Activities" }, // id: 3
      { name: "Difficulties" }, // id: 4
      { name: "Accessibilities" }, // id: 5
      { name: "Activity Types" }, // id: 6
      { name: "Education Programs" }, // id: 7
      { name: "Education Program Types" }, // id: 8
      { name: "Comments" }, // id: 9
      { name: "Roles" }, // id: 10
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
