const Candidature = require("../models/Candidature");
const mongoose = require("mongoose");

// Get all candidatures
const getAllCandidatures = async (req, res) => {
  try {
    const candidatures = await Candidature.find({}).sort({ applicationDate: -1 });
    res.status(200).json(candidatures);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single candidature
const getCandidatureById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const candidature = await Candidature.findById(id);

    if (!candidature) {
      return res.status(404).json({ error: "No such candidature!" });
    }

    res.status(200).json(candidature);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new candidature
const addCandidature = async (req, res) => {
  const { jobOffer, jobSeeker, applicationDate, status } = req.body;

  try {
    const candidature = await Candidature.create({
      jobOffer,
      jobSeeker,
      applicationDate,
      status,
    });
    res.status(201).json(candidature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a candidature
const deleteCandidature = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const deletedCandidature = await Candidature.findOneAndDelete({ _id: id });

    if (!deletedCandidature) {
      return res.status(404).json({ message: "Candidature not found" });
    }
    res.status(200).json({ message: "Candidature deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a candidature
const updateCandidature = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const updatedCandidature = await Candidature.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!updatedCandidature) {
      return res.status(404).json({ message: "Candidature not found" });
    }
    res.status(200).json(updatedCandidature);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addCandidature, getAllCandidatures, getCandidatureById, deleteCandidature, updateCandidature };
