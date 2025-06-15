const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");

router.post("/tasks", auth, taskController.createTask);
router.get("/tasks", auth, taskController.getTasks);
router.get("/tasks/:id", auth, taskController.getTask);
router.put("/tasks/:id", auth, taskController.updateTask);
router.delete("/tasks/:id", auth, taskController.deleteTask);

module.exports = router;
