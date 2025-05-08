const express = require("express");

const {
  createTaskController,
  getTaskController,
  deleteTaskController,
  updateTaskController,
} = require("../controller/taskController");
const task = require("../model/task");

const taskRouter = express.Router();

taskRouter.post("/create", createTaskController);
taskRouter.get("/getTask", getTaskController);
taskRouter.patch("/update", updateTaskController);
taskRouter.delete("/delete", deleteTaskController);

module.exports = taskRouter;
