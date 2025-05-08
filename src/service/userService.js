const User = require("../model/users");
const { createLog } = require("../utils/logutil");

const searchUser = async (email) => {
  const searchedUser = await User.find({ email: email });
  if (!searchedUser) {
    throw new Error(`User with id ${id} not found`);
  }
  return searchedUser;
};

module.exports = {
  searchUser,
};
