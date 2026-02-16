const router = require('express').Router();
const controller = require('../../controllers/project/Progress_Message.controller');
const auth = require('../../middlewares/auth.middleware');

router.use(auth);

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get("/task/:task_id", controller.findByTaskId);
router.get('/:id', controller.findById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;