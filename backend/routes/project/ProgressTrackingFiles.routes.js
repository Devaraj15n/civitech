const router = require('express').Router();
const controller = require('../../controllers/project/ProgressTrackingFiles.controller');
const auth = require('../../middlewares/auth.middleware');

router.use(auth);

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/:id/tasks', controller.findAllTask);

module.exports = router;