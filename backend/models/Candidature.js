const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CandidatureSchema = new Schema({
  jobOffer: {
    type:Schema.Types.ObjectId,
    ref: "JobOffer",
    required: true,
  },
  jobSeeker: {
    type: Schema.Types.ObjectId,
    ref: "JobSeeker",
    required: true,
  },
  applicationDate: { type: String, required: true },
  status: { type: String, required: true },
});


module.exports = mongoose.model("Candidature", CandidatureSchema);
