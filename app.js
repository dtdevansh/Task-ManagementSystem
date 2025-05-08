// node imports
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

// local src imports
const connectDB = require("./src/config/database");
const userRouter = require("./src/router/userRouter");
const taskRouter = require("./src/router/taskRouter");

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

connectDB()
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
