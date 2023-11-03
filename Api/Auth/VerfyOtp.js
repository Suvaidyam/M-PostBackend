const Otp = require("../../Model/Otp");
const VerifyOtp = async (req, res) => {
  try {
    let otpCode = req.body.otpCode;
    let email = req.body.email;
    let data = await Otp.findOne({ otpCode, email });
    if (data) {
      let currentTime = new Date().getTime();
      let diffTime = data.expirIn - currentTime;
      if (diffTime <= 0) {
        await Otp.deleteOne({ otpCode, email });
        return res.status(200).json({ message: "OTP Expire" });
      }
      return res.status(200).json({ message: "OTP verified" });
    } else {
      return res.status(200).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Invalid OTP ", error });
  }
};

module.exports = VerifyOtp;
