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
      Customer.hasMany(models.Review, { foreignKey: "customer_id" });
    }
  }
  Customer.init(
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "First name cannot be empty",
          },
        },
      },
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.TEXT,
        validate: {
          isEmail: {
            msg: "Please enter valid email",
          },
        },
        unique: {
          msg: "Email already exist",
        },
      },
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
