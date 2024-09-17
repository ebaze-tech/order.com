require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    port: process.env.DB_PORT || 3306, // Database port, default to 3306 if not set
    dialect: process.env.DB_DIALECT || "mysql", // Database dialect, default to 'mysql'
    dialectOptions: {
      charset: "utf8mb4",
    },
    logging: false, // Enable query logging
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected...."))
  .catch((error) => console.error("Error connecting to the database:", error));

module.exports = sequelize;
