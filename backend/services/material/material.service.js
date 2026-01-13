const base = require('../base.service');
const { Material } = require('../../models');

module.exports = {
    create: base.create(Material),
    findAll: base.findAll(Material)
};
