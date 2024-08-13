const Employer = require("../models/Employer");
const mongoose = require("mongoose");

// Get all employers
const allEmployers = async (req, res) => {
  try {
    const employers = await Employer.find({}).sort({ createdAt: -1 });
    res.status(200).json(employers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single employer
const singleEmployer = async (req, res) => {
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
const newEmployer = async (req, res) => {
  const { name, email, password, company } = req.body;

  try {
    const employer = await Employer.create({
      name,
      email,
      password,
      company,
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

module.exports = { newEmployer, allEmployers, singleEmployer, deleteEmployer, updateEmployer };
