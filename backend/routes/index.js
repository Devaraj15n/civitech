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


module.exports = router;
