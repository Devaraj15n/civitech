const base = require("../base.service");
const { Sequelize } = require("sequelize");
const { task_master: Task } = require("../../models");
const { project_master: Project } = require("../../models");
const { sub_task: SubTask } = require("../../models");

module.exports = {
  /* ================= CREATE ================= */
  create: async (data, user) => {
    if (!user?.client_id || !user?.id) {
      throw new Error("User context is required");
    }

    // Validate project belongs to client
    const project = await Project.findOne({
      where: {
        id: data.project_id,
        client_id: user.client_id,
        status: 1,
      },
    });

    if (!project) {
      throw new Error("Invalid project or you don't have permission");
    }

    const task = await base.create(Task)({
      project_id: data.project_id,
      task_name: data.task_name,
      start_date: data.start_date,
      end_date: data.end_date,
      duration_days: data.duration_days,
      quantity: data.quantity,
      unit: data.unit,
      assigned_to: data.assigned_to,
      task_status: data.task_status ?? "Pending",
      progress_percentage: data.progress_percentage ?? 0,
      status: 1,
      created_by: user.id,
      updated_by: user.id,
    });
    return task;

  },

  /* ================= FIND ALL ================= */
  findAll: (query, user) => {
    return Task.findAll({
      where: {
        status: 1,
      },

      attributes: {
        include: [
          [
            Sequelize.literal(`(
            SELECT COUNT(*)
            FROM sub_task AS st
            WHERE st.task_id = task_master.id
              AND st.status = 1
          )`),
            "subtask_count",
          ],
        ],
      },

      order: [["id", "ASC"]],
    });
  },

  /* ================= FIND BY ID ================= */
  findById: (id, user) => {
    // if (!user?.client_id) {
    //     throw new Error("Client ID is required");
    // }

    return Task.findOne({
      where: {
        id,
        // client_id: user.client_id,
        status: 1,
      },
    });
  },

  /* ================= FIND BY TASK ID ================= */
  findByTaskId: async (taskId) => {
    return SubTask.findAll({
      where: {
        task_id: taskId,
        status: 1,
      },
      order: [["id", "ASC"]],
    });
  },

  /* ================= UPDATE ================= */
  update: async (id, data, user) => {
    if (!user?.id || !user?.client_id) {
      throw new Error("User context is required");
    }

    const record = await Task.findOne({
      where: {
        id,
        // client_id: user.client_id,
        status: 1,
      },
    });

    if (!record) {
      throw new Error("Task not found");
    }

    if (data.progress_percentage === 100) {
      data.task_status = "Completed";
    }


    const updatedSubtask = await base.update(Task)(id, {
      project_id: data.project_id ?? record.project_id,
      task_name: data.task_name ?? record.task_name,
      start_date: data.start_date ?? record.start_date,
      end_date: data.end_date ?? record.end_date,
      duration_days: data.duration_days ?? record.duration_days,
      assigned_to: data.assigned_to ?? record.assigned_to,
      task_status: data.task_status ?? record.task_status,
      progress_percentage:
        data.progress_percentage ?? record.progress_percentage,
      status: data.status ?? record.status,
      updated_by: user.id,
    });

    await updateParentTaskProgress(record.task_id);

    return updatedSubtask;

  },

  /* ================= SOFT DELETE ================= */
  remove: base.remove(Task),
};
