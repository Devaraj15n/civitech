const sequelize = require('../config/database');
const fs = require('fs');
const path = require('path');
const {Sequelize, DataTypes } = require('sequelize');

const db = {};

fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .forEach(dir => {
    fs.readdirSync(path.join(__dirname, dir.name))
      .filter(file => file.endsWith('.js'))
      .forEach(file => {
        const model = require(path.join(__dirname, dir.name, file))(sequelize, DataTypes);
        if (model && model.name) {
          db[model.name] = model;
        }
      });
  });

/* Apply associations */
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = require('sequelize');

module.exports = db;
