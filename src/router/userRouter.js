const express = require("express");

const { registration, getUser } = require("../controller/UserController");

const userRouter = express.Router();

// auth middleware

// all routes
userRouter.post("/signup", registration);
userRouter.get("/:email", getUser);

module.exports = userRouter;
