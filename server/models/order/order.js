const { DataTypes } = require("sequelize");
const sequelize = require(".././../database/db");

const OrderModel = sequelize.define("OrderModel", {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  orderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW(),
  },
});

module.exports = OrderModel;
