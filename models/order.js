"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Relasi Order -> Customer (Many-to-One)
            Order.belongsTo(models.Customer, { foreignKey: "customer_id" });

            // Relasi Order -> Product (Many-to-One)
            Order.belongsTo(models.Product, { foreignKey: "product_id" });
        }
    }
    Order.init(
        {
            customer_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            order_date: DataTypes.DATEONLY,
            total_price: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
