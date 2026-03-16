const mongoose = require('mongoose');

const freelancerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, unique: true },
  professionalTitle: { type: String, maxlength: 120 },
  bio: { type: String, maxlength: 2000 },
  skills: [{ name: String, level: { type: String, enum: ['beginner','intermediate','advanced','expert'] }, yearsExp: Number }],
  experience: [{ title: String, company: String, from: Date, to: Date, current: { type: Boolean, default: false }, description: String }],
  education: [{ degree: String, institution: String, year: Number }],
  portfolio: [{ title: String, description: String, fileUrl: String, projectUrl: String, tags: [String] }],
  portfolioLinks: { github: String, linkedin: String, dribbble: String, website: String },
  hourlyRate: { type: Number, min: 0 },
  availability: { type: String, enum: ['available','busy','unavailable'], default: 'available' },
  location: { city: String, state: String, country: { type: String, default: 'India' } },
  totalEarnings: { type: Number, default: 0 },
  completedJobs: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  jss: { type: Number, default: 0, min: 0, max: 100 },
  sellerLevel: { type: String, enum: ['new','level1','level2','topRated','expert'], default: 'new' },
  idVerified: { type: Boolean, default: false },
  profileCompleteness: { type: Number, default: 0 },
  savedJobs: [{ type: mongoose.Schema.ObjectId, ref: 'Project' }]
}, { timestamps: true });

freelancerProfileSchema.methods.calcCompleteness = function() {
  let s = 0;
  if (this.professionalTitle) s += 15;
  if (this.bio && this.bio.length > 100) s += 20;
  if (this.skills && this.skills.length >= 3) s += 20;
  if (this.portfolio && this.portfolio.length > 0) s += 15;
  if (this.experience && this.experience.length > 0) s += 15;
  if (this.hourlyRate) s += 10;
  if (this.idVerified) s += 5;
  this.profileCompleteness = s;
  return s;
};

module.exports = mongoose.model('FreelancerProfile', freelancerProfileSchema);
