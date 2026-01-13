const base = require('../base.service');
const { Party } = require('../../models');

module.exports = {
    create: base.create(Party),
    findAll: base.findAll(Party),
    findById: base.findById(Party),
    update: base.update(Party),
    remove: base.remove(Party)
};
