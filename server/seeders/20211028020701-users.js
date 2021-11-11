"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add seed commands here.

    // Example:
    await queryInterface.bulkInsert(
      "users",
      [
        {
          fullName: "John Doe",
          email: "user@gmail.com",
          password: "123456789",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
