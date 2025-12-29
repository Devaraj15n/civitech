const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

// Project domain
db.Project = require('./project/project.model')(sequelize, Sequelize.DataTypes);
db.BOQ = require('./project/boq.model')(sequelize, Sequelize.DataTypes);
db.Task = require('./project/task.model')(sequelize, Sequelize.DataTypes);

// Master domain
db.Party = require('./master/party.model')(sequelize, Sequelize.DataTypes);
db.CostCode = require('./master/costCode.model')(sequelize, Sequelize.DataTypes);

// Material domain
db.Material = require('./material/material.model')(sequelize, Sequelize.DataTypes);

// ---------------- ASSOCIATIONS ----------------

// Project → BOQ
db.Project.hasMany(db.BOQ, { foreignKey: 'project_id' });
db.BOQ.belongsTo(db.Project, { foreignKey: 'project_id' });

// Project → Task
db.Project.hasMany(db.Task, { foreignKey: 'project_id' });
db.Task.belongsTo(db.Project, { foreignKey: 'project_id' });

// BOQ → Cost Code
db.CostCode.hasMany(db.BOQ, { foreignKey: 'cost_code_id' });
db.BOQ.belongsTo(db.CostCode, { foreignKey: 'cost_code_id' });

// Export
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
