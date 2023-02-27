const User = require("../../Model/User");
const Otp = require("../../Model/Otp");

const ChangePassword = async (req, res) => {
  try {
    let password = req.body.password;
    let email = req.body.email;

    let user = await User.findOne({ email, otpCode });
    if (user) {
      user.password = password;
      await user.save();
      return res.status(200).json({ message: "Password Changed Successfully" });
    } else {
      return res.status(200).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Invalide Otp ", error });
  }
};

module.exports = ChangePassword;
