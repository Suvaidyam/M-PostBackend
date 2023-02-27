const User = require("../../Model/User");
const Otp = require("../../Model/Otp");
const sendemail = require("../../Services/Email");

const OtpGenerate = async (req, res) => {
  try {
    let email = req.body.email;
    let data = await User.findOne({ email });
    if (data) {
      let otpCode = Math.floor(1000 + Math.random() * 9000);
      let otpData = new Otp({
        otpCode: otpCode,
        email: email,
        expirIn: new Date().getTime() + 300 * 1000,
      });
      let data = await otpData.save();
      sendemail.send(email, otpCode);

      return res.status(200).json({ message: "Plese check your email", data });
    } else {
      return res.status(404).json({ message: "Email Id not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = OtpGenerate;
