const service = require('../../services/project/projectParties.service');
const base = require('../base.controller');

exports.create = base.create(service);
exports.findAll = base.findAll(service);
exports.findById = base.findById(service);
exports.update = base.update(service);
exports.remove = base.remove(service);

// Get all parties for a project
exports.findByProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const parties = await service.findByProject(projectId, req.user);
    res.json(parties);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAvailableLabour = async (req, res) => {
  const projectId = parseInt(req.params.projectId);
  if (!projectId) {
    return res.status(400).json({ success: false, message: "Project ID required" });
  }

  try {
    const data = await service.getAvailableLabourForProject(projectId);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};