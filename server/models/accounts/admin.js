const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");

const AdminModel = sequelize.define("AdminModel", {
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
    defaultValue: "Admin",
  },
});

module.exports = AdminModel;
