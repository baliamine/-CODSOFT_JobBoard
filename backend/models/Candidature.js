const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CandidatureSchema = new Schema({
  offerJob: {
    type:Schema.Types.ObjectId,
    ref: "OfferJob",
    required: true,
  },
  jobSeeker: {
    type: Schema.Types.ObjectId,
    ref: "JobSeeker",
    required: true,
  },
  applicationDate: { type: Date, default: Date.now }, // Default to current date
  status: { type: String, default: 'Pending' },
  motivationLetter: { type: String },
});


module.exports = mongoose.model("Candidature", CandidatureSchema);
