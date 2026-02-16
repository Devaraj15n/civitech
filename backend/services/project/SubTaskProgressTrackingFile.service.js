const {
    sub_task_progress_tracking: SubProgress,
    sub_task_activity_timeline: Timeline,
    sub_task: SubTask,
    sub_task_progress_tracking_files: SubTaskProgressTrackingFiles,
} = require("../../models");

module.exports = {
    create: async (data, user, files = []) => {
        if (!user?.id) throw new Error("User context required");

        // Fetch the sub-task to get the parent task_id
        const subTask = await SubTask.findByPk(data.sub_task_id);
        if (!subTask) throw new Error("Sub-task not found");

        const payload = [];
        const timelinePayload = [];

        // If message exists, create progress entry
        if (data.message && data.message.trim()) {
            const progress = await SubProgress.create({
                sub_task_id: data.sub_task_id,
                task_id: subTask.task_id,
                project_id: data.project_id,
                remarks: data.message,
                progress_quantity: data.progress_quantity || 0,
                created_by: user.id,
            });

            timelinePayload.push(
                Timeline.create({
                    project_id: data.project_id,
                    sub_task_id: data.sub_task_id,
                    task_id: subTask.task_id,
                    activity_type: "SUB_TASK_PROGRESS",
                    reference_id: progress.id,
                    created_by: user.id,
                })
            );

            payload.push(progress);
        }

        // If files exist, create file records
        if (files.length) {
            for (let file of files) {
                const record = await SubTaskProgressTrackingFiles.create({
                    sub_task_progress_tracking_id: data.sub_task_progress_tracking_id,
                    file_name: file.originalname,
                    file_path: `uploads/progress/${file.filename}`,
                    file_type: file.mimetype,
                    file_size: file.size,
                    uploaded_by: user.id,
                    status: 1,
                });

                timelinePayload.push(
                    Timeline.create({
                        project_id: data.project_id,
                        sub_task_id: data.sub_task_id,
                        task_id: subTask.task_id,
                        activity_type: "SUB_TASK_PROGRESS_FILE",
                        reference_id: record.id,
                        created_by: user.id,
                    })
                );

                payload.push(record);
            }
        }

        // If no message and no files, throw error
        if (!data.message && !files.length) {
            throw new Error("Either message or files must be provided");
        }

        // Save timeline entries
        await Promise.all(timelinePayload);

        return payload;
    },

    findAll: (query) =>
        SubTaskProgressTrackingFiles.findAll({
            where: { ...query, status: 1 },
            order: [["created_at", "ASC"]],
        }),

    findById: (id) =>
        SubTaskProgressTrackingFiles.findOne({ where: { id, status: 1 } }),
};
