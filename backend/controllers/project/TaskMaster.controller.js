const service = require("../../services/project/TaskMaster.service");
const base = require("../base.controller");

exports.create = base.create(service);
exports.findAll = base.findAll(service);
exports.findById = base.findById(service);
exports.update = base.update(service);
exports.remove = base.remove(service);

/* 🔥 CUSTOM: GET SUBTASKS BY TASK ID */
exports.findByTaskId = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const data = await service.findByTaskId(taskId);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};