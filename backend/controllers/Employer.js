const Employer = require("../models/Employer");
const mongoose = require("mongoose");
const OfferJob = require("../models/OfferJob");

// Get all employers
const getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.find({}).sort({ createdAt: -1 });
    res.status(200).json(employers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single employer
const getEmployerById = async (req, res) => {
  const { id } = req.params;

  // Validate the ObjectId format before querying
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    // Fetch the employer
    const employer = await Employer.findById(id);


    if (!employer) {
      return res.status(404).json({ error: "No such employer!" });
    }

    res.status(200).json(employer);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new employer
const addEmployer = async (req, res) => {
  const { name, email, password, companyName, img } = req.body;

  try {
    const employer = await Employer.create({
      name,
      email,
      password,
      companyName,
      img,
    });
    res.status(201).json(employer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an employer
const deleteEmployer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const deletedEmployer = await Employer.findOneAndDelete({ _id: id });

    if (!deletedEmployer) {
      return res.status(404).json({ message: "Employer not found" });
    }
    res.status(200).json({ message: "Employer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update an employer
const updateEmployer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const updatedEmployer = await Employer.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!updatedEmployer) {
      return res.status(404).json({ message: "Employer not found" });
    }
    res.status(200).json(updatedEmployer);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getAllJobsByEmployer = async (req, res) => {
  try {
    const { idEmployer } = req.params;
   

    // Assuming you have a Job model and employerId is a field in the job documents
    const jobs = await OfferJob.find({ idEmployer: idEmployer });
    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for this employer." });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

module.exports = {
  addEmployer,
  getAllEmployers,
  getEmployerById,
  deleteEmployer,
  updateEmployer,
  getAllJobsByEmployer,
};
