const service = require("../../services/payroll/partyPayroll.service");

exports.create = async (req, res) => {
    try {
        const data = await service.create(req.body, req.user);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const data = await service.findAll(req.user);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const data = await service.findById(req.params.id);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await service.update(req.params.id, req.body, req.user);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const data = await service.remove(req.params.id, req.user);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};