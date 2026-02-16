const service = require("../../services/project/SubTaskProgressTrackingFile.service");
const base = require("../base.controller");

exports.create = base.create(service);
exports.findAll = base.findAll(service);
exports.findById = base.findById(service);
exports.update = base.update(service);
exports.remove = base.remove(service);

// Custom finder
exports.findAllTask = base.findByField(
    service,
    "sub_task_progress_tracking_id"
);
