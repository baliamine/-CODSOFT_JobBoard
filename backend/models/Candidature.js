const mongoose = require('mongoose');
const CandidatureSchema = new mongoose.Schema({
  idCandidature: { type: Schema.Types.ObjectId, auto: true },
  jobOffer: { type:Schema.Types.ObjectId, ref: 'JobOffer', required: true }, 
  jobSeeker: { type: Schema.Types.ObjectId, ref: 'JobSeeker', required: true }, 
  applicationDate: {type: Date, required: true },
  status: { type: String, required: true },
});


CandidatureSchema.methods.receiveNotification = function() {
  // Implementation of receiving notifications
};

module.exports = mongoose.model('Candidature', CandidatureSchema);
