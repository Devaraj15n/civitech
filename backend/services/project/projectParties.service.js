const { Op } = require("sequelize"); // <- Add this
const base = require('../base.service');
const { project_parties: ProjectParty, party_master: Party,party_type_master:PartyType } = require('../../models');

module.exports = {
  create: async (data, user) => {
    if (!user?.id) throw new Error('User context required');

    // Prevent duplicate party assignment to same project
    const existing = await ProjectParty.findOne({
      where: {
        project_id: data.project_id,
        party_id: data.party_id,
        status: 1
      }
    });

    if (existing) throw new Error('Party is already assigned to this project');

    return base.create(ProjectParty)({
      project_id: data.project_id,
      party_id: data.party_id,
      role: data.role || null,
      assigned_date: data.assigned_date || new Date(),
      status: 1,
      created_by: user.id,
      updated_by: user.id
    });
  },

  findAll: (query, user) => {
    return base.findAll(ProjectParty)({
      ...query,
      status: 1
    });
  },

  findById: async (id, user) => {
    return ProjectParty.findOne({
      where: { id, status: 1 }
    });
  },

  update: async (id, data, user) => {
    const record = await ProjectParty.findOne({ where: { id, status: 1 } });
    if (!record) throw new Error('Mapping not found');

    return base.update(ProjectParty)(id, {
      role: data.role ?? record.role,
      assigned_date: data.assigned_date ?? record.assigned_date,
      removed_date: data.removed_date ?? record.removed_date,
      updated_by: user.id
    });
  },

  remove: base.remove(ProjectParty),

  findByProject: async (projectId, user) => {
    return ProjectParty.findAll({
      where: { project_id: projectId, status: 1 },
      include: [
        {
          model: Party,
          as: 'party',
          attributes: ['id', 'party_name', 'phone', 'email']
        }
      ]
    });
  },
  getAvailableLabourForProject: async (projectId) => {
    // Get all party_ids already assigned to this project
    const assigned = await ProjectParty.findAll({
      where: { project_id: projectId, status: 1 },
      attributes: ["party_id"],
    });
    const assignedIds = assigned.map((a) => a.party_id);

    // Fetch all labour not already assigned
    return Party.findAll({
      where: {
        status: 1,
        id: { [Op.notIn]: assignedIds.length ? assignedIds : [0] }, // prevent empty array issue
      },
      include: [
        {
          model: PartyType,
          as: "partyType", // must match your association alias
          where: { party_type: "Labour", status: 1 },
          attributes: ["id", "party_type"],
        },
      ],
      attributes: ["id", "party_name", "phone", "email", "party_type_id"],
      order: [["party_name", "ASC"]],
    });
  }
};