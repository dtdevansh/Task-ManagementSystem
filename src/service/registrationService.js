const User = require("../model/users");
const { createLog } = require("../utils/logutil");
const { validateSignUpData } = require("../utils/validation");

const userRegistration = async (req) => {
  validateSignUpData(req);

  // extracting user data from request body
  const { name, email, password } = req?.body;

  // checking if user already exists in the database
  const userexists = await User.findOne({ email: email });
  if (userexists) {
    throw new Error(`User ${name} already exists`);
  }

  // Creating a new user in our database
  const user = new User({
    name: name,
    email: email,
  });

  await user.save();

  // creating a new user object with password to save in firebase
  const userCreds = {
    email: email,
    name: name,
    password: password,
  };

  // await fireBaseUserReg(userCreds);

  createLog(user._id, "New User created", null, null);
  return user;
};

module.exports = { userRegistration };
