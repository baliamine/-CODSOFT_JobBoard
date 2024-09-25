const JobSeeker = require("../models/JobSeeker");
const mongoose = require("mongoose");

// Get all job seekers
const getAllJobSeekers = async (req, res) => {
  const jobSeekers = await JobSeeker.find({}).sort({ createdAt: -1 });
  res.status(200).json(jobSeekers);
};

// Get a single job seeker
const getJobSeekerById = async (req, res) => {
  const { id } = req.params;

  // Validate the ObjectId format before querying
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    // Fetch the job seeker
    const jobSeeker = await JobSeeker.findById(id);

    if (!jobSeeker) {
      return res.status(404).json({ error: "No such job seeker!" });
    }

    res.status(200).json(jobSeeker);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new job seeker
const addJobSeeker = async (req, res) => {
  const {
    name,
    img,
    email,
    password,
    cv,
    phone,
    address,
    skills,
    education,
    experience,
    bio
  } = req.body;

  try {
    const jobSeeker = await JobSeeker.create({
      name,
      img,
      email,
      password,
      cv,
      phone,
      address,
      skills,
      education,
      experience,
      bio,
    });
    res.status(200).json(jobSeeker);
  } catch (error) {
    res.status(300).json({ message: error.message });
  }
};

// Delete a job seeker
const deleteJobSeeker = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const deletedJobSeeker = await JobSeeker.findOneAndDelete({ _id: id });

  if (!deletedJobSeeker) {
    return res.status(404).json({ message: "Job seeker not found" });
  }
  res.status(200).json({ message: "Job seeker deleted successfully" });
};

// Update a job seeker
const updateJobSeeker = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const updatedJobSeeker = await JobSeeker.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!updatedJobSeeker) {
    return res.status(404).json({ message: "Job seeker not found" });
  }
  res.status(200).json(updatedJobSeeker);
};

module.exports = {
  addJobSeeker,
  getAllJobSeekers,
  getJobSeekerById,
  deleteJobSeeker,
  updateJobSeeker,
};
