const router = require("express").Router();
const controller = require("../../controllers/project/ProgressTimeline.controller");
const auth = require("../../middlewares/auth.middleware");
const upload = require("../../middlewares/upload.middleware"); // multer

router.use(auth);

/* ================= CREATE ================= */
/**
 * Create progress OR message (timeline entry)
 * POST /api/progress-timeline
 */
router.post("/", upload.array("files"), controller.create);

/* ================= FIND ================= */
/**
 * Get ordered timeline
 * GET /api/progress-timeline?task_id=1
 * GET /api/progress-timeline?sub_task_id=2
 */
router.get("/", controller.findAll);

/**
 * Get timeline by task
 * GET /api/progress-timeline/task/1
 */
router.get("/task/:task_id", controller.findByTaskId);

/**
 * Get single timeline entry
 * GET /api/progress-timeline/15
 * ⚠️ MUST be last (dynamic route)
 */
router.get("/:id", controller.findById);

/* ================= UPDATE ================= */
/**
 * Update progress/message
 * PUT /api/progress-timeline/15
 */
router.put("/:id", upload.array("files"), controller.update);

/* ================= DELETE ================= */
/**
 * Delete progress/message (+ cascade files)
 * DELETE /api/progress-timeline/15
 */
router.delete("/:id", controller.remove);

module.exports = router;
