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
        {
          firstName: "Budi",
          lastName: "Santoso",
          email: "budi.santoso@example.com",
          address: "456 Orchard Road",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Siti",
          lastName: "Aisyah",
          email: "siti.aisyah@example.com",
          address: "789 Mountain View",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Rahmat",
          lastName: "Hidayat",
          email: "rahmat.hidayat@example.com",
          address: "321 Sunset Boulevard",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Dewi",
          lastName: "Anggraini",
          email: "dewi.anggraini@example.com",
          address: "654 Green Lane",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Fajar",
          lastName: "Ramadhan",
          email: "fajar.ramadhan@example.com",
          address: "111 Ocean Drive",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Lina",
          lastName: "Kartika",
          email: "lina.kartika@example.com",
          address: "222 Forest Hill",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Rudi",
          lastName: "Hartono",
          email: "rudi.hartono@example.com",
          address: "333 Maple Avenue",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Sri",
          lastName: "Rahayu",
          email: "sri.rahayu@example.com",
          address: "444 Cherry Blossom",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Andre",
          lastName: "Wijaya",
          email: "andre.wijaya@example.com",
          address: "555 Palm Street",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Cahya",
          lastName: "Putra",
          email: "cahya.putra@example.com",
          address: "666 Sunrise Lane",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Dina",
          lastName: "Permata",
          email: "dina.permata@example.com",
          address: "777 Horizon Way",
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
