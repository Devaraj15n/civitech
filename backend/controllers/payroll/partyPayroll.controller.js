const service = require("../../services/payroll/partyPayroll.service");
const base = require("../base.controller");

exports.create = base.create(service);
exports.findAll = base.findAll(service);
exports.findById = base.findById(service);
exports.update = base.update(service);
exports.remove = base.remove(service);

/* Custom API */
exports.findByPartyId = base.findByField(service, "party_id");