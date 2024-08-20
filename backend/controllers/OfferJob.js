const offerJob = require("../models/OfferJob");
const mongoose = require("mongoose");

// get all offer jobs
const getAllOffers = async (req, res) => {
  const OfferJobs = await offerJob.find({}).sort({ createdAt: -1 });
  res.status(200).json(OfferJobs);
};

//  get a single offer job
const getOfferById = async (req, res) => {
  const { id } = req.params;

  // Validate the ObjectId format before querying
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    // Fetch the offer job
    const offerJob = await OfferJob.findById(id);

    if (!offerJob) {
      return res.status(404).json({ error: "No such offer job!" });
    }

    res.status(200).json(offerJob);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// create a new offer job
const addOffer = async (req, res) => {
  const {
    title,
    description,
    location,
    salary,
    requirements,
    company,
    publicationDate,
  } = req.body;

  const emptyInput = [];

  if (!title) {
    emptyInput.push("Title is required.");
  }
  if (!description) {
    emptyInput.push("Description is required.");
  }
  if (!location) {
    emptyInput.push("Location is required.");
  }
  if (!salary) {
    emptyInput.push("Salary is required.");
  }
  if (!requirements) {
    emptyInput.push("Requirements are required.");
  }
  if (!company) {
    emptyInput.push("Company Name is required.");
  }
  if (!publicationDate) {
    emptyInput.push("Publication Date is required.");
  }

  if (emptyInput.length > 0) {
    // Combine all error messages into a single string or handle them as needed
 return res.status(404).json({error: 'Please fill in the all fields',emptyInput})
  }

  try {
    const OfferJob = await offerJob.create({
      title,
      description,
      location,
      salary,
      requirements,
      company,
      publicationDate,
    });

    res.status(200).json(OfferJob);
  } catch (error) {
    res.status(300).json({ error: error.message });
  }
};

// delete a offer job
const deleteOffer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const deletedOfferJob = await offerJob.findByIdAndDelete(id);

  if (!deletedOfferJob) {
    return res.status(404).json({ message: "Offer job not found" });
  }
  res.status(200).json({ message: "Offer job deleted successfully" });
};
// update a offer job
const updateOffer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const updatedofferJob = await offerJob.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  console.log('req', req);

  if (!updatedofferJob) {
    return res.status(404).json({ message: "Offer job not found" });
  }
  res.status(200).json(updatedofferJob);
};

module.exports = {
  addOffer,
  getAllOffers,
  getOfferById,
  deleteOffer,
  updateOffer,
};
