const nodemailer = require('nodemailer');
const mailConfig = require('../mail');

module.exports = function Mail() {
  const { host, port, secure, auth } = mailConfig;
  
  var transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: auth.user ? auth : null,
  })

  async function sendMail(message) {
    return transport.sendMail({
      ...mailConfig.default,
      ...message
    });
  } 
}
      