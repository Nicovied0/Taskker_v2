const express = require("express");
const router = express.Router();

const {
  getAllTask,
  getTaskById,
  deleteTaskById,
  updateTaskById,
  getUserTasks,
  createTask,
  updateTaskByStatus,
} = require("../controller/task.controller");

router.get("/", getAllTask);
router.get("/user/:id", getUserTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTaskById);
router.put("/status/:id", updateTaskByStatus);
router.post("/", createTask);
router.delete("/:id", deleteTaskById);

module.exports = router;
