const express = require("express");
const router = express.Router();

const controller = require("../../controllers/project/SubTaskProgressTimeline.controller");

/* ================= ROUTES ================= */

/* GET timeline by sub-task */
router.get(
    "/sub-task/:sub_task_id",
    controller.findBySubTaskId
);

/* CRUD */
router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.delete("/:id", controller.remove);

module.exports = router;
