const admin = require("firebase-admin");

const credentials = require("../../firbaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const fireBaseUserReg = async (user) => {
  try {
    const userRecord = await admin.auth().createUser({
      id: user._id,
      email: user.email,
      emailVerified: false,
      password: user.password,
    });
  } catch (error) {
    console.log(error);
  }
};

const fireBaseUserLogin = async (user) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(user.email);
    if (userRecord) {
      return userRecord;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fireBaseUserReg,
  fireBaseUserLogin,
};
