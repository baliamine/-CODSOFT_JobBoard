const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3days" });
};

// login user
// login user
const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token, role: user.role }); // Return user role
  } catch (error) {
    res.status(401).json({ error: error.message }); // Use 401 for unauthorized
  }
};

// signup user
const SignupUser = async (req, res) => {
  const { email, password, role } = req.body; // Include role here

  try {
    const user = await User.signup(email, password, role);
    const token = createToken(user._id);
    res.status(201).json({ email, token, role: user.role }); // Return user role
  } catch (error) {
    res.status(400).json({ error: error.message }); // Use 400 for bad requests
  }
};


module.exports = { LoginUser, SignupUser };
