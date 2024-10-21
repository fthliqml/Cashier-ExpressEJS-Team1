"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Customers",
      [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          address: "123 Main Street",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Akbar",
          lastName: "Maulana",
          email: "akbar.maul@example.com",
          address: "987 Main Street",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Firman",
          lastName: "Utina",
          email: "Firman.utina@example.com",
          address: "937 Along River",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Agus",
          lastName: "Septiawan",
          email: "Agus.sept@example.com",
          address: "917 Main Street",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
