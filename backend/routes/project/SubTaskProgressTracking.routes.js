const router = require("express").Router();
const controller = require("../../controllers/project/SubTaskProgressTracking.controller");
const auth = require("../../middlewares/auth.middleware");
const upload = require("../../middlewares/upload.middleware"); // multer

router.use(auth);

/* ================= CREATE ================= */
router.post( "/", upload.array("files"), controller.create );

/* ================= FIND ================= */
router.get("/", controller.findAll);
router.get("/sub-task/:sub_task_id", controller.findBySubTaskId);
router.get("/:id", controller.findById);

/* ================= UPDATE ================= */
router.put( "/:id", upload.array("files"), controller.update );

/* ================= DELETE ================= */
router.delete("/:id", controller.remove);

module.exports = router;
