const service = require("../../services/project/SubTask_Progress_Message.service");
const base = require("../base.controller");

exports.create = base.create(service);
exports.findAll = base.findAll(service);
exports.findByTaskId = base.findByField(service, "sub_task_id");
exports.findById = base.findById(service);
exports.update = base.update(service);
exports.remove = base.remove(service);