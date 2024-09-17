const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");

const PaymentModel = sequelize.define(
  "PaymentModel",
  {
    paymentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dateOfPayemnt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = PaymentModel;
