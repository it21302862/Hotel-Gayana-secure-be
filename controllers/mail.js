require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports.sendEmail = (req, res) => {
  const { to, html, subject } = req.body;
  const fromEmail = 'it21157400@my.sliit.lk';
  const fromName = 'Hotel Gayana';

  //set mail data
  const msg = {
    to: to,
    from: {
      email: fromEmail,
      name: fromName
    },
    subject: subject,
    html: html,

  };

  //send mail
  sgMail
    .send(msg)
    .then(() => {
      res.send('Email sent');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    });
};
