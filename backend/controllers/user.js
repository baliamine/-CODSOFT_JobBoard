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
  const { email, password, role, name, bio, img, companyName, phone, address, skills, education } = req.body; // Extract all fields

  try {
    let user;

    if (role === "employer") {
      // Handle employer signup
      user = await User.signup(email, password, role, name, bio, img, companyName);
    } else if (role === "jobseeker") {
      // Handle job seeker signup
      user = await User.signup(email, password, role, name, bio, img, phone, address, skills, education);
    } else {
      throw new Error("Invalid role");
    }

    // Create a token (assuming createToken is a function you've defined)
    const token = createToken(user._id);

    // Return the user's role and token in the response
    res.status(201).json({ email, token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors with a 400 status code for bad requests
  }
};



module.exports = { LoginUser, SignupUser };
