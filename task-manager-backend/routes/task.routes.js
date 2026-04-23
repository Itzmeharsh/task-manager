const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/task.controller");

// protect all routes
router.use(auth);

router.post("/", ctrl.createTask);
router.get("/", ctrl.getTasks);
router.put("/:id", ctrl.updateTask);
router.delete("/:id", ctrl.deleteTask);

module.exports = router;