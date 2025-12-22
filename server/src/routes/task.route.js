const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const {
  createTaskValidation,
  updateTaskValidation,
} = require("../middlewares/validator.middleware");
const { protect } = require("../middlewares/auth.middleware");

// All task routes are protected
router.use(protect);

// Routes
router.route("/").get(getTasks).post(createTaskValidation, createTask);

router
  .route("/:id")
  .get(getTask)
  .put(updateTaskValidation, updateTask)
  .delete(deleteTask);

module.exports = router;
