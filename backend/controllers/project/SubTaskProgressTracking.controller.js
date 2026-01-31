const service = require("../../services/project/SubTaskProgressTracking.service");
const base = require("../base.controller");

exports.create = base.create(service);
exports.findAll = base.findAll(service);
exports.findById = base.findById(service);
exports.update = base.update(service);
exports.remove = base.remove(service);

/**
 * Find by sub_task_id
 */
exports.findBySubTaskId = base.findByField(service, "sub_task_id");
