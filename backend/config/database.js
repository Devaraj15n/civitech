const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Javakar@4",
    database: process.env.DB_NAME || "civitech",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
};

// If config for current env doesn't exist, throw a clear error
if (!config[env]) {
  throw new Error(`Missing database configuration for env: ${env}`);
}

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);

module.exports = sequelize;
