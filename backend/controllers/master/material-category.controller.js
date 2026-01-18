const service = require("../../services/master/material-category.service");
const base = require('../base.controller');


exports.create = base.create(service);
exports.findAll = base.findAll(service);
exports.findById = base.findById(service);
exports.update = base.update(service);
exports.remove = base.remove(service);