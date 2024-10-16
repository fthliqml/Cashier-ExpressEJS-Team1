"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Products",
            [
                {
                    name: "Product A",
                    price: 1000,
                    stock: 10,
                    description: "Description for Product A",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Product B",
                    description: "Description for Product B",
                    price: 2000,
                    stock: 20,
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
