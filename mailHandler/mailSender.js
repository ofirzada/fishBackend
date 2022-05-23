var nodemailer = require("nodemailer");
const config = require("config");
const mailTamplate = require("./mailTamplates.json").mailTamplate;
const {html}=require('./mailHtml')
const mailSetting = config.get("mail");

module.exports.sendMail = async (userMail) => {
  console.log(userMail);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: mailSetting.auth,
    tls: {
      rejectUnauthorized: false,
    },
  });

  mailTamplate['to'] = userMail;
  mailTamplate['html'] = html(userMail,1)
  console.log(mailTamplate);
  var sender = await transporter
    .sendMail(mailTamplate)
    .then((res) => {
      console.log("Email sent: " + res.response);
      return res;
    })
    .catch((error) => {
      console.log(error);

      return false;
    });

  return sender;
};

