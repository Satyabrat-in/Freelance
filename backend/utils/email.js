const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: { user: process.env.SMTP_EMAIL, pass: process.env.SMTP_PASSWORD }
  });
  await transporter.sendMail({ from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`, to, subject, html });
};

const emailTemplates = {
  verification: (name, url) => `<div style="font-family:sans-serif;padding:20px"><h2 style="color:#00D4AA">Welcome to FreelanceHub, ${name}!</h2><p>Please verify your email to activate your account.</p><a href="${url}" style="background:#00D4AA;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;margin:16px 0">Verify Email</a><p style="color:#666;font-size:13px">Link expires in 24 hours.</p></div>`,
  passwordReset: (name, url) => `<div style="font-family:sans-serif;padding:20px"><h2 style="color:#00D4AA">Password Reset</h2><p>Hi ${name}, click below to reset your password.</p><a href="${url}" style="background:#00D4AA;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;margin:16px 0">Reset Password</a><p style="color:#666;font-size:13px">Link expires in 10 minutes.</p></div>`,
  applicationReceived: (employerName, projectTitle, freelancerName) => `<div style="font-family:sans-serif;padding:20px"><h2 style="color:#00D4AA">New Application</h2><p>Hi ${employerName}, <strong>${freelancerName}</strong> applied to <strong>${projectTitle}</strong>.</p><a href="${process.env.CLIENT_URL}/dashboard" style="background:#00D4AA;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;margin:16px 0">View Application</a></div>`,
  paymentReleased: (name, amount, projectTitle) => `<div style="font-family:sans-serif;padding:20px"><h2 style="color:#00D4AA">Payment Released</h2><p>Hi ${name}, Rs.${amount.toLocaleString('en-IN')} released for <strong>${projectTitle}</strong>.</p><a href="${process.env.CLIENT_URL}/dashboard" style="background:#00D4AA;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;margin:16px 0">View Earnings</a></div>`
};

module.exports = { sendEmail, emailTemplates };
