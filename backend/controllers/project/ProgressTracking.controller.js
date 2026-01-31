const service = require("../../services/project/ProgressTracking.service");
const base = require("../base.controller");

exports.create = base.create(service);
exports.findAll = base.findAll(service);
exports.findById = base.findById(service);
exports.update = base.update(service);
exports.remove = base.remove(service);
exports.findByTaskId = base.findByField(service, "task_id");
