const service = require("../../services/project/projectMaster.service");
const base = require("../base.controller");

exports.create = base.create(service);
exports.findAll = base.findAll(service);
exports.findById = base.findById(service);
exports.update = base.update(service);
exports.remove = base.remove(service);
// exports.findAllTask = base.findAllTask(service);

exports.findAllTask = async (req, res) => {

  console.log("TEST");
  console.log(req.user);
  
  try {
    const projectId = req.params.id;
    const tasks = await service.findAllTask(projectId, req.user);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};