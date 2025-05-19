const { userRegistration } = require("../service/registrationService");
const { searchUser } = require("../service/userService");
const { SuccessResponse, ErrorResponse } = require("../utils/responseCode");

const registration = async (req, res) => {
  try {
    const user = await userRegistration(req);
    if (!user) {
      throw new Error({ message: "User registration failed" });
    }
    SuccessResponse(res, 201, "User registered successfully", user);
  } catch (err) {
    console.error(err);
    ErrorResponse(res, 400, err.message);
  }
};

const getUser = async (req, res) => {
  try {
    const email = req.params.email;
    const searchedUser = await searchUser(email);
    if (!searchedUser) {
      throw new Error({ message: `User with email ${email} not found` });
    }
    SuccessResponse(res, 200, "User found successfully", searchedUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  registration,
  getUser,
};
