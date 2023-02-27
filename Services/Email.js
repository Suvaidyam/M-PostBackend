const nodemailer = require("nodemailer");

module.exports = {
  send: (email, otpCode) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aniket.suvaidyam@gmail.com",
        pass: "zjzyesejdrdlxgjx",
      },
    });
    var mailoptions = {
      from: "tech@suvaidyam.com",
      to: email,
      subject: "Your verification  OTP ",
      text: ` ${JSON.stringify(
        otpCode
      )}  is your  verification code (OTP) to forget your password of M-Post valid only for  upcoming 5  minutes.`,
    };
    transporter.sendMail(mailoptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
