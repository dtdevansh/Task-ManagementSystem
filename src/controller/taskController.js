const {
  createTask,
  getTask,
  getCreatedTasks,
  getAssignedTasks,
  updateTask,
  deleteTask,
} = require("../service/taskService");

const { SuccessResponse, ErrorResponse } = require("../utils/responseCode");

const createTaskController = async (req, res) => {
  try {
    const task = await createTask(req);
    if (!task) {
      throw new Error({ message: "Task creation failed" });
    }
    SuccessResponse(res, 201, "Task created successfully", task);
  } catch (err) {
    console.error(err);
    ErrorResponse(res, 400, err.message);
  }
};

const getTaskController = async (req, res) => {
  try {
    console.log("getTask", req.body);
    const taskId = req.body.taskId;
    const task = await getTask(taskId);
    if (!task) {
      throw new Error({ message: `Task with id ${taskId} not found` });
    }
    SuccessResponse(res, 200, "Task found successfully", task);
  } catch (err) {
    console.error(err);
    ErrorResponse(res, 400, err.message);
  }
};

const getCreatedTasksController = async (req, res) => {
  try {
    const userId = req.body.userId;
    const tasks = await getCreatedTasks(userId);
    if (!tasks) {
      throw new Error({ message: `No tasks found for user with id ${userId}` });
    }
    SuccessResponse(res, 200, "Tasks found successfully", tasks);
  } catch (err) {
    console.error(err);
    ErrorResponse(res, 400, err.message);
  }
};
const getAssignedTasksController = async (req, res) => {
  try {
    const userId = req.body.userId;
    const tasks = await getAssignedTasks(userId);
    if (!tasks) {
      throw new Error({ message: `No tasks found for user with id ${userId}` });
    }
    SuccessResponse(res, 200, "Tasks found successfully", tasks);
  } catch (err) {
    console.error(err);
    ErrorResponse(res, 400, err.message);
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const task = await deleteTask(req.body);
    if (!task) {
      throw new Error({ message: "Task deletion failed" });
    }
    SuccessResponse(res, 200, "Task deleted successfully", task);
  } catch (err) {
    console.error(err);
    ErrorResponse(res, 400, err.message);
  }
};

const updateTaskController = async (req, res) => {
  try {
    const task = await updateTask(req);
    if (!task) {
      throw new Error({ message: "Task update failed" });
    }
    SuccessResponse(res, 200, "Task updated successfully", task);
  } catch (err) {
    console.error(err);
    ErrorResponse(res, 400, err.message);
  }
};

module.exports = {
  createTaskController,
  getTaskController,
  deleteTaskController,
  updateTaskController,
  getCreatedTasksController,
  getAssignedTasksController,
};
