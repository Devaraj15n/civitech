const router = require('express').Router();

router.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'Construction ERP API' });
});

// router.use('/projects', require('./project.routes'));
// router.use('/parties', require('./master.routes'));
// router.use('/materials', require('./material.routes'));
router.use('/auth', require('./auth.routes'));
router.use('/clients', require('./master/client.routes'));
router.use('/party-types', require('./master/party-type.routes'));
router.use('/parties', require('./master/party.routes'));
router.use("/material-categories", require("./master/material-category.routes"));
router.use("/materials", require("./master/material-master.routes"));

// router.use('/workforce', require('./workforce.routes'));

router.use("/cost-codes", require("./master/cost-code.routes"));
router.use("/rates", require("./master/rate.routes"));
router.use("/assets", require("./master/asset.routes"));
router.use("/workforce-types", require("./master/workforce-type.routes"));
router.use("/workforce", require("./master/workforce.routes"));
router.use("/deductions", require("./master/deduction.routes"));
router.use("/retentions", require("./master/retention.routes"));
router.use("/progress", require("./master/progress.routes"));


// Project Routes
router.use("/projects", require("./project/projectMaster.routes"));
router.use("/tasks", require("./project/TaskMaster.routes"));
router.use("/sub-tasks", require("./project/SubTask.routes"));
router.use("/project-progress", require("./project/ProgressTracking.routes"));


// Dashboard Routes
router.use("/dashboard", require("./dashboard.routes"));


module.exports = router;
