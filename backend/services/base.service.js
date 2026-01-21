exports.create = (Model) => async (data) => {
    return Model.create(data);
};

exports.findAll = (Model) => async (where = {}) => {
    return await Model.findAll({
        where,
    });
};

exports.findById = (Model) => async (id) => {
    return Model.findByPk(id);
};

exports.update = (Model) => async (id, data) => {
    const record = await Model.findByPk(id);
    if (!record) throw new Error('Record not found');
    return record.update(data);
};

// exports.remove = (Model) => async (id) => {
//     const record = await Model.findByPk(id);
//     if (!record) throw new Error('Record not found');
//     return record.destroy();
// };


exports.remove = (Model) => async (id) => {
    const record = await Model.findByPk(id);

    if (!record) throw new Error("Record not found");

    await record.destroy();        // This will set deleted_at automatically
    await record.update({ status: 0 });  // Update status

    return { success: true, message: "Deleted successfully" };
};



