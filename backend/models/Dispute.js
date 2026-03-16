const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema({
  contract: { type: mongoose.Schema.ObjectId, ref: 'Contract', required: true },
  raisedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  againstUser: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  reason: { type: String, enum: ['work_not_delivered','payment_not_released','missed_deadline','quality_below_standard','contract_violated','other'], required: true },
  description: { type: String, required: true, maxlength: 3000 },
  evidence: [{ name: String, url: String }],
  respondentResponse: String,
  status: { type: String, enum: ['open','under_review','resolved','closed'], default: 'open' },
  resolution: { type: String, enum: ['full_payment_released','partial_payment','full_refund','no_action'] },
  resolutionDetails: String,
  resolvedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  resolvedAt: Date,
  amountInDispute: Number
}, { timestamps: true });

module.exports = mongoose.model('Dispute', disputeSchema);
