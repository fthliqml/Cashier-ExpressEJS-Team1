"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          customer_id: 1, // John Doe
          product_id: 1, // Smartphone Galaxy X
          quantity: 2,
          total_price: 12000000 * 2, // 24000000
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 2, // Akbar Maulana
          product_id: 2, // Laptop Pro 15
          quantity: 1,
          total_price: 25000000 * 1, // 25000000
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 3, // Firman Utina
          product_id: 3, // Wireless Earbuds X
          quantity: 3,
          total_price: 1500000 * 3, // 4500000
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 4, // Agus Septiawan
          product_id: 4, // 4K Smart TV 55'
          quantity: 1,
          total_price: 18000000 * 1, // 18000000
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 1, // John Doe
          product_id: 5, // Gaming Mouse X-Pro
          quantity: 5,
          total_price: 800000 * 5, // 4000000
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 2, // Akbar Maulana
          product_id: 3, // Wireless Earbuds X
          quantity: 2,
          total_price: 1500000 * 2, // 3000000
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 3, // Firman Utina
          product_id: 1, // Smartphone Galaxy X
          quantity: 1,
          total_price: 12000000 * 1, // 12000000
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 4, // Agus Septiawan
          product_id: 2, // Laptop Pro 15
          quantity: 1,
          total_price: 25000000 * 1, // 25000000
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 1, // John Doe
          product_id: 4, // 4K Smart TV 55'
          quantity: 2,
          total_price: 18000000 * 2, // 36000000
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 2, // Akbar Maulana
          product_id: 5, // Gaming Mouse X-Pro
          quantity: 10,
          total_price: 800000 * 10, // 8000000
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
