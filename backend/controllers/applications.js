const Application = require('../models/Application');
const Project = require('../models/Project');
const User = require('../models/User');
const { createNotification } = require('../utils/notifications');
const { sendEmail, emailTemplates } = require('../utils/email');

exports.applyToProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    if (project.status !== 'active') return res.status(400).json({ success: false, message: 'Project is not accepting applications' });
    if (project.employer.toString() === req.user._id.toString()) return res.status(400).json({ success: false, message: 'Cannot apply to own project' });
    const existing = await Application.findOne({ project: project._id, freelancer: req.user._id });
    if (existing) return res.status(400).json({ success: false, message: 'Already applied to this project' });
    const connectCost = req.body.isBoosted ? 10 : 4;
    if (req.user.connects < connectCost) return res.status(400).json({ success: false, message: `Need ${connectCost} Connects, have ${req.user.connects}` });
    await User.findByIdAndUpdate(req.user._id, { $inc: { connects: -connectCost } });
    const application = await Application.create({ project: project._id, freelancer: req.user._id, coverLetter: req.body.coverLetter, proposedBudget: req.body.proposedBudget, proposedTimeline: req.body.proposedTimeline, portfolioLinks: req.body.portfolioLinks || [], isBoosted: req.body.isBoosted || false, connectsUsed: connectCost });
    await Project.findByIdAndUpdate(project._id, { $inc: { applicationCount: 1 } });
    const io = req.app.get('io');
    const employer = await User.findById(project.employer);
    await createNotification(io, { userId: project.employer, type: 'application_received', title: 'New Application', message: `${req.user.name} applied to "${project.title}"`, relatedEntityType: 'application', relatedEntityId: application._id, actionUrl: '/dashboard' });
    try { await sendEmail({ to: employer.email, subject: `New application for ${project.title}`, html: emailTemplates.applicationReceived(employer.name, project.title, req.user.name) }); } catch {}
    res.status(201).json({ success: true, data: application });
  } catch (err) { next(err); }
};

exports.getProjectApplications = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    if (project.employer.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Not authorised' });
    const applications = await Application.find({ project: req.params.projectId }).populate('freelancer', 'name avatar').sort('-isBoosted -createdAt');
    const FreelancerProfile = require('../models/FreelancerProfile');
    const withProfiles = await Promise.all(applications.map(async app => {
      const profile = await FreelancerProfile.findOne({ user: app.freelancer._id });
      return { ...app.toObject(), freelancerProfile: profile };
    }));
    res.json({ success: true, count: withProfiles.length, data: withProfiles });
  } catch (err) { next(err); }
};

exports.getMyApplications = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { freelancer: req.user._id };
    if (status) query.status = status;
    const applications = await Application.find(query).populate('project', 'title budget budgetType status category employer').sort('-createdAt');
    res.json({ success: true, count: applications.length, data: applications });
  } catch (err) { next(err); }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id).populate('project');
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    if (application.project.employer.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorised' });
    const { status } = req.body;
    application.status = status;
    if (status === 'viewed') application.viewedAt = new Date();
    if (status === 'shortlisted') application.shortlistedAt = new Date();
    await application.save();
    const msgs = { shortlisted: 'Your application has been shortlisted', rejected: 'Your application was not selected', viewed: 'Your application has been viewed' };
    if (msgs[status]) {
      const io = req.app.get('io');
      await createNotification(io, { userId: application.freelancer, type: 'application_status', title: 'Application Update', message: `${msgs[status]} for "${application.project.title}"`, relatedEntityType: 'application', relatedEntityId: application._id, actionUrl: '/dashboard' });
    }
    res.json({ success: true, data: application });
  } catch (err) { next(err); }
};

exports.withdrawApplication = async (req, res, next) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, freelancer: req.user._id });
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    if (['awarded','rejected'].includes(application.status)) return res.status(400).json({ success: false, message: 'Cannot withdraw at this stage' });
    application.status = 'withdrawn';
    await application.save();
    res.json({ success: true, message: 'Application withdrawn' });
  } catch (err) { next(err); }
};
