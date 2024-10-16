"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Reviews",
            [
                {
                    customer_id: 1,
                    product_id: 1,
                    rating: 5,
                    comment: "Great product!",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    customer_id: 2,
                    product_id: 2,
                    rating: 4,
                    comment: "Very good quality.",
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
