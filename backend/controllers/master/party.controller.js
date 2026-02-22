const base = require('../base.controller');
const service = require('../../services/master/party.service');

exports.create = base.create(service);
exports.findAll = base.findAll(service);
exports.findById = base.findById(service);
exports.update = base.update(service);
exports.remove = base.remove(service);
exports.getLabour= async (req, res) => {

    console.log("Fetching labour data...");
    try {
        const data = await service.getLabour();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}