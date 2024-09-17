// models/deliveryAgent.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const DeliveryAgentModel = sequelize.define("DeliveryAgentModel", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "Delivery Agent",
  },
});

module.exports = DeliveryAgentModel;
