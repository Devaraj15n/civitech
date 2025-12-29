const base = require('../base.controller');
const service = require('../../services/material/material.service');

exports.create = base.create(service);
exports.findAll = base.findAll(service);
