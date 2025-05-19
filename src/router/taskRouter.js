const express = require("express");

const {
  createTaskController,
  getTaskController,
  deleteTaskController,
  updateTaskController,
  getCreatedTasksController,
  getAssignedTasksController,
} = require("../controller/taskController");
const task = require("../model/task");

const taskRouter = express.Router();

taskRouter.post("/createTask", createTaskController);
taskRouter.get("/getTask", getTaskController);
taskRouter.patch("/updateTask", updateTaskController);
taskRouter.delete("/deleteTask", deleteTaskController);
taskRouter.get("/createdTasks", getCreatedTasksController);
taskRouter.get("/assignedTasks", getAssignedTasksController);

module.exports = taskRouter;
