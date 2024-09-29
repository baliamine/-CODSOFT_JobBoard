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

const SignupUser = async (req, res) => {
  const { email, password, role, name, bio, img, companyName, phone, address, skills, education, experience } = req.body; // Extract all fields

  try {
    let userData = { name, bio, img }; // Common data for both roles

    if (role === "employer") {
      // Add employer-specific data
      userData = { ...userData, companyName };
    } else if (role === "jobseeker") {
      // Add job seeker-specific data
      userData = {
        ...userData,
        phone,
        address,
        skills: skills.split(","),
        education: education.split(","),
        experience: experience.split(","),
      };
    } else {
      throw new Error("Invalid role");
    }

    const user = await User.signup(email, password, role, userData);

    // Create a token (assuming createToken is a function you've defined)
    const token = createToken(user._id);

    // Return the user's role and token in the response
    res.status(201).json({ email, token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors with a 400 status code for bad requests
  }
};




module.exports = { LoginUser, SignupUser };
