const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OfferJobSchema = new Schema({
  idOffer: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number },
  requirements: { type: String, required: true },
  company: { type: String, required: true },
  publicationDate: { type: Date, required: true },
});

OfferJobSchema.methods.Apply = function () {
  // Implementation of applying to the job offer
};
OfferJobSchema.methods.Consult = function () {
  // Implementation of consulting the job offer
};

module.exports = mongoose.model("OfferJob", OfferJobSchema);
