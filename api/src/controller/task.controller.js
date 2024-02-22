const Task = require("../models/Task.model");
const User = require("../models/User.model");

async function getAllTask(req, res) {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    return res.status(500).json({ error: "Error fetching tasks" });
  }
}

async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error.message);
    return res.status(500).json({ error: "Error fetching task by ID" });
  }
}

async function getUserTasks(req, res) {
  try {
    const userId = req.params.id;
    const tasks = await Task.find({ usercreator: userId });

    if (tasks.length === 0) {
      return res.status(404).json({ error: "No tasks found for the user" });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks by user ID:", error.message);
    return res.status(500).json({ error: "Error fetching tasks by user ID" });
  }
}

async function deleteTaskById(req, res) {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.deleteOne();

    const userId = task.usercreator;

    const user = await User.findOne({ userIdRegister: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.tasks = user.tasks.filter(
      (taskId) => taskId.toString() !== task._id.toString()
    );
    await user.save();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    return res.status(500).json({ error: "Error deleting task" });
  }
}

async function updateTaskById(req, res) {
  try {
    const { title, description, meetingUrl, start, end, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        meetingUrl,
        start,
        end,
        status,
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "task not found" });
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error.message);
    return res.status(500).json({ error: "Error updating task" });
  }
}

async function updateTaskByStatus(req, res) {
  try {
    const id = req.params.id;
    const newStatus = req.body.status;
    const updatedDocument = await Task.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    res.json(updatedDocument);
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function createTask(req, res) {
  try {
    const { title, description, meetingUrl, start, end, status, usercreator } =
      req.body;
    const task = new Task({
      title,
      description,
      meetingUrl,
      start,
      end,
      status,
      usercreator,
    });

    const userId = usercreator;
    const user = await User.findOne({ userIdRegister: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newTask = await task.save();

    user.tasks = user.tasks || [];
    user.tasks.push(newTask.id);
    await user.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to create task" });
  }
}

module.exports = {
  getAllTask,
  getTaskById,
  getUserTasks,
  updateTaskById,
  updateTaskByStatus,
  deleteTaskById,
  createTask,
};
