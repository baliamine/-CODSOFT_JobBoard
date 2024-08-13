const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OfferJobSchema = new Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  lieu: { type: String, required: true },
  salaire: { type: Number },
  exgiences: { type: String, required: true},
  entreprise: { type: String, required: true },
  datePublication: { type: Date, required: true },
});
module.exports = mongoose.model("OfferJob", OfferJobSchema);





