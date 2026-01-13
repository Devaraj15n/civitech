const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    username: "root",
    password: "",
    database: "civitech",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  }
};

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);

module.exports = sequelize;
