// Example SMTP config for free-tier providers

const SMTP_CONFIG = {
  host: "smtp.brevo.com",     // e.g. smtp.brevo.com, smtp.mailjet.com
  port: 587,
  secure: false,
  auth: {
    user: "your_smtp_username",
    pass: "your_smtp_password"
  },
  from: '"Doge Initiative" <contact@doge-initiative.org>'
};

export default SMTP_CONFIG;
