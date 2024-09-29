const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["employer", "jobseeker"],
    required: true,
  },
});


// Static signup method
userSchema.statics.signup = async function (email, password, role, userData) {
  // Validation
  if (!email || !password || !role) {
    throw Error("Please provide email, password, and role");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create user based on role
  let user;
  if (role === 'employer') {
    const { name, bio, img, companyName } = userData;
    user = await this.create({ email, password: hash, role, name, bio, img, companyName });
  } else if (role === 'jobseeker') {
    const { name, bio, img, phone, address, skills, education, experience } = userData;
    user = await this.create({
      email,
      password: hash,
      role,
      name,
      bio,
      img,
      phone,
      address,
      skills,
      education,
      experience,
    });
  } else {
    throw new Error("Invalid role");
  }

  return user;
};


// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Please provide email and password");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw Error("Invalid password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
