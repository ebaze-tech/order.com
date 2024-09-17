const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");

const DeliveryModel = sequelize.define("DeliveryModel", {
  deliveryId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: OrderModel,
      key: "orderId",
    },
    allowNull: false,
  },
  deliveryAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliveryStatus: {
    type: DataTypes.STRING,
    type: DataTypes.ENUM(
      "Pending",
      "Shipped",
      "Out For Delivery",
      "Delivered",
      "Canceled"
    ),
    defaultValue: "Pending",
  },
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estimatedDeliveryTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = DeliveryModel;
