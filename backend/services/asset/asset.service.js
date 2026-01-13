const base = require('../base.service');
const { Asset } = require('../../models');

module.exports = {
    create: base.create(Asset),
    findAll: base.findAll(Asset),
    findById: base.findById(Asset),
    update: base.update(Asset),
    remove: base.remove(Asset)
};
