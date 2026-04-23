
const { Task } = require("../models");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user_id: req.user,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET USER TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task || task.user_id !== req.user) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task || task.user_id !== req.user) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    await task.destroy();
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};