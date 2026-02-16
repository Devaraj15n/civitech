const service = require("../../services/project/SubTaskProgressTimeline.service");
const base = require("../base.controller");

exports.create = base.create(service);
exports.findAll = base.findAll(service);
exports.findById = base.findById(service);
exports.update = base.update(service);
exports.remove = base.remove(service);

/* ✅ FIXED: find by SUB TASK ID */
exports.findBySubTaskId = base.findByField(service, "sub_task_id");
