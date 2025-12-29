const base = require('../base.controller');
const service = require('../../services/asset/asset.service');

exports.create = base.create(service);
exports.findAll = base.findAll(service);
exports.findById = base.findById(service);
exports.update = base.update(service);
exports.remove = base.remove(service);
