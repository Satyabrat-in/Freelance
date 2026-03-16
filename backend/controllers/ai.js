const https = require('https');

const callClaude = (systemPrompt, userMessage) => new Promise((resolve, reject) => {
  const body = JSON.stringify({ model: 'claude-sonnet-4-5', max_tokens: 1000, system: systemPrompt, messages: [{ role: 'user', content: userMessage }] });
  const options = { hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'Content-Length': Buffer.byteLength(body) } };
  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
  });
  req.on('error', reject);
  req.write(body);
  req.end();
});

exports.generateProposal = async (req, res, next) => {
  try {
    const { jobTitle, jobDescription, skills, freelancerBio, freelancerSkills } = req.body;
    const system = 'You are an expert freelance proposal writer for the Indian market. Write compelling, personalised proposals under 300 words.';
    const prompt = `Write a proposal for: Title: ${jobTitle}
Description: ${jobDescription}
Required Skills: ${skills?.join(', ')}
Freelancer: ${freelancerBio || 'Experienced professional'}
Freelancer Skills: ${freelancerSkills?.join(', ')}`;
    const response = await callClaude(system, prompt);
    res.json({ success: true, data: { proposal: response.content?.[0]?.text || '' } });
  } catch (err) { next(err); }
};

exports.getRateAdvice = async (req, res, next) => {
  try {
    const { skills, experience, projectType } = req.body;
    const system = 'You are a freelance career advisor specialising in the Indian freelance market. Give specific rate recommendations in INR.';
    const prompt = `What rate should I charge?
Skills: ${skills?.join(', ')}
Experience: ${experience}
Project Type: ${projectType}
Give hourly and project rate ranges with reasoning.`;
    const response = await callClaude(system, prompt);
    res.json({ success: true, data: { advice: response.content?.[0]?.text || '' } });
  } catch (err) { next(err); }
};

exports.generateJobPost = async (req, res, next) => {
  try {
    const { projectSummary, budget, skills } = req.body;
    const system = 'You are an expert at writing clear, detailed freelance job posts that attract top talent in India.';
    const prompt = `Create a detailed job post:
Summary: ${projectSummary}
Budget: ${budget}
Skills: ${skills?.join(', ')}
Include: title, description, deliverables, timeline, screening questions.`;
    const response = await callClaude(system, prompt);
    res.json({ success: true, data: { jobPost: response.content?.[0]?.text || '' } });
  } catch (err) { next(err); }
};

exports.chatWithAssistant = async (req, res, next) => {
  try {
    const { messages, userRole, userName } = req.body;
    const system = `You are Claude, an expert AI assistant on FreelanceHub — India's smart freelancing platform. The user is a ${userRole} named ${userName}. Help with ${userRole === 'freelancer' ? 'proposals, rates, JSS improvement, profile tips, client communication' : 'job posts, budgets, evaluating proposals, interview questions, project scoping'}. Be concise and practical.`;
    const lastMessage = messages?.[messages.length - 1]?.content || '';
    const response = await callClaude(system, lastMessage);
    res.json({ success: true, data: { reply: response.content?.[0]?.text || '' } });
  } catch (err) { next(err); }
};

exports.analyseProposal = async (req, res, next) => {
  try {
    const { proposal, jobDescription } = req.body;
    const system = 'You are a freelance hiring expert. Analyse proposals and give specific improvement feedback.';
    const prompt = `Rate this proposal 1-10 and give improvements.
Job: ${jobDescription}
Proposal: ${proposal}`;
    const response = await callClaude(system, prompt);
    res.json({ success: true, data: { analysis: response.content?.[0]?.text || '' } });
  } catch (err) { next(err); }
};
