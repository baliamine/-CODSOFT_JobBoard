const mongoose = require("mongoose");
const EmployerSchema = new mongoose.Schema({
  idEmployer: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
});

EmployerSchema.methods.publishJobOffer = function () {
  // Implementation of publishing a job offer
};

EmployerSchema.methods.manageJobOffers = function () {
  // Implementation of managing job offers
};

module.exports = mongoose.model("Employer", EmployerSchema);
