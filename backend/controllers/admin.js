const User = require('../models/User');
const Project = require('../models/Project');
const Contract = require('../models/Contract');
const Payment = require('../models/Payment');
const Dispute = require('../models/Dispute');
const Review = require('../models/Review');
const { createNotification } = require('../utils/notifications');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [totalUsers, freelancers, employers, activeProjects, totalContracts, revenue] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'freelancer' }),
      User.countDocuments({ role: 'employer' }),
      Project.countDocuments({ status: 'active' }),
      Contract.countDocuments(),
      Payment.aggregate([{ $match: { escrowStatus: 'released' } }, { $group: { _id: null, total: { $sum: '$platformFee' } } }])
    ]);
    const newUsersToday = await User.countDocuments({ createdAt: { $gte: new Date(Date.now() - 86400000) } });
    res.json({ success: true, data: { totalUsers, freelancers, employers, activeProjects, totalContracts, platformRevenue: revenue[0]?.total || 0, newUsersToday } });
  } catch (err) { next(err); }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { role, search, isActive, page = 1, limit = 20 } = req.query;
    const query = {};
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (search) query.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }];
    const [users, total] = await Promise.all([User.find(query).sort('-createdAt').skip((page-1)*limit).limit(Number(limit)), User.countDocuments(query)]);
    res.json({ success: true, count: users.length, total, pages: Math.ceil(total/limit), data: users });
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive, role: req.body.role }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
};

exports.getDisputes = async (req, res, next) => {
  try {
    const { status } = req.query;
    const disputes = await Dispute.find(status ? { status } : {})
      .populate('raisedBy', 'name email').populate('againstUser', 'name email')
      .populate('contract', 'title totalAmount').sort('-createdAt');
    res.json({ success: true, count: disputes.length, data: disputes });
  } catch (err) { next(err); }
};

exports.resolveDispute = async (req, res, next) => {
  try {
    const dispute = await Dispute.findById(req.params.id).populate('contract');
    if (!dispute) return res.status(404).json({ success: false, message: 'Dispute not found' });
    dispute.status = 'resolved';
    dispute.resolution = req.body.resolution;
    dispute.resolutionDetails = req.body.resolutionDetails;
    dispute.resolvedBy = req.user._id;
    dispute.resolvedAt = new Date();
    await dispute.save();
    const contract = dispute.contract;
    if (req.body.resolution === 'full_payment_released') contract.status = 'completed';
    else if (req.body.resolution === 'full_refund') contract.status = 'cancelled';
    await contract.save();
    const io = req.app.get('io');
    for (const uid of [dispute.raisedBy, dispute.againstUser]) {
      await createNotification(io, { userId: uid, type: 'dispute', title: 'Dispute Resolved', message: `Your dispute has been resolved: ${req.body.resolutionDetails}`, relatedEntityType: 'dispute', relatedEntityId: dispute._id, actionUrl: '/dashboard' });
    }
    res.json({ success: true, data: dispute });
  } catch (err) { next(err); }
};

exports.getProjects = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const [projects, total] = await Promise.all([
      Project.find(status ? { status } : {}).populate('employer', 'name email').sort('-createdAt').skip((page-1)*limit).limit(Number(limit)),
      Project.countDocuments(status ? { status } : {})
    ]);
    res.json({ success: true, count: projects.length, total, data: projects });
  } catch (err) { next(err); }
};
