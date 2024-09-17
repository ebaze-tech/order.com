const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");

const User = sequelize.define(
  "UserAccount",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telephoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "Password must be  characters long.",
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

class UserAccount {
  static async create({ email, password, telephoneNumber }) {
    return await User.create({ email, password, telephoneNumber });
  }
  static async findByEmail(email) {
    return await User.findByEmail(email);
  }
  static async findByName(username) {
    return await User.findByUsername(username);
  }
  static async findById(id) {
    return await User.findByPk(id);
  }
}

module.exports = UserAccount;
