"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Reviews",
      [
        {
          customer_id: 1, // John Doe
          product_id: 1, // Smartphone Galaxy X
          rating: 5,
          comment: "Amazing performance and stunning display! Highly recommend.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 2, // Akbar Maulana
          product_id: 2, // Laptop Pro 15
          rating: 4,
          comment: "Great laptop for work and gaming, but a bit heavy to carry around.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 3, // Firman Utina
          product_id: 3, // Wireless Earbuds X
          rating: 5,
          comment: "Excellent sound quality and battery life. Perfect for workouts!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 4, // Agus Septiawan
          product_id: 4, // 4K Smart TV 55'
          rating: 4,
          comment: "The picture quality is fantastic, but setup was a bit tricky.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 1, // John Doe
          product_id: 5, // Gaming Mouse X-Pro
          rating: 5,
          comment: "Best gaming mouse I've ever used! The RGB lighting is a nice touch.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
