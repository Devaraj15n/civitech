const express = require("express");
const router = express.Router();
const controller = require("../../controllers/master/retention.controller");
const auth = require("../../middlewares/auth.middleware");

router.post("/", auth, controller.create);
router.get("/", auth, controller.findAll);
router.get("/:id", auth, controller.findById);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.remove);

module.exports = router;
