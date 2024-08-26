const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmployerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true } ,
  img:{ type: String, required: true},
  // esm relation
  jobs: [{ type: Schema.Types.ObjectId, ref: 'OfferJob' }] 
});


module.exports = mongoose.model("Employer", EmployerSchema);
