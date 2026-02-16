const base = require("../base.service");
const { sub_task: SubTask, task_master: Task } = require("../../models");


const updateParentTaskProgress = async (taskId) => {
  const subtasks = await SubTask.findAll({
    where: { task_id: taskId, status: 1 },
    attributes: ["progress_percentage"],
  });

  if (!subtasks.length) return;

  const total = subtasks.reduce((sum, s) => sum + s.progress_percentage, 0);
  const avgProgress = Math.round(total / subtasks.length);

  await Task.update(
    { progress_percentage: avgProgress },
    { where: { id: taskId } }
  );
};

module.exports = {
  /* ================= CREATE ================= */
  create: async (data, user) => {
    if (!user?.id) {
      throw new Error("User context is required");
    }

    const task = await Task.findOne({
      where: {
        id: data.task_id,
        status: 1,
      },
    });

    if (!task) {
      throw new Error("Invalid task");
    }

    const subtask = await base.create(SubTask)({
      task_id: data.task_id,
      sub_task_name: data.sub_task_name,
      start_date: data.start_date,
      end_date: data.end_date,
      duration_days: data.duration_days,
      progress_percentage: data.progress_percentage ?? 0,
      notes: data.notes ?? null,
      quantity: Number(data.quantity),
      unit: data.unit,


      status: 1,
      created_by: user.id,
      updated_by: user.id,
    });

    await updateParentTaskProgress(data.task_id);
    return subtask;
  },

  /* ================= FIND BY ID ================= */
  findById: async (id) => {
    return SubTask.findOne({
      where: {
        id,
        status: 1,
      },
    });
  },

  /* ================= UPDATE ================= */
  update: async (id, data, user) => {
    if (!user?.id) {
      throw new Error("User context is required");
    }

    const record = await SubTask.findOne({
      where: {
        id,
        status: 1,
      },
    });

    if (!record) {
      throw new Error("Subtask not found");
    }

    const subtask = await base.update(SubTask)(id, {
      sub_task_name: data.sub_task_name ?? record.sub_task_name,
      start_date: data.start_date ?? record.start_date,
      end_date: data.end_date ?? record.end_date,
      duration_days: data.duration_days ?? record.duration_days,
      progress_percentage:
        data.progress_percentage ?? record.progress_percentage,
      notes: data.notes ?? record.notes,

      updated_by: user.id,
    });


    await updateParentTaskProgress(record.id);
    return subtask;
  },

  /* ================= SOFT DELETE ================= */
  remove: base.remove(SubTask),
};
