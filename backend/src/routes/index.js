const router = require('express').Router();

router.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'Construction ERP API' });
});

router.use('/projects', require('./project.routes'));
router.use('/parties', require('./master.routes'));
router.use('/materials', require('./material.routes'));
router.use('/assets', require('./asset.routes'));
router.use('/workforce', require('./workforce.routes'));


module.exports = router;
