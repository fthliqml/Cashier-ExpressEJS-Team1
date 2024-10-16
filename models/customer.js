"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Relasi Customer -> Order (One-to-Many)
            Customer.hasMany(models.Order, { foreignKey: "customer_id" });
        }
    }
    Customer.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.TEXT,
            address: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Customer",
        }
    );
    return Customer;
};
