const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobSeekerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cv: { type: String },
  candidatures: [{ type: Schema.Types.ObjectId, ref: 'Candidature' }] 

});


module.exports = mongoose.model("JobSeeker", JobSeekerSchema);
