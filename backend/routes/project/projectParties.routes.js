const router = require('express').Router();
const controller = require('../../controllers/project/projectParties.controller');
const auth = require('../../middlewares/auth.middleware');

router.use(auth);

// CRUD
router.post('/', controller.create);           // Add party to project
router.get('/', controller.findAll);          // List all mappings
router.get('/:id', controller.findById);      // Get single mapping
router.put('/:id', controller.update);        // Update mapping
router.delete('/:id', controller.remove);     // Soft delete mapping

// Get parties for a specific project
router.get('/project/:projectId', controller.findByProject);
router.get("/available-labour/:projectId", controller.getAvailableLabour);


module.exports = router;