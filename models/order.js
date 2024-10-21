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
      Order.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });

      // Relasi Order -> Product (Many-to-One)
      Order.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Order.init(
    {
      customer_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          len: {
            args: [1, 1000],
            msg: "quantity is must lower than 1000 and higher than 0 !",
          },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 10000,
            msg: "total price is must higher than 10000 !",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
