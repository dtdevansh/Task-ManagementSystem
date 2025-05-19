const { ObjectId } = require("mongodb");

const User = require("../model/users");
const Role = require("../model/role");
const Task = require("../model/task");
const {
  validationTaskDetails,
  validationTaskUpdate,
} = require("../utils/validation");
const { createLog } = require("../utils/logutil");

const createTask = async (req) => {
  const dataValidation = validationTaskDetails(req);
  if (!dataValidation) {
    throw new Error("Invalid data provided");
  }
  const { title, description, status, priority, duedate, user, manager } =
    req.body;
  const userExists = await User.findById(user);
  if (!userExists) {
    throw new Error("User not found");
  }
  const managerExists = await User.findById(manager);
  if (!managerExists) {
    throw new Error("Manager not found");
  }
  const task = new Task({
    title: title,
    description: description,
    status: status,
    priority: priority,
    duedate: duedate,
  });
  await task.save();

  const managerRole = new Role({
    user: manager,
    task: task._id,
    role: "manager",
  });
  await managerRole.save();

  const userRole = new Role({
    user: user,
    task: task._id,
    role: "user",
  });
  await userRole.save();
  createLog(manager, "Created New Task", user, task._id);
  return task;
};

const getTask = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  console.log("task", task);
  const userRole = await Role.findOne({ task: taskId, role: "user" });
  const managerRole = await Role.findOne({ task: taskId, role: "manager" });
  return {
    task: task,
    user: userRole,
    manager: managerRole,
  };
};
const getCreatedTasks = async (userId) => {
  const getTasksPipeline = [
    {
      $match: {
        user: new ObjectId(userId),
        role: "manager",
      },
    },
    {
      $lookup: {
        from: "tasks",
        localField: "task",
        foreignField: "_id",
        as: "createdTasks",
      },
    },
    {
      $project: {
        role: 1,
        createdTasks: 1,
      },
    },
  ];
  const tasks = await Role.aggregate(getTasksPipeline);
  if (!tasks || tasks.length === 0) {
    throw new Error("No tasks found");
  }
  const taskObj = tasks?.[0]?.createdTasks;
  return taskObj;
};

const getAssignedTasks = async (userId) => {
  const getTasksPipeline = [
    {
      $match: {
        user: new ObjectId(userId),
        role: "user",
      },
    },
    {
      $lookup: {
        from: "tasks",
        localField: "task",
        foreignField: "_id",
        as: "assignedTasks",
      },
    },
    {
      $project: {
        role: 1,
        assignedTasks: 1,
      },
    },
  ];
  const tasks = await Role.aggregate(getTasksPipeline);
  if (!tasks || tasks.length === 0) {
    throw new Error("No tasks found");
  }
  const taskObj = tasks?.[0]?.assignedTasks;
  return taskObj;
};

const updateTask = async (req) => {
  const dataValidation = validationTaskUpdate(req);
  if (!dataValidation) {
    throw new Error("Invalid data provided");
  }
  console.log("dataValidation", dataValidation);
  const { title, description, status, priority, duedate, taskId, userId } =
    req.body;

  const currentUser = await User.findById(userId);
  if (!currentUser) {
    throw new Error("User not found");
  }

  console.log("currentUser", currentUser);
  const role = await Role.findOne({
    $or: [{ user: userId }, { manager: userId }],
  });

  if (!role) {
    throw new Error("Role not found");
  }
  console.log("role", role);
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  task.duedate = duedate;

  if (
    role.role === "manager" ||
    (role.role === "admin" && role.role !== "user")
  ) {
    Object.assign(task, {
      title,
      description,
      status,
      priority,
    });
  } else if (role.role === "user") {
    if (task.title !== title || task.description !== description) {
      throw new Error("Users are not allowed to change title or description");
    }
    if (["completed", "cancelled"].includes(status)) {
      throw new Error("User cannot change status to completed or cancelled");
    }
    task.status = status;
  } else {
    throw new Error("Unauthorized role");
  }
  await task.save();
  createLog(userId, "Updated Task", null, taskId);
  return task;
};

const deleteTask = async (req) => {
  const { taskId, userId } = req;
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    throw new Error("User not found");
  }
  const role = await Role.findOne({
    user: userId,
    task: taskId,
    role: "manager",
  });

  if (!role) {
    throw new Error("Role not found");
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  createLog(userId, "Deleted Task", null, taskId);
  if (role.role === "manager") {
    await Task.deleteOne({ _id: taskId });
    await Role.deleteMany({ task: taskId });
  } else {
    throw new Error("Only manager can delete the task");
  }
  return {
    message: "Task deleted successfully",
  };
};
module.exports = {
  createTask,
  getTask,
  getCreatedTasks,
  getAssignedTasks,
  updateTask,
  deleteTask,
};
