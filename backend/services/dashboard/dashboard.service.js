// services/dashboard.service.js
const { project_master: Project } = require("../../models");
const { Op, fn, col } = require("sequelize");

module.exports = {
  getSummary: async (clientId) => {
    const total = await Project.count({
      where: { client_id: clientId, status: 1 },
    });

    const ongoing = await Project.count({
      where: {
        client_id: clientId,
        project_status: "Ongoing",
        status: 1,
      },
    });

    const completed = await Project.count({
      where: {
        client_id: clientId,
        project_status: "Completed",
        status: 1,
      },
    });

    const delayed = await Project.count({
      where: {
        client_id: clientId,
        project_status: "Delayed",
        status: 1,
      },
    });

    const statusChart = await Project.findAll({
      attributes: [
        "project_status",
        [fn("COUNT", col("id")), "count"],
      ],
      where: { client_id: clientId, status: 1 },
      group: ["project_status"],
    });

    return {
      summary: {
        total,
        ongoing,
        completed,
        delayed,
      },
      statusChart,
    };
  },
};
