const base = require('../base.service');
const { Workforce } = require('../../models');

module.exports = {
    create: base.create(Workforce),
    findAll: base.findAll(Workforce),
    findById: base.findById(Workforce),
    update: base.update(Workforce),
    remove: base.remove(Workforce)
};
