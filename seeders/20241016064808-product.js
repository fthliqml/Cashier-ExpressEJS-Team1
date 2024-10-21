"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Smartphone Galaxy X",
          price: 12000000,
          stock: 15,
          description:
            "Latest Galaxy X smartphone with high-performance processor and AMOLED display.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Laptop Pro 15",
          price: 25000000,
          stock: 8,
          description:
            "Powerful laptop with 15-inch Retina display, 16GB RAM, and 1TB SSD storage.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Wireless Earbuds X",
          price: 1500000,
          stock: 30,
          description: "Wireless earbuds with noise cancellation and 24-hour battery life.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "4K Smart TV 55'",
          price: 18000000,
          stock: 5,
          description: "55-inch Smart TV with 4K resolution, HDR support, and voice control.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gaming Mouse X-Pro",
          price: 800000,
          stock: 50,
          description:
            "Ergonomic gaming mouse with customizable RGB lighting and high-precision sensor.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
