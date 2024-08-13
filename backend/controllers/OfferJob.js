const offerJob = require("../models/OfferJob");
const mongoose = require("mongoose");

// get all offer jobs
const AllofferJobs = async (req, res) => {
  const OfferJobs = await offerJob.find({}).sort({ createdAt: -1 });
  res.status(200).json(OfferJobs);
};

//  get a single offer job
const SingleofferJob = async (req, res) => {
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
const NewofferJob = async (req, res) => {
  const {
    idOffre,
    titre,
    description,
    lieu,
    salaire,
    exgiences,
    entreprise,
    datePublication,
  } = req.body;
  try {
    const OfferJob = await offerJob.create({
      idOffre,
      titre,
      description,
      lieu,
      salaire,
      exgiences,
      entreprise,
      datePublication,
    });
    res.status(200).json(OfferJob);
  } catch (error) {
    res.status(300).json({ message: error.message });
  }
};

// delete a offer job
const deleteOfferJob = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const deletedOfferJob = await offerJob.findOneAndDelete(id);

  if (!deletedOfferJob) {
    return res.status(404).json({ message: "Offer job not found" });
  }
  res.status(200).json({ message: "Offer job deleted successfully" });
};
// update a offer job
const updateOfferJob = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const updatedofferJob = await offerJob.findOneAndUpdate({_id: id},{...req.body},{new: true});

  if (!updatedofferJob) {
    return res.status(404).json({ message: "Offer job not found" });
  }
  res.status(200).json(updatedofferJob);
};

module.exports = { NewofferJob, AllofferJobs, SingleofferJob, deleteOfferJob,updateOfferJob };
