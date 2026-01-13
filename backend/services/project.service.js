const { Project } = require('../models');

exports.getAllProjects = () => {
    return Project.findAll({
        order: [['id', 'DESC']]
    });
};

exports.createProject = (data) => {
    return Project.create(data);
};
