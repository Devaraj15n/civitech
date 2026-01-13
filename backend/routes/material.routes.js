const router = require('express').Router();
const controller = require('../controllers/material/material.controller');

router.post('/', controller.create);
router.get('/', controller.findAll);

module.exports = router;
