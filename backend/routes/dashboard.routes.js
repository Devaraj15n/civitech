const router = require('express').Router();
const controller = require('../controllers/dashboard/dashboard.controller');
const auth = require("../middlewares/auth.middleware");


router.get('/summary',auth, controller.getDashboardSummary);


module.exports = router;
