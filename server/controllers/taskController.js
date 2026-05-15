const Task = require("../models/Task");


// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } =
      req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      user: req.user,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET USER TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Ensure user owns task
    if (task.user.toString() !== req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Ensure user owns task
    if (task.user.toString() !== req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};