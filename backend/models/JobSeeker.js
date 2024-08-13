const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobSeekerSchema = new Schema({
  idJobSeeker: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cv: { type: String },
});

JobSeekerSchema.methods.ApplyForJob = function () {
  // Implementation of applying for job
};
JobSeekerSchema.methods.manageProfil = function () {
  // Implementation of managing the user's profile
};
JobSeekerSchema.methods.JobSearch = function () {
  // Implementation of searching for jobs
};

module.exports = mongoose.model("JobSeeker", JobSeekerSchema);
