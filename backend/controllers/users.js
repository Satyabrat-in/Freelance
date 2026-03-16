const User = require('../models/User');
const FreelancerProfile = require('../models/FreelancerProfile');
const EmployerProfile = require('../models/EmployerProfile');

exports.getFreelancers = async (req, res, next) => {
  try {
    const { search, skills, minRate, maxRate, availability, level, sort = '-averageRating', page = 1, limit = 12 } = req.query;
    const query = {};
    if (availability) query.availability = availability;
    if (level) query.sellerLevel = level;
    if (minRate || maxRate) {
      query.hourlyRate = {};
      if (minRate) query.hourlyRate.$gte = Number(minRate);
      if (maxRate) query.hourlyRate.$lte = Number(maxRate);
    }
    if (skills) query['skills.name'] = { $in: skills.split(',').map(s => new RegExp(s.trim(), 'i')) };
    let profiles = await FreelancerProfile.find(query).populate('user', 'name avatar isVerified createdAt').sort(sort).skip((page - 1) * limit).limit(Number(limit));
    const total = await FreelancerProfile.countDocuments(query);
    if (search) {
      const s = search.toLowerCase();
      profiles = profiles.filter(p => p.professionalTitle?.toLowerCase().includes(s) || p.bio?.toLowerCase().includes(s) || p.skills.some(sk => sk.name.toLowerCase().includes(s)));
    }
    res.json({ success: true, count: profiles.length, total, pages: Math.ceil(total / limit), data: profiles });
  } catch (err) { next(err); }
};

exports.getFreelancerProfile = async (req, res, next) => {
  try {
    const profile = await FreelancerProfile.findOne({ user: req.params.userId }).populate('user', 'name avatar email createdAt lastActive');
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
    res.json({ success: true, data: profile });
  } catch (err) { next(err); }
};

exports.updateFreelancerProfile = async (req, res, next) => {
  try {
    const allowed = ['professionalTitle','bio','skills','experience','education','portfolio','portfolioLinks','hourlyRate','availability','location'];
    const updateData = {};
    allowed.forEach(f => { if (req.body[f] !== undefined) updateData[f] = req.body[f]; });
    let profile = await FreelancerProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
    Object.assign(profile, updateData);
    profile.calcCompleteness();
    await profile.save();
    if (req.body.name) await User.findByIdAndUpdate(req.user._id, { name: req.body.name });
    res.json({ success: true, data: profile });
  } catch (err) { next(err); }
};

exports.getEmployerProfile = async (req, res, next) => {
  try {
    const profile = await EmployerProfile.findOne({ user: req.params.userId }).populate('user', 'name avatar email createdAt');
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
    res.json({ success: true, data: profile });
  } catch (err) { next(err); }
};

exports.updateEmployerProfile = async (req, res, next) => {
  try {
    const allowed = ['companyName','industry','companySize','description','website','location'];
    const updateData = {};
    allowed.forEach(f => { if (req.body[f] !== undefined) updateData[f] = req.body[f]; });
    const profile = await EmployerProfile.findOneAndUpdate({ user: req.user._id }, updateData, { new: true, runValidators: true });
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
    if (req.body.name) await User.findByIdAndUpdate(req.user._id, { name: req.body.name });
    res.json({ success: true, data: profile });
  } catch (err) { next(err); }
};

exports.getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;
    let stats = {};
    if (role === 'freelancer') {
      const profile = await FreelancerProfile.findOne({ user: userId });
      const Application = require('../models/Application');
      const Contract = require('../models/Contract');
      const [totalApps, activeContracts, completedContracts] = await Promise.all([
        Application.countDocuments({ freelancer: userId }),
        Contract.countDocuments({ freelancer: userId, status: 'active' }),
        Contract.countDocuments({ freelancer: userId, status: 'completed' })
      ]);
      stats = { totalApplications: totalApps, activeContracts, completedContracts, totalEarnings: profile?.totalEarnings || 0, averageRating: profile?.averageRating || 0, jss: profile?.jss || 0, connects: req.user.connects, profileCompleteness: profile?.profileCompleteness || 0 };
    } else if (role === 'employer') {
      const Project = require('../models/Project');
      const Contract = require('../models/Contract');
      const profile = await EmployerProfile.findOne({ user: userId });
      const [posted, active, completed] = await Promise.all([
        Project.countDocuments({ employer: userId }),
        Contract.countDocuments({ employer: userId, status: 'active' }),
        Contract.countDocuments({ employer: userId, status: 'completed' })
      ]);
      stats = { projectsPosted: posted, activeContracts: active, completedProjects: completed, totalSpent: profile?.totalSpent || 0, averageRating: profile?.averageRating || 0 };
    }
    res.json({ success: true, stats });
  } catch (err) { next(err); }
};

exports.getSavedJobs = async (req, res, next) => {
  try {
    const profile = await FreelancerProfile.findOne({ user: req.user._id }).populate({ path: 'savedJobs', populate: { path: 'employer', select: 'name avatar' } });
    res.json({ success: true, data: profile?.savedJobs || [] });
  } catch (err) { next(err); }
};

exports.toggleSaveJob = async (req, res, next) => {
  try {
    const profile = await FreelancerProfile.findOne({ user: req.user._id });
    const jobId = req.params.jobId;
    const idx = profile.savedJobs.indexOf(jobId);
    let saved;
    if (idx === -1) { profile.savedJobs.push(jobId); saved = true; }
    else { profile.savedJobs.splice(idx, 1); saved = false; }
    await profile.save();
    res.json({ success: true, saved });
  } catch (err) { next(err); }
};
