const router = require('express').Router();
const controller = require('../../controllers/project/SubTask_Progress_Message.controller');
const auth = require('../../middlewares/auth.middleware');

router.use(auth);

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get("/sub_task_id/:sub_task_id", controller.findByTaskId);
router.get('/:id', controller.findById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;