const Task = require("../models/task.model");
const { validationResult } = require("express-validator");

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ error: "Server error creating task" });
  }
};

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    const { status } = req.query;

    // Build query - only get tasks for the authenticated user
    const query = { userId: req.user.id };

    // Add status filter if provided
    if (status && ["pending", "in-progress", "completed"].includes(status)) {
      query.status = status;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ error: "Server error fetching tasks" });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Verify ownership
    if (task.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to access this task" });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Get task error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(500).json({ error: "Server error fetching task" });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Verify ownership
    if (task.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this task" });
    }

    const { title, description, status } = req.body;

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Update task error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(500).json({ error: "Server error updating task" });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Verify ownership
    if (task.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this task" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(500).json({ error: "Server error deleting task" });
  }
};
