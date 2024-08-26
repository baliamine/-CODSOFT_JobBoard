const User = require("../models/user");

// login user

const LoginUser = async (req, res) => {
  res.json({ mssg: "Login user" });
};

// signup user
const SignupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { LoginUser, SignupUser };
