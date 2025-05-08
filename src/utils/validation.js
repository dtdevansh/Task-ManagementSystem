const validator = require("validator");

const validateSignUpData = (req) => {
  const { name, email, password } = req.body;
  if (!name) {
    throw new Error("Name is invalid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is invalid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validationTaskDetails = (req) => {
  const fieldsAllowed = [
    "title",
    "description",
    "status",
    "priority",
    "duedate",
    "manager",
    "user",
  ];
  const status = req?.body?.status;
  const priority = req?.body?.priority;
  const isAllowed = Object.keys(req.body).every((field) =>
    fieldsAllowed.includes(field)
  );
  if (isAllowed) {
    if (!req?.body?.title) {
      throw new Error("Title is required");
    }
    if (!status) {
      throw new Error("Status is required");
    }
    if (
      status !== "todo" &&
      status !== "pending" &&
      status !== "inprogress" &&
      status !== "done" &&
      status !== "completed" &&
      status !== "cancelled"
    ) {
      throw new Error("Status is invalid");
    }
    if (!priority) {
      throw new Error("Priority is required");
    }
    if (
      priority !== "low" &&
      priority !== "medium" &&
      priority !== "high" &&
      priority !== "urgent"
    ) {
      throw new Error("Priority is invalid");
    }
    if (!req?.body?.duedate) {
      throw new Error("Due date is required");
    }
    if (!validator.isDate(req?.body?.duedate)) {
      throw new Error("Due date is invalid");
    }
  }
  return isAllowed;
};

const validationTaskUpdate = (req) => {
  const fieldsAllowed = [
    "title",
    "description",
    "status",
    "priority",
    "duedate",
    "taskId",
    "userId",
  ];

  const isAllowed = Object.keys(req.body).every((field) =>
    fieldsAllowed.includes(field)
  );
  const status = req?.body?.status;
  const priority = req?.body?.priority;

  if (isAllowed) {
    if (
      status !== "todo" &&
      status !== "pending" &&
      status !== "inprogress" &&
      status !== "done" &&
      status !== "completed" &&
      status !== "cancelled"
    ) {
      throw new Error("Status is invalid");
    }
    if (
      priority !== "low" &&
      priority !== "medium" &&
      priority !== "high" &&
      priority !== "urgent"
    ) {
      throw new Error("Priority is invalid");
    }
    if (!validator.isDate(req?.body?.duedate)) {
      throw new Error("Due date is invalid");
    }
  }
  return isAllowed;
};

module.exports = {
  validateSignUpData,
  validationTaskDetails,
  validationTaskUpdate,
};
