const mongoose = require('mongoose');

const employerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, unique: true },
  companyName: { type: String, maxlength: 200 },
  industry: String,
  companySize: { type: String, enum: ['1-10','11-50','51-200','201-500','500+'] },
  description: { type: String, maxlength: 2000 },
  website: String,
  location: { city: String, state: String, country: { type: String, default: 'India' } },
  totalSpent: { type: Number, default: 0 },
  projectsPosted: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('EmployerProfile', employerProfileSchema);
