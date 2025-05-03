require("dotenv").config();
const express = require("express");
constcookieParser = require("cookie-parser");

const connectDB = require("./src/config/database");
const cookieParser = require("cookie-parser");

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

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
