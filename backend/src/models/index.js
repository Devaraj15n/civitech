const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const db = {};

// Load all models dynamically
fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const folderPath = path.join(__dirname, dirent.name);

    fs.readdirSync(folderPath)
      .filter(file => file.endsWith('.js'))
      .forEach(file => {
        const modelDef = require(path.join(folderPath, file));
        const model = modelDef(sequelize, DataTypes);
        db[model.name] = model;
      });
  });

/* ============================
   Associations
============================ */

// PROJECT
db.project_master.belongsTo(db.party_master, {
  foreignKey: 'client_party_id',
  as: 'client'
});
db.project_master.hasMany(db.boq_master, {
  foreignKey: 'project_id',
  as: 'boqs'
});

// BOQ
db.boq_master.belongsTo(db.project_master, {
  foreignKey: 'project_id'
});
db.boq_master.hasMany(db.boq_item, {
  foreignKey: 'boq_id',
  as: 'items'
});

// MATERIAL
db.material_master.belongsTo(db.material_category_master, {
  foreignKey: 'material_category_id',
  as: 'category'
});

// WORKFORCE
db.workforce_master.belongsTo(db.workforce_type_master, {
  foreignKey: 'worker_type_id',
  as: 'type'
});

db.attendance.belongsTo(db.workforce_master, {
  foreignKey: 'workforce_id',
  as: 'worker'
});

db.attendance.belongsTo(db.project_master, {
  foreignKey: 'project_id',
  as: 'project'
});

// ASSET
db.asset_master.belongsTo(db.asset_type_master, {
  foreignKey: 'asset_type_id',
  as: 'assetType'
});

// FINANCE
db.finance_transaction.belongsTo(db.project_master, {
  foreignKey: 'project_id',
  as: 'project'
});

db.finance_transaction.belongsTo(db.party_master, {
  foreignKey: 'party_id',
  as: 'party'
});

/* ============================
   Export
============================ */

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
