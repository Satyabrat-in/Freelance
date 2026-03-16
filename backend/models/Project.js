const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  employer: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, required: true, maxlength: 5000 },
  category: { type: String, required: true, enum: ['Web Development','Mobile App','Design','Writing','Marketing','Data Science','Video','AI Services','Business','Other'] },
  skills: [{ type: String, required: true }],
  budget: { type: Number, required: true, min: 0 },
  budgetType: { type: String, enum: ['fixed','hourly'], default: 'fixed' },
  estimatedDuration: String,
  experienceLevel: { type: String, enum: ['entry','intermediate','expert'], default: 'intermediate' },
  status: { type: String, enum: ['draft','active','awarded','in_progress','submitted','completed','closed','cancelled'], default: 'active' },
  visibility: { type: String, enum: ['public','private'], default: 'public' },
  awardedTo: { type: mongoose.Schema.ObjectId, ref: 'User' },
  applicationCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  milestones: [{ title: String, description: String, amount: Number, dueDate: Date, status: { type: String, enum: ['pending','in_progress','submitted','approved'], default: 'pending' } }]
}, { timestamps: true });

projectSchema.index({ status: 1, visibility: 1 });
projectSchema.index({ skills: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ createdAt: -1 });
projectSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Project', projectSchema);
