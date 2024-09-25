const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobSeekerSchema = new Schema({
  name: { type: String, required: true },
  img:{ type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cv: { type: String },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  skills: [{ type: String, required: true }],
  education: [{ type: String, required: true }],
  experience: [{ type: String, required: true }],
  bio: { type: String, required: true},
  candidatures: [{ type: Schema.Types.ObjectId, ref: "Candidature" }],
});

module.exports = mongoose.model("JobSeeker", JobSeekerSchema);
